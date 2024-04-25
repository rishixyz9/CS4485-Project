import React, { useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBookOpen } from '@fortawesome/fontawesome-free-solid'
import { faCircleUser, faCalendarDays, faGear, faRightFromBracket, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import kamui from '@public/kamui.png'

export default function SideMenu() {

    const [open, setOpen] = useState(false);

    const router = useRouter();

    const toggleMenu = () => {
        setOpen(!open);
    }

    return (
        <>
            {/* hamburger menu icon */}
            <div className='ml-6 absolute mt-8 top-0 z-[60]'>
                <FontAwesomeIcon className='w-7 h-7 hover:cursor-pointer hover:opacity-80 hover:scale-75' icon={faBars as IconProp} onClick={toggleMenu} />
            </div>

            {/* side menu with items */}
            <div className={`flex flex-col w-80 mb-6 h-full bg-slate-600 absolute top-0 z-50 p-2 ${(open ? "left-0 opac" : "-left-80")}`}>

                {/* user profile */}
                <div className="flex flex-col items-center mt-32 mb-8 gap-2">
                    <Image src={kamui} alt="User Icon" className="w-16 h-16 rounded-full object-cover" />
                    <div className="flex flex-col text-center">
                        <div className="text-white font-semibold">Rishabh Vemparala</div>
                        <div className="text-gray-400">rxv200022</div>
                    </div>
                </div>

                {/* dropdown items */}
                <div className="flex flex-col font-medium gap-2">
                    <div className="flex flex-row p-2 pl-4 rounded-md hover:bg-cyan-600 hover:cursor-pointer flex-grow-0" onClick={() => router.push('/classes')}>
                        <FontAwesomeIcon className="self-center w-4 h-4" icon={faBookOpen as IconProp} />
                        <div className='ml-6'>Classes</div>
                    </div>
                    <div className="flex flex-row p-2 pl-4 rounded-md hover:bg-cyan-600 hover:cursor-pointer flex-grow-0" onClick={() => router.push('/dashboard')}>
                        <FontAwesomeIcon className="self-center w-4 h-4" icon={faCalendarDays} />
                        <div className='ml-6'>Schedule</div>
                    </div>
                    <div className="flex flex-row p-2 pl-4 rounded-md hover:bg-cyan-600 hover:cursor-pointer flex-grow-0" onClick={() => router.push('/friends')}>
                        <FontAwesomeIcon className="self-center w-4 h-4" icon={faUserGroup} />
                        <div className='ml-6'>Friends</div>
                    </div>
                    <div className="flex flex-row p-2 pl-4 rounded-md hover:bg-cyan-600 hover:cursor-pointer flex-grow-0" onClick={() => router.push('#')}>
                        <FontAwesomeIcon className="self-center w-4 h-4" icon={faGear} />
                        <div className='ml-6'>Settings</div>
                    </div>
                </div>

                {/* footer items */}
                <div className="flex flex-col font-medium mt-auto mb-8 gap-[0.25rem]">
                    <div className="flex flex-row p-2 pl-4 rounded-md hover:bg-violet-600 hover:cursor-pointer flex-grow-0" onClick={() => router.push('#')}>
                        <FontAwesomeIcon className="self-center" icon={faCircleUser} />
                        <div className='ml-4'>Profile</div>
                    </div>
                    <div className="flex flex-row p-2 pl-4 rounded-md hover:bg-red-500 hover:cursor-pointer flex-grow-0" onClick={() => router.push('#')}>
                        <FontAwesomeIcon className="self-center" icon={faRightFromBracket} />
                        <div className='ml-4'>Logout</div>
                    </div>
                </div>
            </div >
        </>
    );
};