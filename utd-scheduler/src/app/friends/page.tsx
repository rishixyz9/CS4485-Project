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

    const { user, logIn, logOut } = useAuth() as unknown as { user: User, logIn: () => void, logOut: () => void };
    const [friends, setFriends] = useState<any[]>([])

    useEffect(() => {
        let temp: any[] = []
        let promises = user.friends.map(async (friend: string) => {
            const item = await getUser(friend)
            temp.push(item)
        })

        Promise.all(promises).then(() => {
            setFriends(temp);
        });
    }, [user])

    return (
        <main className="flex flex-col w-screen">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Friends
            </div>

            <div className="w-32 ml-4 mt-8 mb-8">
                <FriendModal user={user} setFriends={setFriends} />
            </div>


            <div className="flex flex-wrap ml-4 mr-4 gap-8">
                {friends ? (friends.map((friend: any) => (
                    <UserCard key={friend.netId} userData={friend} setFriends={setFriends} />
                ))) : <Spinner color="primary" />}
            </div>


        </main>
    );
}
