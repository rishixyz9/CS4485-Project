"use client"

import React, { use, useEffect, useRef, useState } from "react";
import { Spinner } from "@nextui-org/react";

import ClassCard from "@components/ClassCard";
import ClassCalendar from "@components/ClassCalendar";

import { Class, Schedule } from "@utils/ScheduleUtils";
import { User } from "@utils/UserUtils";
import { getUser, fetchDataForCourse } from "@utils/FirebaseUtils";

export default function Dashboard() {

    const [user, setUser] = useState<User | null>(null)
    const [classes, setClasses] = useState<Class[]>([])

    useEffect(() => {
        getUser("jxd200022").then((data) => {
            setUser(new User(data?.firstname, data?.lastname, data?.netId, data?.classes, data?.major, data?.year));
            data?.classes.forEach(async (course: any) => {
                const classData = await fetchDataForCourse(course)
                setClasses([...classes, classData as Class])
            })
        })
    }, [])

    const class1 = new Class('Advanced Data Structures and Algorithms', 'CS 4349.001', '12:00 PM - 1:15 PM', 'MW', 'James Wilson', 'ECSS 2.410')
    const class2 = new Class('Discrete Mathematics for Computing II', 'CS 3305.003', '1:30 PM - 2:45 PM', 'TTh', 'James Wilson', 'ECSS 2.412')
    const class3 = new Class('Digital Logic and Computer Design', 'CS 4341.002', '7:00 PM - 8:15 PM', 'TTh', 'Omar Hamdy', 'JO 6.216')
    const class4 = new Class('Computer Networks', 'CS 4390.005', '10:00 AM - 11:15 AM', 'MW', 'Zygmunt Haas', 'ECSS 2.305')
    const class5 = new Class('Human Language Technologies', 'CS 4395.001', '2:30 PM - 3:45 PM', 'MW', 'Omar Hamdy', 'ECSS 2.410')

    return (
        <main className="flex flex-col w-screen">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Dashboard
            </div>
            {user && classes ? (
            <div className="flex flex-wrap ml-4 mr-4 gap-8">
                {classes.map((classData) => {
                    return <ClassCard key={classData.course} classData={classData} />
                })}
            </div>): <Spinner />}

            <ClassCalendar />

        </main>
    );
}
