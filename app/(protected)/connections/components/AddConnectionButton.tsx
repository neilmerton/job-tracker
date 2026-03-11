"use client";

import { useDrawer } from "@/contexts/DrawerContext";
import ConnectionFormAdd from "./ConnectionFormAdd";

export default function AddConnectionButton() {
  const { openDrawer } = useDrawer();

  return (
    <button
      className="button"
      onClick={() => openDrawer("New connection", <ConnectionFormAdd />)}
    >
      Add connection
    </button>
  );
}
