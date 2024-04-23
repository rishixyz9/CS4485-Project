import React from "react";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";
import Tag from "@components/Tag";

export default function ClassCard({ classData }: { classData: any }) {
    return (
        <Card isFooterBlurred radius="lg" className="border-none">
            <CardHeader className="flex flex-col gap-3">
                {/* Class Name */}
                <div className="flex flex-col mr-auto">
                    <p className="text-md">{classData.name}</p>
                    <p className="text-small text-default-500">{classData.course}</p>
                </div>

                <div className="flex flex-row justify-between w-full">
                    {/* Time and Days */}
                    <div className="flex flex-col justify-start">
                        <p className="text-xl whitespace-nowrap">{classData.time}</p>
                        <p className="text-md text-default-500">{classData.days}</p>
                    </div>
                    {/* Instructor and Location */}
                    <div className="flex flex-col">
                        <p className="text-md">{classData.professor}</p>
                        <p className="text-small text-default-500">{classData.location}</p>
                    </div>
                </div>


                {/* Tags, kind of like on github */}
                <div className="flex flex-wrap gap-2">
                    <Tag tagName="ECSS" />
                    <Tag tagName="Afternoon" />
                    <Tag tagName="Computer Science" />
                    <Tag tagName="Major Prep" />
                </div>
            </CardHeader>
        </Card>
    );
}
