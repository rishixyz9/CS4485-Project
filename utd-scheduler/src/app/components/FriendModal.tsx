import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@utils/UserUtils";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { addFriendsToUser, getUser } from "@utils/FirebaseUtils";


export default function FriendModal({ user, setFriends }: { user: User, setFriends: Function }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const netidRef = useRef<HTMLInputElement>(null);

    function handleAdd(func: Function) {
        if (netidRef.current === null || netidRef.current.value === user.netid) return; // Add null check
        const netid = netidRef.current?.value ?? ""; // Add nullish coalescing operator
        addFriendsToUser(user.netid, netid).then((res) => {
            getUser(netid).then((res) => {
                if (res !== null) {
                    setFriends([...user.friends, res]);
                } else {
                    console.log('User not found')
                }
            });
        });
        func();
    }

    return (
        <>
            <Button className="w-48 text-md font-medium shadow-lg" color="primary" onPress={onOpen} variant="flat" >
                Add Friends
            </Button >
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark text-white ">
                <ModalContent >
                    {(onClose: () => void) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Friend By NetId</ModalHeader>
                            <ModalBody>
                                <Input variant="bordered" type="text" label="netid" placeholder="Enter friend's netid" ref={netidRef} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => handleAdd(onOpen)}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
