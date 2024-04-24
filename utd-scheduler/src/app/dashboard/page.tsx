"use client"

import React, { useEffect, useRef, useState } from "react";

import SideMenu from "@components/SideMenu";
import ClassCard from "@components/ClassCard";
import ClassCalendar from "@components/ClassCalendar";
import { Class, Schedule } from "@utils/ScheduleUtils";

export default function Dashboard() {

    const [cart, setCart] = useState([])

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
            <div className="flex flex-wrap ml-4 mr-4 gap-8">
                <ClassCard classData={class1} />
                <ClassCard classData={class2} />
                <ClassCard classData={class3} />
                <ClassCard classData={class4} />
                <ClassCard classData={class5} />
            </div>

            <ClassCalendar />

        </main>
    );
}
