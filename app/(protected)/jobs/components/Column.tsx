"use client";

import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export default function Column({
    status,
    children,
}: {
    status: string;
    children: React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        return dropTargetForElements({
            element: el,
            getData: () => ({ status }),
            onDragEnter: () => setIsDragOver(true),
            onDragLeave: () => setIsDragOver(false),
            onDrop: () => setIsDragOver(false),
        });
    }, [status]);

    return (
        <div
            ref={ref}
            className={`board-column ${isDragOver ? "board-column--drag-over" : ""}`}
        >
            <h2 className="board-column__title">{status}</h2>
            <div className="board-column__content">{children}</div>
        </div>
    );
}
