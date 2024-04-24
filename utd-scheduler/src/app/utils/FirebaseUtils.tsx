// npm install firebase
//firebase login
//firebase init
//firebase deploy

// Import the functions you need from the SDKs you need
import { db } from "@/config/FirebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, setDoc, arrayUnion, arrayRemove, DocumentData } from "firebase/firestore";
import classData from "../../../data/class_data.json";

import { Class, Schedule } from "@utils/ScheduleUtils";




export async function getUser(netId: string) {
    try {
        const docRef = await getDoc(doc(db, "users", netId));
        if (docRef.exists()) {
            return docRef.data();
        } else {
            return null
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw error;
    }
}

export async function createUser(firstname: string, lastname: string, netId: string, classes: Class[], schedule: Schedule, major: string, year: string) {
    try {
        if (!await getUser(netId)) {
            const docRef = await setDoc(doc(db, "users", netId), {
                firstname,
                lastname,
                netId,
                classes: classes.map((classData) => {
                    return {
                        name: classData.name,
                        course: classData.course,
                        time: classData.time,
                        days: classData.days,
                        professor: classData.professor,
                        location: classData.location
                    }
                }),
                major,
                year,
            });
            console.log("User created with ID: ", netId);
        } else {
            console.log("User with exists with ID: ", netId);
        }

    } catch (error) {
        console.error("Error creating user: ", error);
    }
};

export async function addFriendsToUser(netId: string, friendId: any) {
    try {
        if (await getUser(friendId) && await getUser(netId)) {
            const docRef = await updateDoc(doc(db, "users", netId), {
                friends: arrayUnion(friendId)
            });
        }
        console.log("Document updated with ID: ", netId);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export async function removeFriendsFromUser(netId: string, friendId: any) {
    try {
        if (await getUser(friendId) && await getUser(netId)) {
            const docRef = await updateDoc(doc(db, "users", netId), {
                friends: arrayRemove(friendId)
            });
        }
        console.log("Document updated with ID: ", netId);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export async function addClassToUser(netId: string, classId: any) {
    try {
        if (await getUser(netId)) {
            const docRef = await updateDoc(doc(db, "users", netId), {
                classes: arrayUnion(classId)
            });
        }
        console.log("Document updated with ID: ", netId);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export async function fetchClassData() {
    try {
        const classData: DocumentData[] = [];
        const querySnapshot = await getDocs(collection(db, "classes"));
        querySnapshot.forEach((doc) => {
            classData.push(doc.data());
        });
        return classData;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

export async function fetchDataForCourse(course: string) {
    try {
        const docRef = await getDoc(doc(db, "classes", course));
        if (docRef.exists()) {
            return docRef.data();
        } else {
            return null
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw error;
    }

}

export async function migrateClassData() {
    const classDataArray = Object.values(classData);

    classDataArray.forEach(async (classData) => {
        try {
            const docRef = await setDoc(doc(db, "classes", classData.course), classData);
            console.log("Class added with ID: ", classData.course);
        } catch (error) {
            console.error("Error adding class: ", error);
        }
    });
}