// npm install firebase
//firebase login
//firebase init
//firebase deploy

// Import the functions you need from the SDKs you need
import { db } from "@/config/FirebaseConfig";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";


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

export async function createUser(firstName: string, lastName: string, netId: string) {
    try {
        if (!await getUser(netId)) {
            const docRef = await setDoc(doc(db, "users", netId), {
                firstName,
                lastName,
                netId,
            });
            console.log("User created with ID: ", netId);
        } else {
            console.log("User with exists with ID: ", netId);
        }

    } catch (error) {
        console.error("Error creating user: ", error);
    }
};