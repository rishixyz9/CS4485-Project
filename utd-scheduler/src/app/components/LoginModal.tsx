import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";

import { useAuth } from "@hooks/AuthProvider";

import { User } from "@utils/UserUtils";
import { fetchLoginData, createUser } from "@utils/FirebaseUtils";

export default function LoginModal({ }: {}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const { user, logIn, logOut } = useAuth() as unknown as { user: User, logIn: (netid: string) => void, logOut: () => void };

  const [signUp, setSignUp] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>('Freshman');

  const netIdRef = useRef<HTMLInputElement>(null);
  const fnameRef = useRef<HTMLInputElement>(null);
  const lnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleNewLogin(func: Function) {
    const netid = netIdRef.current?.value || '';
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const fname = fnameRef.current?.value || '';
    const lname = lnameRef.current?.value || '';
    if (await fetchLoginData(netid, password, username, true) === netid) {
      console.log('authenticated: ', netid);
      createUser(fname, lname, netid, [], 'Computer Science', selectedClass).then(() => {
        logIn(netid);
      });
    } else {
      console.log('failed to create new user');
    };
    func();
  }

  async function handleLogin(func: Function) {
    const netid = netIdRef.current?.value || '';
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    if (await fetchLoginData(netid, password, username, false)) {
      console.log('authenticated: ', netid);
      logIn(netid);
    } else {
      console.log('authentication failed');
    };
    func();
  }

  return (
    <>
      <Button className="w-48 bg-gradient-to-r from-aqua to-h-purple text-md font-medium shadow-lg" onPress={onOpen} >Get Started!</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className=" text-white dark">
        <ModalContent >
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Login to continue</ModalHeader>
              {!signUp ? (
                <ModalBody>
                  <Input variant="bordered" type="text" label="NetId" placeholder="Enter your netid" ref={netIdRef} />
                  <Input variant="bordered" type="text" label="Username" placeholder="Enter your username" ref={usernameRef} />
                  <Input variant="bordered" type="password" label="Password" placeholder="Enter your password" ref={passwordRef} />
                </ModalBody>
              ) : (
                <ModalBody>
                  <Input variant="bordered" type="text" label="NetId" placeholder="Enter your netid" ref={netIdRef} />
                  <Input variant="bordered" type="text" label="First Name" placeholder="Enter your first name" ref={fnameRef} />
                  <Input variant="bordered" type="text" label="Last Name" placeholder="Enter your last name" ref={lnameRef} />
                  <Input variant="bordered" type="text" label="Username" placeholder="Enter your username" ref={usernameRef} />
                  <Input variant="bordered" type="password" label="Password" placeholder="Enter your password" ref={passwordRef} />
                  <Select
                    label="Year of education"
                    placeholder="Select your year"
                    className="dark max-w-xs w-64"
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    {["Freshman", "Sophomore", "Junior", "Senior"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </Select>
                </ModalBody>
              )}
              <ModalFooter className="flex">
                <Button className="float-left mr-auto" color="secondary" variant="flat" onPress={() => setSignUp(!signUp)}>
                  {!signUp ? 'Sign Up' : 'Have an account? Login'}
                </Button>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={signUp ? () => handleNewLogin(onOpen) : () => handleLogin(onOpen)}>
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
