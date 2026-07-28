'use client'

import { MoveBlob } from "./Ui/MoveBlob";

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 pointer-events-none">
            <div className="pointer-events-auto">
                <MoveBlob />
            </div>
        </header>
    )
}