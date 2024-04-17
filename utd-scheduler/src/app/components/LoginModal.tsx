import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


export default function LoginModal({ setUser, setPass }: { setUser: Function, setPass: Function }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleLogin(func: Function) {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    setUser(username);
    setPass(password);
    router.push('/dashboard');
    func();
  }

  return (
    <>
      <Button className="w-48 bg-gradient-to-r from-aqua to-h-purple text-md font-medium shadow-lg" onPress={onOpen} >Get Started!</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className=" text-white ">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Login to continue</ModalHeader>
              <ModalBody>
                <Input variant="bordered" type="text" label="Username" placeholder="Enter your username" ref={usernameRef} />
                <Input variant="bordered" type="password" label="Password" placeholder="Enter your password" ref={passwordRef} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleLogin(onOpen)}>
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
