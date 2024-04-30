"use client"

import React, { use, useEffect, useRef, useState } from "react";
import { Spinner } from "@nextui-org/react";

import { useAuth } from "@hooks/AuthProvider";

import ClassCalendar from "@components/ClassCalendar";

import { Class, Schedule } from "@/utils/ScheduleUtils";
import { User } from "@/utils/UserUtils";
import { getUser, fetchDataForCourse } from "@/utils/FirebaseUtils";

export default function Dashboard() {

    const { user, logIn, logOut } = useAuth() as unknown as { user: User, logIn: (netid: string) => void, logOut: () => void };
    const [classes, setClasses] = useState<Class[]>([])

    useEffect(() => {
        let temp: Class[] = []
        const promises = user.classes.map(async (course: any) => {
            const item = await fetchDataForCourse(course);
            temp.push(new Class(item?.name, item?.course, item?.time, item?.days, item?.professor, item?.location));
        });
        Promise.all(promises).then(() => {
            setClasses(temp);
        });
    }, [user])

    return (
        <main className="flex flex-col w-screen pl-4">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Dashboard
            </div>

            {classes ? (
                classes.length >= 1 ? (
                    <ClassCalendar classes={classes} />) :
                    <div className='text-center font-semibold text-3xl'>No Classes Found</div>
            ) : <Spinner />}

        </main>
    );
}
