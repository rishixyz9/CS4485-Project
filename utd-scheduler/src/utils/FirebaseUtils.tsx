// npm install firebase
//firebase login
//firebase init
//firebase deploy

// Import the functions you need from the SDKs you need
import { db } from "@/config/FirebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, setDoc, arrayUnion, arrayRemove, DocumentData } from "firebase/firestore";
import classData from "../../data/class_data.json";

import { hashPassword, verifyPassword } from "@utils/LoginUtils";


export async function createLoginData(netId: string, password: string, username: string) {
    const loginData = {
        netid: netId,
        password: hashPassword(password),
        username: username
    };

    try {
        const docRef = await setDoc(doc(db, "login", netId), loginData);
        console.log("Login record created with ID: ", netId);
        return netId
    } catch (error) {
        console.error("Error creating login record: ", error);
    }
}

export async function fetchLoginData(netId: string, password: string, username: string) {
    try {
        const docRef = await getDoc(doc(db, "login", netId));
        if (docRef.exists()) {
            if (verifyPassword(password, docRef.data().password) && docRef.data().username === username) {
                return true // Correct password
            }
            return false // Incorrect password
        } else {
            await createLoginData(netId, password, username) //no login data found, create new login data
            return netId
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw error;
    }
}

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

export async function createUser(firstname: string, lastname: string, netId: string, classes: string[], major: string, year: string) {
    try {
        if (!await getUser(netId)) {
            const docRef = await setDoc(doc(db, "users", netId), {
                firstname,
                lastname,
                netId,
                classes: classes,
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

export async function addClassToUser(netId: string, courseId: any) {
    try {
        if (await getUser(netId)) {
            const docRef = await updateDoc(doc(db, "users", netId), {
                classes: arrayUnion(courseId)
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