import { Class, Schedule } from "@utils/ScheduleUtils"
import { createUser, getUser, addClassToUser } from "@utils/FirebaseUtils";



export class User {
    firstname: string
    lastname: string
    netid: string
    classes: string[]
    friends: User[]
    major: string
    year: string
    constructor(firstname: string, lastname: string, netid: string, classes: string[], major: string, year: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.netid = netid;
        this.classes = classes;
        this.friends = [];
        this.major = major;
        this.year = year;
        createUser(firstname, lastname, netid, classes, major, year)
    }

    public async getFriends() {
        this.friends = await getUser(this.netid).then((res) => { return res?.friends });
        return this.friends
    }

    public async addClass(courseid: string) {
        this.classes.push(courseid)
        await addClassToUser(this.netid, courseid)
    }
}
