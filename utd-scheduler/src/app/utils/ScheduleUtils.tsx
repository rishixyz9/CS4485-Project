import { extractDaysFromString, extractTimesAsMinutes } from "./ClassTimeParser"

// example of inputs
// let class1 = {
//     name: 'Advanced Data Structures and Algorithms',
//     course: 'CS 4349.001',
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