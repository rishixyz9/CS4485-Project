import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/fontawesome-free-solid'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function ClassCalendar() {
    return (
        // Calendar component that shows m-w schedule
        <div className="grid grid-rows-12 grid-cols-6 w-80 h-96 bg-[#18181b] text-lg text-center self-center mt-8 mb-8 p-1 gap-2 rounded-md">
            
            {/* Grid header for days of the week */}
            <div className="grid grid-cols-6 col-span-6 row-span-1">
                <FontAwesomeIcon className="col-span-1 object-cover self-center ml-auto mr-auto" icon={faClock as IconProp} />
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>Th</div>
                <div>F</div>
            </div>

            {/* Grid body for class schedule from  8am to 8pm */}
            <div className="grid col-span-1 row-span-11">
            {[...Array(11)].map((x, i) =>
               return(<div key={i}>i<div/>) 
            )}
            </div>


            {/* <div className="flex flex-row row-span-1">

            </div> */}
        </div>
    );
}
