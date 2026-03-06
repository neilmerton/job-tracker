import * as React from "react";

interface DrawerProps {
    id: string;
    label: React.ReactNode;
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export default function Drawer({
    id,
    label,
    children,
    actions,
}: DrawerProps) {
    return (
        <>
            <button
                id={`${id}-trigger`}
                className="button"
                {...{ commandFor: id, command: "show-modal" }}
            >
                {label}
            </button>

            <dialog id={id} className="drawer">
                <div className="drawer__header">
                    <button
                        className="button button--secondary"
                        {...{ commandFor: id, command: "close" }}
                    >
                        Close
                    </button>
                </div>
                <div className="drawer__content">
                    {children}
                </div>
                {actions && (
                    <div className="drawer__actions">
                        {actions}
                    </div>
                )}
            </dialog>
        </>
    );
}
