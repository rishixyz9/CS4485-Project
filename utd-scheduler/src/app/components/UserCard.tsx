import React, { useEffect, useState } from "react";
import Image from 'next/image';

import { Card, CardHeader, Spinner, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "@hooks/AuthProvider";

import { Class } from "@utils/ScheduleUtils";
import { User } from "@utils/UserUtils";
import { getUser, fetchClassData, fetchDataForCourse, removeFriendsFromUser, getGroupsForUser } from "@utils/FirebaseUtils";

import Tag from "@components/Tag";
import kamui from '@public/kamui.png';
import { get } from "http";


export default function UserCard({ userData, setFriends }: { userData: any, setFriends: Function }) {

    const [classes, setClasses] = useState<Class[]>([])

    const { user, logIn, logOut } = useAuth() as unknown as { user: User, logIn: (netid: string) => void, logOut: () => void };

    useEffect(() => {
        let temp: Class[] = [] // Explicitly type 'temp' as an array of 'Class' objects
        const promises = userData?.classes.map(async (course: any) => {
            const item = await fetchDataForCourse(course);
            temp.push(new Class(item?.name, item?.course, item?.time, item?.days, item?.professor, item?.location));
        });

        Promise.all(promises).then(() => {
            setClasses(temp);
        });
    }, [userData])


    const handleRemoveFriend = () => {
        setFriends((prevFriends: any) => prevFriends.filter((friend: any) => friend.netId !== userData.netId));
        removeFriendsFromUser(user.netid, userData.netId)
    }

    return (
        <Card isFooterBlurred radius="lg" className="border-none">
            <CardHeader className="flex flex-col gap-3 relative">
                <Tooltip color="danger" content="remove friend">
                    <FontAwesomeIcon className="absolute right-2 top-2 hover:cursor-pointer" color="#b22a2e" icon={faUserMinus} onClick={handleRemoveFriend} />
                </Tooltip>
                {/* User Name */}
                <div className="flex flex-col text-center">
                    <p className="text-sm text-default-500">{userData.netId}</p>
                    <p className="text-2xl whitespace-nowrap">{userData.firstname} {userData.lastname}</p>
                    <p className="text-md text-default-500">{userData.year} - {userData.major}</p>
                </div>

                <Image src={kamui} alt="User Icon" className="w-16 h-16 rounded-full object-cover" />

                {/* Shared Classes */}
                <div className="flex flex-col justify-start">
                    <p className="text-md">Shared Classes:</p>
                    <div className="flex flex-col text-small text-default-500 gap-2">
                        {classes && classes[0] ? classes.map((classData: any) => {
                            if (classData.course in userData.classes) {
                                return (
                                    <Tag key={classData.course} tagName={classData.name} />
                                );
                            }
                        }) : <Spinner color="primary" />}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}
