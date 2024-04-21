"use client"

import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";

export default function Tag({ tagName }: { tagName: string }) {
    return (
        <div className="hover:cursor-pointer hover:opacity-85">
            <Chip color="warning" variant="flat">{tagName}</Chip>
        </div>
    );
}