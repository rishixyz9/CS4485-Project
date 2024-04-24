"use client"

import React, { use, useEffect, useRef, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";


import SideMenu from "@components/SideMenu";
import ClassCard from "@components/ClassCard";
import UserCard from "@components/UserCard";
import FriendModal from "@components/FriendModal";

import { Class, Schedule } from "@utils/ScheduleUtils";
import { User } from "@utils/UserUtils";
import { createUser, getUser, addFriendsToUser } from "@utils/FirebaseUtils";


export default function Friends() {

    const class1 = new Class('Advanced Data Structures and Algorithms', 'CS 4349.001', '12:00 PM - 1:15 PM', 'MW', 'James Wilson', 'ECSS 2.410')
    const class2 = new Class('Discrete Mathematics for Computing II', 'CS 3305.003', '1:30 PM - 2:45 PM', 'TTh', 'James Wilson', 'ECSS 2.412')
    const class3 = new Class('Digital Logic and Computer Design', 'CS 4341.002', '7:00 PM - 8:15 PM', 'TTh', 'Omar Hamdy', 'JO 6.216')
    const class4 = new Class('Computer Networks', 'CS 4390.005', '10:00 AM - 11:15 AM', 'MW', 'Zygmunt Haas', 'ECSS 2.305')
    const class5 = new Class('Human Language Technologies', 'CS 4395.001', '2:30 PM - 3:45 PM', 'MW', 'Omar Hamdy', 'ECSS 2.410')

    const schedule = new Schedule()
    schedule.addClass(class1, class2, class3, class4)
    const user1 = new User('John', 'Doe', 'jxd200022', [class1, class2, class3, class4, class5], schedule, 'Computer Science', 'Senior')

    const [friends, setFriends] = useState([])

    useEffect(() => {
        user1.getFriends().then((res) => {
            user1.friends.map((friend) => {
                getUser(friend).then((res) => {
                    console.log(res)
                    setFriends([...friends, res])
                })
            });
        });
    }, []);

    return (
        <main className="flex flex-col w-screen">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Friends
            </div>

            <div className="w-32 ml-4 mt-8 mb-8">
                <FriendModal setUser={addFriendsToUser} />
            </div>


            <div className="flex flex-wrap ml-4 mr-4 gap-8">
                {friends ? (friends.map((friend) => (
                    <UserCard key={friend.netId} userData={friend} />
                ))) : <Spinner color="primary" />}
            </div>


        </main>
    );
}
