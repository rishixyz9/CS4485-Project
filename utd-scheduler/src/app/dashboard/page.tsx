"use client"

import React, { use, useEffect, useRef, useState } from "react";
import { Spinner } from "@nextui-org/react";

import ClassCalendar from "@components/ClassCalendar";

import { Class, Schedule } from "@/utils/ScheduleUtils";
import { User } from "@/utils/UserUtils";
import { getUser, fetchDataForCourse } from "@/utils/FirebaseUtils";

export default function Dashboard() {

    const [user, setUser] = useState<User | null>(null)
    const [classes, setClasses] = useState<Class[]>([])

    useEffect(() => {
        getUser("jxd200022").then((data) => {
            setUser(new User(data?.firstname, data?.lastname, data?.netId, data?.classes, data?.major, data?.year))
            let temp = [...classes]
            const promises = data?.classes.map(async (course: any) => {
                const item = await fetchDataForCourse(course);
                temp.push(new Class(item?.name, item?.course, item?.time, item?.days, item?.professor, item?.location));
            });
            Promise.all(promises).then(() => {
                setClasses(temp);
            });
        })
    }, [])

    return (
        <main className="flex flex-col w-screen">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Dashboard
            </div>

            {classes.length > 0 ? <ClassCalendar classes={classes} /> : <Spinner />}

        </main>
    );
}
