"use client"

import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import UserCard from "@components/UserCard";
import FriendModal from "@components/FriendModal";

import { useAuth } from "@hooks/AuthProvider";

import { Class, Schedule } from "@utils/ScheduleUtils";
import { User } from "@utils/UserUtils";
import { getUser, fetchDataForCourse } from "@utils/FirebaseUtils";


export default function Friends() {

    const p = useAuth();
    console.log(p)

    const [user, setUser] = useState<User | null>(null)
    const [classes, setClasses] = useState<Class[]>([])
    const [friends, setFriends] = useState([])

    useEffect(() => {
        getUser("jxd200022").then((data) => {
            setUser(new User(data?.firstname, data?.lastname, data?.netId, data?.classes, data?.major, data?.year))
            let tempF = []
            let tempC = []
            let promises = [
                data?.friends.map(async (friend: string) => {
                    const item = await getUser(friend)
                    tempF.push(item)
                }),
                data?.classes.map(async (course: any) => {
                    const item = await fetchDataForCourse(course);
                    tempC.push(new Class(item?.name, item?.course, item?.time, item?.days, item?.professor, item?.location));
                })
            ]

            Promise.all(promises).then(() => {
                setFriends(tempF);
                setClasses(tempC);
            });
        })
    }, [])


    useEffect(() => {
        console.log(friends)
    }, [friends])


    return (
        <main className="flex flex-col w-screen">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Friends
            </div>

            <div className="w-32 ml-4 mt-8 mb-8">
                <FriendModal user={user} setFriends={setFriends} />
            </div>


            <div className="flex flex-wrap ml-4 mr-4 gap-8">
                {friends && friends[0] ? (friends.map((friend) => (
                    <UserCard key={friend.netId} userData={friend} />
                ))) : <Spinner color="primary" />}
            </div>


        </main>
    );
}
