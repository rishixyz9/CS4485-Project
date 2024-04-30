import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PaginatedForm from "@components/PaginatedForm";
import ClassCard from "@components/ClassCard";

import { User } from "@utils/UserUtils";
import { Class } from "@utils/ScheduleUtils";
import { compareTwoDaysFromString } from "@/utils/ClassTimeParser";

import { Input, Checkbox, CheckboxGroup, Select, SelectItem, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { addFriendsToUser, fetchDataForCourse, fetchClassData, addClassToGroup } from "@utils/FirebaseUtils";


export default function EditModal({ group, setEditing, resetView }: { group: any, setEditing: Function, resetView: Function }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const netidRef = useRef<HTMLInputElement>(null);

    const [isInvalid, setIsInvalid] = useState<boolean>(false)

    const [classData, setClassData] = useState<any>(null)

    const [days, setDays] = useState<string>("")
    const [selectedClass, setSelectedClass] = useState<string>("1000")
    const [professors, setProfessors] = useState<string[]>([])

    const [filteredClasses, setFilteredClasses] = useState<any[]>([])
    const [selectedSection, setSelectedSection] = useState<string>("")

    const [classes, setClasses] = useState<Class[]>([])


    useEffect(() => {
        let temp: Class[] = []
        const promises = group[2].map(async (course: any) => {
            const item = await fetchDataForCourse(course);
            temp.push(new Class(item?.name, item?.course, item?.time, item?.days, item?.professor, item?.location));
        });

        promises.push(fetchClassData().then((data) => {
            setClassData(data)
        }))
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

        const [options, setOptions] = useState<any>()

        useEffect(() => {
            let set = new Set();
            classData?.map((e: any) => {
                set.add(`${e.course.split('.')[0]} - ${e.name}`);
            });
            setOptions(set);
        }, [classData]);

        return (options ? (
            <Select
                label="Class selection"
                placeholder="Select a class"
                className="dark max-w-xs w-64"
                onChange={(e) => setSelectedClass(e.target.value.split(' ')[0])}
            >
                {[...options].map((item) => (
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
                    <SelectItem key={e.course} value={e.course} >
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

    const CheckoutBox = () => {
        const [checkout, setCheckout] = useState<any>(null)
        const [submited, setSubmited] = useState<boolean>(false)

        useEffect(() => {
            if (!selectedSection) { return }
            fetchDataForCourse(selectedSection).then((data) => {
                setCheckout(new Class(data?.name, data?.course, data?.time, data?.days, data?.professor, data?.location))
            })
            setSubmited(false)
        }, [selectedSection])

        const handleClick = () => {
            setSubmited(true)
            addClassToGroup(group[0], selectedSection)
            group[2] = [...group[2], selectedSection]
            setClasses([...classes, checkout])
            resetView(group)
        }

        return (checkout ? (
            <>
                <ClassCard classData={checkout} />
                <Button variant="flat" color="secondary" isDisabled={submited} onClick={handleClick}>
                    Add to Schedule
                </Button>
            </>

        ) : <Spinner />
        )


    }

    return (
        <>
            <Button color="warning" variant="flat" onPress={onOpen} onClick={() => setEditing}>
                Edit Schedule
            </Button>
            {classData ? (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark text-white ">
                    <ModalContent >
                        {(onClose: () => void) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add Classes to the schedule</ModalHeader>
                                <ModalBody>
                                    {/* pagination for class search form */}
                                    <div className='font-semibold text-2xl text-white mt-8'>Class Search</div>
                                    <PaginatedForm pages={[
                                        { component: DaysCheckBox(), verifier: isInvalid },
                                        { component: ClassSelect(), verifier: isInvalid },
                                        { component: ProfessorSelect(), verifier: isInvalid },
                                        { component: SectionSelect(), verifier: isInvalid },
                                        { component: CheckoutBox(), verifier: isInvalid },
                                    ]} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="ghost" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>) : <Spinner />}
        </>
    );
}
