import React, { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@utils/UserUtils";

import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Spinner } from "@nextui-org/react";
import { createGroup, addUserToGroup, getGroupsForUser } from "@utils/FirebaseUtils";

import PaginatedForm from "@components/PaginatedForm";

export default function GroupModal({ groups, setGroups, user, friends }: { groups: any, setGroups: Function, user: User, friends: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const CreateGroupForm = () => {

        const [option, setOption] = useState<any>()
        const inputRef = useRef<HTMLInputElement>(null)
        const [disabled, setDisabled] = useState<boolean>(false)

        const handleCreateGroup = async () => {
            setDisabled(true)
            await createGroup(inputRef?.current?.value, [user.netid])
            setGroups([...groups, [inputRef?.current?.value, [user.netid], []]])
        }

        return (
            <div className="flex flex-row">
                <Input
                    label="Group Name"
                    placeholder="Enter group name"
                    value={option}
                    ref={inputRef}
                    onChange={(e) => setOption(e.target.value)}
                />
                <Button className="ml-8 self-center w-32" color="primary" onPress={handleCreateGroup} variant="flat" disabled={disabled}>
                    Create Group
                </Button >
            </div>

        )
    }

    const AddFriendsToGroup = () => {

        const [selectedGroup, setSelectedGroup] = useState<any>()
        const [option, setOption] = useState<any>()
        const inputRef = useRef<HTMLInputElement>(null)
        const [disabled, setDisabled] = useState<boolean>(false)

        const handleCreateGroup = async () => {
            setDisabled(true)
            await addUserToGroup(selectedGroup, option)
        }

        return (
            groups ? (<div className="flex flex-col gap-2">
                <Select
                    label="Group Select"
                    placeholder="Select a group"
                    className="dark max-w-xs w-64"
                    onChange={(e) => setSelectedGroup(e.target.value)}
                >
                    {groups.map((item) => (
                        <SelectItem key={item[0]} value={item[0]}>
                            {item[0]}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Option Select"
                    placeholder="Select an option"
                    className="dark max-w-xs w-64"
                    onChange={(e) => setOption(e.target.value)}
                >
                    {friends.map((item) => (
                        <SelectItem key={item.netId} value={item.netId}>
                            {item.netId}
                        </SelectItem>
                    ))}
                </Select>
                <Button color="primary" onPress={handleCreateGroup} variant="flat" disabled={disabled}>
                    Add Friend To Group
                </Button >
            </div >) : <Spinner color="primary" />

        )
    }

    return (
        <>
            <Button className="w-48 text-md font-medium shadow-lg" color="primary" onPress={onOpen} variant="flat" >
                Manage My Groups
            </Button >
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark text-white ">
                <ModalContent >
                    {(onClose: () => void) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Manage Groups</ModalHeader>
                            <ModalBody>
                                <PaginatedForm pages={[
                                    { component: CreateGroupForm(), verifier: false },
                                    { component: AddFriendsToGroup(), verifier: false },
                                ]} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="ghost" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
