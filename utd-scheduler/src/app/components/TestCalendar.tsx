import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/fontawesome-free-solid'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Tooltip } from "@nextui-org/react";
import { extractTimesAsMinutes, extractDaysFromString } from '@/utils/ClassTimeParser';
import { Class, Schedule } from "@/utils/ScheduleUtils";


export default function TestCalendar({ classes }: { classes: Class[] }) {

    const schedule1 = new Schedule()

    for (const course of classes) {
        schedule1.addClass(course)
    }

    const days = ['M', 'T', 'W', 'Th', 'F']

    let slots = {
        "M": [],
        "T": [],
        "W": [],
        "Th": [],
        "F": []
    }

    for (const day of days) {
        let prev = 0
        schedule1.getTimeSlotsForDay(day).forEach((slot: any) => {
            let timings = slot[0]
            let toolTip = slot[1]

            let startPos = ((timings.startTime - 6) / 16)
            let width = ((timings.hours + timings.minutes) / 16)

            slots[day].push([prev * 100, startPos * 100, width * 100, toolTip])
            prev = startPos + width
        })
    }


    const generateRow = (day: string) => {

        let row = []

        for (const slot of slots[day]) {
            console.log(slot[3], (slot[1] - slot[0]))
            row.push(
                <>
                    {slot[1] - slot[0] > 0 && <div className={`w-[${slot[1] - slot[0]}%] h-16 bg-white/10 rounded-md border-white border-1`}></div>}
                    <Tooltip color="primary" content={slot[3]} className="capitalize">
                        <div className={`w-[${slot[2]}%] h-16 bg-aqua/10 rounded-md border-aqua border-1`}></div>
                    </Tooltip>
                </>
            )
        }

        return (
            <div className="flex flex-row w-full">
                {/* day of the week */}
                <div className="h-16 border-2 border-secondary w-[10%] rounded-md mr-2 flex items-center justify-center">{day}</div>

                {/* time blocks for the day */}
                <div className="flex flex-row gap-2 w-full">
                    {row}
                    <div className="flex-1 h-16 bg-white/10 rounded-md border-white border-1"></div>
                </div>
            </div>
        )

    }


    return (
        // Calendar component that shows m-w schedule from 6am to 10pm (16 hours)
        <div className="flex flex-col w-[30rem] bg-[#18181b] text-lg text-center self-center mt-8 mb-8 p-2 rounded-md h-max gap-2">

            {/* monday */}
            {generateRow('M')}

            {/* tuesday */}
            {generateRow('T')}

            {/* wednesday */}
            {generateRow('W')}

            {/* thursday */}
            {generateRow('Th')}

            {/* friday */}
            {generateRow('F')}




        </div>
    );
}

// sample of day statically

// {/* wednesday */}
// <div className="flex flex-row w-full">
//     {/* day of the week */}
//     <div className="h-16 border-2 border-secondary w-[10%] rounded-md mr-2 flex items-center justify-center">W</div>

//     {/* time blocks for the day */}
//     <div className="flex flex-row gap-2 w-full">
//         <div className="w-[43.75%] h-16 bg-white/10 rounded-md border-white border-2"></div>
//         <Tooltip color="primary" content={"Computer Science I for Non-majors 1335.001"} className="capitalize">
//             <div className="w-[7.8125%] h-16 bg-aqua/10 rounded-md border-aqua border-2"></div>
//         </Tooltip>
//         <div className="flex-1 h-16 bg-white/10 rounded-md border-white border-2"></div>
//     </div>
// </div>


