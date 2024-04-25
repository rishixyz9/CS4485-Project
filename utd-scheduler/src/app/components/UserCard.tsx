import React from "react";
import Image from 'next/image';

import { Card, CardHeader, CardFooter, Button, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { removeFriendsFromUser } from "@/utils/FirebaseUtils";

import Tag from "@components/Tag";
import kamui from '@public/kamui.png';


export default function UserCard({ userData }: { userData: any }) {
    return (
        <Card isFooterBlurred radius="lg" className="border-none">
            <CardHeader className="flex flex-col gap-3 relative">
                <Tooltip color="danger" content="remove friend">
                    <FontAwesomeIcon className="absolute right-2 top-2 hover:cursor-pointer" color="#b22a2e" icon={faUserMinus} onClick={() => removeFriendsFromUser('jxd200022', userData.netId)} />
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
                        {userData.classes.map((classData: any) => {
                            return (
                                <Tag key={classData.course} tagName={classData.name} />
                            );
                        })}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}
