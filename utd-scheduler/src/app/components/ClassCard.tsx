import React from "react";
import { Card, CardHeader } from "@nextui-org/react";
import { extractTimesAsMinutes } from "@/utils/ClassTimeParser";
import { classifyCourse } from "@/utils/ScheduleUtils";
import Tag from "@components/Tag";

export default function ClassCard({ classData }: { classData: any }) {

    const generateTags = (classData: any) => {
        let building = classData.location.split(" ")[0];
        let time = extractTimesAsMinutes(classData.time)?.startTime ?? 0 >= 12 ? "Afternoon" : "Morning";
        let department = "Computer Science"
        let classification = classifyCourse("4349")

        return (
            <div className="flex flex-wrap gap-2">
                <Tag tagName={building} />
                <Tag tagName={time} />
                <Tag tagName={department} />
                <Tag tagName={classification} />
            </div>
        )
    }

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
                {generateTags(classData)}

            </CardHeader>
        </Card>
    );
}
