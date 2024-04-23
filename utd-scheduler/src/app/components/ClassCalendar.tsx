import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/fontawesome-free-solid'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Tooltip } from "@nextui-org/react";
import { extractTimesAsMinutes, extractDaysFromString } from '@utils/ClassTimeParser';
import { Class, Schedule } from "@utils/ScheduleUtils";


export default function ClassCalendar() {

    const class_1 = new Class('Machine Learning', 'CS 5390.002', '9:30 AM - 10:45 AM', 'TTh', 'Laura Smith', 'ECSS 3.120')

    const class_2 = new Class('Database Systems', 'CS 5330.004', '2:00 PM - 3:15 PM', 'MW', 'Robert Johnson', 'ECSS 2.312')

    const class_3 = new Class('Operating Systems', 'CS 5349.003', '11:00 AM - 12:15 PM', 'F', 'Alice Martinez', 'ECSS 2.522')

    const class_4 = new Class('Network Security', 'CS 5370.001', '3:30 PM - 4:45 PM', 'MWF', 'David Lee', 'ECSS 2.208')

    const generateGridCol = (hour: Number, timeObjs: any[], enabled: Boolean) => {

        let delay = 0
        let busy = 0
        let free = 0
        let tooltip = ""

        for (const timeObj of timeObjs) {
            delay = Math.max(0, (Number(timeObj[0].startTime) - Number(hour)) * 4)
            busy = Math.min(4, Math.max(0, (timeObj[0].endTime - Number(hour)) * 4))
            free = Math.max(0, 4 - busy)
            tooltip = timeObj[1]

            if (busy > 0) {
                break;
            }
        }


        return (
            <div className="col-span-1 grid grid-rows-4 border-1 border-neutral-600">
                {enabled ? (<>
                    {[...Array(delay)].map((x, i) =>
                        <div key={i + 1} className="bg-white row-span-1"></div>
                    )}
                    {busy > 0 &&
                        <Tooltip color="primary" content={tooltip} className={`row-span-${busy} capitalize`}>
                            <div className={`row-span-${busy} bg-[#17c964]`}></div>
                        </Tooltip>}
                    {[...Array(free)].map((x, i) =>
                        <div key={i + 3} className="bg-white row-span-1"></div>
                    )}</>

                ) : (<>
                    {[...Array(4)].map((x, i) =>
                        <div key={i + 1} className="bg-white row-span-1"></div>
                    )}</>)}
            </div>
        )
    }

    const schedule1 = new Schedule()

    schedule1.addClass(class_1, class_2, class_3, class_4)

    return (
        // Calendar component that shows m-w schedule
        <div className="grid grid-rows-16 grid-cols-6 w-80 bg-[#18181b] text-lg text-center self-center mt-8 mb-8 p-2 rounded-md">

            {/* Grid header for days of the week */}
            <div className="grid grid-cols-6 col-span-6 row-span-1 gap-2 font-semibold">
                <FontAwesomeIcon className="col-span-1 object-cover self-center ml-auto mr-auto aspect-square" icon={faClock as IconProp} />
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>Th</div>
                <div>F</div>
            </div>

            {/* Grid body for class schedule from  8am to 8pm */}
            {[...Array(15)].map((x, i) =>
                <div className="row-span-1 col-span-6 grid grid-cols-6 grid-rows-1" key={i}>
                    <div className="col-span-1 text-center self-center">{(8 + i) % 12}</div>

                    {/* Monday */}
                    {generateGridCol(8 + i, schedule1.getTimeSlotsForDay('M'), schedule1.getTimeSlotsForDay('M') != null)}

                    {/* Tuesday */}
                    {generateGridCol(8 + i, schedule1.getTimeSlotsForDay('T'), schedule1.getTimeSlotsForDay('T') != null)}

                    {/* Wednesday */}
                    {generateGridCol(8 + i, schedule1.getTimeSlotsForDay('W'), schedule1.getTimeSlotsForDay('W') != null)}

                    {/* Thursday */}
                    {generateGridCol(8 + i, schedule1.getTimeSlotsForDay('Th'), schedule1.getTimeSlotsForDay('Th') != null)}

                    {/* Friday */}
                    {generateGridCol(8 + i, schedule1.getTimeSlotsForDay('F'), schedule1.getTimeSlotsForDay('F') != null)}
                </div>
            )}
        </div>
    );
}
