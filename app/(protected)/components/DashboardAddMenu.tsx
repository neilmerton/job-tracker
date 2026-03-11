"use client";

import { useDrawer } from "@/contexts/DrawerContext";
import JobFormAdd from "../jobs/components/JobFormAdd";
import ConnectionFormAdd from "../connections/components/ConnectionFormAdd";

export default function DashboardAddMenu() {
  const { openDrawer } = useDrawer();

  return (
    <>
      <button
        className="button"
        id="addButton"
        popoverTarget="add-menu"
        style={{ anchorName: "--add-menu-btn" } as React.CSSProperties}
      >
        <span className="label">Add</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="m12 16l-6-6h12z" />
        </svg>
      </button>
      <nav
        id="add-menu"
        className="dropdown"
        popover=""
        style={{ positionAnchor: "--add-menu-btn" } as React.CSSProperties}
        role="menu"
        aria-labelledby="addButton"
      >
        <ul className="menu" role="menu" aria-labelledby="addButton">
          <li role="menuitem" style={{ display: "grid" }}>
            <button
              className="button"
              onClick={() => {
                const addMenu = document.getElementById("add-menu");
                if (addMenu) {
                    addMenu.hidePopover();
                }
                openDrawer("New application", <JobFormAdd />);
              }}
            >
              Application
            </button>
          </li>
          <li role="menuitem" style={{ display: "grid" }}>
             <button
              className="button"
              onClick={() => {
                const addMenu = document.getElementById("add-menu");
                if (addMenu) {
                    addMenu.hidePopover();
                }
                openDrawer("New connection", <ConnectionFormAdd />);
              }}
            >
              Connection
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
