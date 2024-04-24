import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


export default function FriendModal({ setUser }: { setUser: Function }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const netidRef = useRef<HTMLInputElement>(null);

    function handleLogin(func: Function) {
        const netid = netidRef.current?.value;
        setUser('jxd200022', netid);
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
                                <Button color="primary" onPress={() => handleLogin(onOpen)}>
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
