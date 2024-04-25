export function extractTimesAsMinutes(time: string) {
    const regex = /(\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)/;
    const match = time.match(regex);

    if (match) {
        // Function to convert time string to minutes since midnight
        const timeToMinutes = (res: any) => {
            const [timePart, period] = res.split(' ');
            let [hours, minutes] = timePart.split(':').map(Number);

            if (hours === 12) hours = 0; // Convert 12 to 0 for calculations
            if (period === 'PM') hours += 12;

            return hours * 60 + minutes;
        };

        const startTimeMinutes = timeToMinutes(match[1]);
        const endTimeMinutes = timeToMinutes(match[2]);

        let durationMinutes = endTimeMinutes - startTimeMinutes;
        if (durationMinutes < 0) {
            durationMinutes += 24 * 60; // Add 24 hours in minutes
        }

        return {
            startTime: startTimeMinutes / 60,
            endTime: endTimeMinutes / 60,
            hours: Math.floor(durationMinutes / 60),
            minutes: Math.round((durationMinutes % 60) / 60 / 0.25) * 0.25
        };
    } else {
        return null; // No match found
    }
}

export function extractDaysFromString(daysString: String) {
    let res: { [key: string]: boolean } = {}; // Add index signature to allow indexing with a string
    for (let i = 0; i < daysString.length; i++) {
        if (daysString[i] === 'T' && daysString[i + 1] === 'h') {
            res['Th'] = true;
            i++;
        } else {
            res[daysString[i]] = true;
        }
    }
    return res
}

export function compareTwoDaysFromString(s1: string, s2: string) {
    const regex = /Th|[MTWFS]/g;
    const s2days = s2.match(regex) || [];
    for (let i = 0; i < s2days.length; i++) {
        if (!s1.includes(s2days[i])) {
            return false
        }
    }
    return true
}