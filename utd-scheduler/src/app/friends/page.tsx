"use client"

import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import UserCard from "@components/UserCard";
import FriendModal from "@components/FriendModal";
import GroupModal from "@components/GroupModal";
import EditModal from "@components/EditModal";

import ClassCalendar from "@components/ClassCalendar";
import ScheduleForGroup from "@components/ScheduleForGroup";

import { useAuth } from "@hooks/AuthProvider";

import { Class, Schedule } from "@utils/ScheduleUtils";
import { User } from "@utils/UserUtils";
import { getUser, fetchDataForCourse, getGroupsForUser } from "@utils/FirebaseUtils";


export default function Friends() {

    const { user, logIn, logOut } = useAuth() as unknown as { user: User, logIn: (netid: string) => void, logOut: () => void };

    const [groups, setGroups] = useState<any[]>([])
    const [friends, setFriends] = useState<any[]>([])

    const [viewing, setViewing] = useState<any>(null)
    const [editing, setEditing] = useState<any>(null)

    useEffect(() => {
        user.getFriends().then((data) => {
            let temp: any[] = []

            let promises = user?.friends.map(async (friend: string) => {
                const item = await getUser(friend)
                temp.push(item)
            })

            promises.push(getGroupsForUser(user.netid).then((res) => { setGroups(res) }))

            Promise.all(promises).then(() => {
                setFriends(temp);
            });
        })
    }, [user])

    return (
        <main className="flex flex-col w-screen pl-4">
            <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
                Friends
            </div>

            <div className="w-32 mt-8 mb-8">
                <FriendModal user={user} setFriends={setFriends} />
            </div>


            <div className="flex flex-wrap gap-8">
                {friends ? (friends.map((friend: any) => (
                    <UserCard key={friend.netId} userData={friend} setFriends={setFriends} />
                ))) : <Spinner color="primary" />}
            </div>

            <div className='font-semibold text-2xl text-white mt-8'>
                My Groups
            </div>

            <div className="flex flex-wrap gap-8 mt-8 mb-8">
                {groups ? (groups.map((group: any) => (
                    <Card key={group[0]} className="flex">
                        <CardBody className="flex gap-2">
                            <div className="flex mr-full text-xl font-medium">
                                {group[0]}
                            </div>
                            <div className="mr-full text-lg text-default-500">Members:</div>
                            <div>
                                {group[1].length > 0 && group[1].map((member: any) => (
                                    <div className="text-default-700" key={member}>{member}</div>
                                ))}
                            </div>
                            <div className="flex flex-row gap-2">
                                <Button color="primary" variant="flat" onClick={() => setViewing(group)}>
                                    View Schedule
                                </Button>
                                <EditModal group={group} setEditing={() => setEditing(group)} resetView={setViewing} />
                            </div>

                        </CardBody>
                    </Card>
                ))) : <Spinner color="primary" />}
            </div>


            <GroupModal groups={groups} setGroups={setGroups} user={user} friends={friends} />

            {(groups.length > 0 && viewing) && <ScheduleForGroup group={viewing} />}

        </main>
    );
}


