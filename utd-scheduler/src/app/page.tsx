"use client"

import React from "react";
import LoginModal from "@components/LoginModal";

export default function Home() {

  return (
    <main className="flex flex-col w-screen h-screen justify-evenly">
      <div className='text-center font-bold text-6xl text-white w-[50%] self-center'>
        UT Dallas Collaborative Class Scheduler
      </div>
      <div className="self-center">
        <LoginModal />
      </div>
    </main>
  );
}
