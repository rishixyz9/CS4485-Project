import { Class, Schedule } from "./ScheduleUtils"
import { createUser, getUser } from "@utils/FirebaseUtils";



export class User {
    firstname: string
    lastname: string
    netid: string
    classes: Class[]
    schedule: Schedule
    constructor(firstname: string, lastname: string, netid: string, classes: Class[], schedule: Schedule) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.netid = netid;
        this.classes = classes;
        this.schedule = schedule;
        createUser(firstname, lastname, netid)
    }
}
