import { extractDaysFromString, extractTimesAsMinutes } from "./ClassTimeParser"

// example of inputs
// let class1 = {
//     name: 'Advanced Data Structures and Algorithms',
//     course: '4349.001',
//     time: '12:00 PM - 1:15 PM',
//     days: 'MW',
//     professor: 'James Wilson',
//     location: 'ECSS 2.410',
// }

export class Class {
    name: string
    course: string
    time: string
    days: string
    professor: string
    location: string
    timeSlot: any
    duration: any
    constructor(name: string, course: string, time: string, days: string, professor: string, location: string) {
        this.name = name
        this.course = course
        this.time = time
        this.days = days
        this.professor = professor
        this.location = location
        this.timeSlot = { times: extractTimesAsMinutes(this.time), days: extractDaysFromString(this.days), name: `${this.name} ${this.course}` }
    }
}

export class Schedule {
    classes: Class[]
    slots: any[]
    constructor() {
        this.classes = []
        this.slots = []
    }

    public addClass(...args: any) {
        this.classes.push(args)
        for (const arg of args) {
            this.slots.push(arg.timeSlot)
        }
    }

    public getTimeSlotsForDay(day: string) {
        let slots = []
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].days[day]) {
                slots.push([this.slots[i].times, this.slots[i].name])
            }
        }
        return slots
    }
}

export function classifyCourse(course: string) {
    let courseCode = course.split(".")

    let classifications = {
        "Major Prep": ["1100", "1200", "1136", "1336", "1337", "2305", "2336", "2340"],
        "Major Core": ["3162", "3305", "3341", "3345", "3354", "3377", "3390", "4141", "4337", "4341", "4347", "4348", "4349", "4384", "4485"],
        "Guided Elective": ["4314", "4315", "4334", "4336", "4352", "4353", "4361", "4365", "4375", "4376", "4386", "4389", "4390", "4391", "4392", "4393", "4394", "4395", "4396", "4397", "4398", "4399", "EE 4325", "4351", "4352", "4367", "4381"]
    }

    for (let key in classifications) {
        if (classifications[key as keyof typeof classifications].includes(courseCode[0])) {
            return key
        }
    }

    return "Elective"
}