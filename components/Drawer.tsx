import * as React from "react";

interface DrawerProps {
  id: string;
  buttonLabel: React.ReactNode;
  drawerTitle: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export default function Drawer({
  id,
  buttonLabel,
  drawerTitle,
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
        {buttonLabel}
      </button>

      <dialog id={id} className="drawer">
        <div className="drawer__header">
          <h2 className="drawer__title">{drawerTitle}</h2>
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
