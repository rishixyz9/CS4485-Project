import { Class, Schedule } from "@utils/ScheduleUtils"
import { createUser, getUser } from "@utils/FirebaseUtils";



export class User {
    firstname: string
    lastname: string
    netid: string
    classes: Class[]
    schedule: Schedule
    friends: User[]
    major: string
    year: string
    constructor(firstname: string, lastname: string, netid: string, classes: Class[], schedule: Schedule, major: string, year: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.netid = netid;
        this.classes = classes;
        this.schedule = schedule;
        this.friends = [];
        this.major = major;
        this.year = year;
        createUser(firstname, lastname, netid, classes, schedule, major, year)
    }

    public async getFriends() {
        this.friends = await getUser(this.netid).then((res) => { return res?.friends });
        return this.friends
    }
}
