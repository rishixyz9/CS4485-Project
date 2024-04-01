import React from "react";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="w-48 bg-gradient-to-r from-aqua to-h-purple text-md font-medium shadow-lg" onPress={onOpen} >Get Started!</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className=" text-white ">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Login to continue</ModalHeader>
              <ModalBody>
                <Input variant="bordered" type="text" label="Username" placeholder="Enter your username" />
                <Input variant="bordered" type="password" label="Password" placeholder="Enter your password" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
