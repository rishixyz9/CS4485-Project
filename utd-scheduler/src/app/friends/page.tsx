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

    const { user, logIn, logOut } = useAuth() as unknown as { user: User, logIn: (netid: string) => void, logOut: () => void };
    const [friends, setFriends] = useState<any[]>([])

    useEffect(() => {
        user.getFriends().then((data) => {
            let temp: any[] = []
            let promises = user.friends.map(async (friend: string) => {
                const item = await getUser(friend)
                console.log(item)
                temp.push(item)
            })
            Promise.all(promises).then(() => {
                setFriends(temp);
            });
        })

    }, [user])

    useEffect(() => {
        console.log(friends)
    }, [friends])

    return (
        <main className="flex flex-col w-screen pl-4">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Friends
            </div>

            <div className='font-semibold text-2xl text-white'>
                Invitations
            </div>

            <div className="w-32 mt-8 mb-8">
                <FriendModal user={user} setFriends={setFriends} />
            </div>


            <div className="flex flex-wrap gap-8">
                {friends ? (friends.map((friend: any) => (
                    <UserCard key={friend.netId} userData={friend} setFriends={setFriends} />
                ))) : <Spinner color="primary" />}
            </div>


        </main>
    );
}
