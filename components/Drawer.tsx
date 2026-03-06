import { ReactNode } from "react";

interface DrawerProps {
  id: string;
  buttonLabel: ReactNode;
  drawerTitle: ReactNode;
  children: ReactNode;
}

export default function Drawer({
  id,
  buttonLabel,
  drawerTitle,
  children,
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
        <header className="drawer__header">
          <h2 className="drawer__title">{drawerTitle}</h2>
          <button
            className="button button--secondary"
            {...{ commandFor: id, command: "close" }}
          >
            Close
          </button>
        </header>
        <div className="drawer__content">
          {children}
        </div>
      </dialog>
    </>
  );
}
