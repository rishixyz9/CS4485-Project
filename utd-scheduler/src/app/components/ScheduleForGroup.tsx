import React, { useState, useEffect } from 'react';

import ClassCalendar from '@components/ClassCalendar';
import { Spinner } from '@nextui-org/react';

import { Class } from '@utils/ScheduleUtils';
import { fetchDataForCourse } from '@utils/FirebaseUtils';

export default function ScheduleForGroup({ group }: { group: any[] }) {

    const [classes, setClasses] = useState<Class[]>([])

    useEffect(() => {
        if (!group) return

        console.log(group)
        let temp: any[] = []
        let promises = group[2].map(async (course: string) => {
            const item = await fetchDataForCourse(course)
            temp.push(new Class(item?.name, item?.course, item?.time, item?.days, item?.professor, item?.location));
        })
        Promise.all(promises).then(() => {
            setClasses(temp)
        })
    }, [group])


    return classes ? <ClassCalendar classes={classes} /> : <Spinner />
}