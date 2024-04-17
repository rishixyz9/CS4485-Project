"use client"

import React, { useEffect, useRef, useState } from "react";
import LoginModal from "@/app/components/LoginModal";

export default function Home() {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    console.log(username, password);
  }, [username, password])

  return (
    <main className="flex flex-col w-screen h-screen justify-evenly">
      <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
        UT Dallas Collaborative Class Scheduler
      </div>
      <div className="self-center">
        <LoginModal setUser={setUsername} setPass={setPassword} />
      </div>


    </main>
  );
}
