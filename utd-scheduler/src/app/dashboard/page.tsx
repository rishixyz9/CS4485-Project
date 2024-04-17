"use client"

import React, { useEffect, useRef, useState } from "react";

import kamui from '@public/kamui.png'
import SideMenu from "@components/SideMenu";
import ClassCard from "@components/ClassCard";

export default function Dashboard() {

    const [cart, setCart] = useState([])

    let class1 = {
        name: 'Advanced Data Structures and Algorithms',
        course: 'CS 4349.001',
        time: '12:00 PM - 1:15 PM',
        days: 'MW',
        professor: 'James Wilson',
        location: 'ECSS 2.410',
    }

    let class2 = {
        name: 'Discrete Mathematics for Computing II',
        course: 'CS 3305.003',
        time: '1:30 PM - 2:45 PM',
        days: 'MW',
        professor: 'James Wilson',
        location: 'ECSS 2.412',
    }

    let class3 = {
        name: 'Digital Logic and Computer Design',
        course: 'CS 4341.002',
        time: '7:00 PM - 8:15 PM',
        days: 'TTh',
        professor: 'Omar Hamdy',
        location: 'ECSW 3.212',
    }


    return (
        <main className="flex flex-col w-screen h-screen">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Dashboard
            </div>
            <SideMenu />
            <div className="flex flex-wrap ml-4 mr-4 gap-8">
                <ClassCard classData={class1} />
                <ClassCard classData={class2} />
                <ClassCard classData={class3} />
                <ClassCard classData={class3} />
                <ClassCard classData={class3} />
            </div>

        </main>
    );
}
