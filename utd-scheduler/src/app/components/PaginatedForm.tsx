"use client"

import React, { use, useEffect, useRef, useState } from "react";
import { Button, Pagination } from "@nextui-org/react";

interface page {
    component: React.ReactNode;
    verifier: boolean;
}

export default function PaginatedForm({ pages }: { pages: page[] }) {

    const [currentPage, setCurrentPage] = React.useState(1);

    return (
        <div className="flex flex-col gap-5 bg-[#181818] w-max p-4 rounded-md transition-height">
            <p className="text-small text-default-500">Selected Page: {currentPage}</p>

            {pages[currentPage - 1].component}

            <Pagination
                total={pages.length}
                color="primary"
                page={currentPage}
                onChange={setCurrentPage}
            />
            <div className="flex gap-2">
                <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                >
                    Previous
                </Button>

                <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    onPress={() => {
                        if (pages[currentPage - 1].verifier === false) {
                            setCurrentPage((prev) => (prev < pages.length ? prev + 1 : prev));
                        }
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}