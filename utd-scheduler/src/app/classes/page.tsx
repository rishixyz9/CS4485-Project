"use client"

import React, { useEffect, useState } from "react";
import { CheckboxGroup, Checkbox, Spinner, Select, SelectItem } from "@nextui-org/react";

import PaginatedForm from "@components/PaginatedForm";

import { Class, Schedule } from "@utils/ScheduleUtils";
import { User } from "@utils/UserUtils";
import { compareTwoDaysFromString } from "@utils/ClassTimeParser";
import { fetchClassData } from "@utils/FirebaseUtils";


export default function Classes() {

    const [cart, setCart] = useState([])

    const [currentPage, setCurrentPage] = React.useState(1);
    const [isInvalid, setIsInvalid] = useState<boolean>(false)

    const [selectOptions, setSelectOptions] = useState<any>(null)
    const [days, setDays] = useState<string>("")
    const [selectedClass, setSelectedClass] = useState<string>("1000")
    const [professors, setProfessors] = useState<string[]>([])

    const [filteredClasses, setFilteredClasses] = useState<any[]>([])
    const [sections, setSections] = useState<string[]>([])
    const [selectedSection, setSelectedSection] = useState<string>("")

    const [classData, setClassData] = useState<any>(null)

    useEffect(() => {
        fetchClassData().then((data) => {
            let set = new Set()
            data?.map((classData) => {
                set.add(`${classData.course.split('.')[0]} - ${classData.name}`)
            })
            setSelectOptions(set)
            setClassData(data)
        })
    }, [])

    const DaysCheckBox = () => {
        return (
            <CheckboxGroup
                isRequired
                description="Select the days of the week you can take a class"
                isInvalid={isInvalid}
                label="Select days of the week you are available"
                onValueChange={(value: string[]) => {
                    setIsInvalid(value.length < 1);
                    setDays(value.join(""));
                }}
            >
                <Checkbox key={"M"} value={"M"}>Monday</Checkbox>
                <Checkbox key={"T"} value={"T"}>Tuesday</Checkbox>
                <Checkbox key={"W"} value={"W"}>Wednesday</Checkbox>
                <Checkbox key={"Th"} value={"Th"}>Thursday</Checkbox>
                <Checkbox key={"F"} value={"F"}>Friday</Checkbox>
            </CheckboxGroup>
        )
    }

    const ClassSelect = () => {
        return (classData ? (
            <Select
                label="Class selection"
                placeholder="Select a class"
                className="dark max-w-xs w-64"
                onChange={(e) => setSelectedClass(e.target.value.split(' ')[0])}
            >
                {[...selectOptions].map((item) => (
                    <SelectItem key={item} value={item}>
                        {item}
                    </SelectItem>
                ))}
            </Select>
        ) : <Spinner />)
    }


    const ProfessorSelect = () => {

        const [options, setOptions] = useState<any>(null)

        useEffect(() => {
            let filtered = classData?.filter((item: any) => (item.course.includes(selectedClass) && compareTwoDaysFromString(days, item.days)))
            setFilteredClasses(filtered);
            let set = new Set()
            filtered?.map((e: any) => {
                set.add(e.professor)
            })
            setOptions(set)
        }, [selectedClass, days])

        return (options ? (
            <CheckboxGroup
                isRequired
                description="Professor Selection"
                isInvalid={isInvalid}
                label="Select professors you would like to take a class with"
                onValueChange={(value: string[]) => {
                    setIsInvalid(value.length < 1);
                    setProfessors(value);
                }}
            >
                {[...options].map((e: any) => (
                    <Checkbox key={e} value={e}>
                        {e}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        ) : <div><div>No classes found</div><Spinner /></div>
        )

    }

    const SectionSelect = () => {

        const [options, setOptions] = useState<any>(null)

        useEffect(() => {
            let copy = [...filteredClasses]
            console.log(copy?.filter((item: any) => (professors.join("").includes(item.professor))))
            setOptions(copy?.filter((item: any) => (professors.join("").includes(item.professor))));
        }, [professors])

        return (options ? (
            <Select
                label="Section selection"
                placeholder="Select a section"
                className="dark max-w-xs w-64"
                onChange={(e) => setSelectedSection(e.target.value)}
            >
                {options.map((e: any) => (
                    <SelectItem key={`${e.course} ${e.time}`} value={`${e.course} ${e.time}`} >
                        {`${e.course} ${e.time}`}
                    </SelectItem>)
                )}
            </Select >
        ) : <div>
            <div>No classes found</div>
            <Spinner />
        </div>
        )

    }

    return (
        <main className="flex flex-col w-screen ml-4 mr-4">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Classes
            </div>

            <div className='font-semibold text-2xl text-white'>Class Search</div>

            {/* pagination for class search form */}
            <PaginatedForm pages={[
                { component: DaysCheckBox(), verifier: isInvalid },
                { component: ClassSelect(), verifier: isInvalid },
                { component: ProfessorSelect(), verifier: isInvalid },
                { component: SectionSelect(), verifier: isInvalid },
            ]} />

        </main >
    );
}
