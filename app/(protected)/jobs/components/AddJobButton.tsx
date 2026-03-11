"use client";

import { useDrawer } from "@/contexts/DrawerContext";
import JobFormAdd from "./JobFormAdd";

export default function AddJobButton() {
  const { openDrawer } = useDrawer();

  return (
    <button
      className="button"
      onClick={() => openDrawer("New application", <JobFormAdd />)}
    >
      Add application
    </button>
  );
}
