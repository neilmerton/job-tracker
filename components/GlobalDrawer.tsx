"use client";

import { useEffect, useRef } from "react";
import { useDrawer } from "@/contexts/DrawerContext";

export default function GlobalDrawer() {
  const { isOpen, title, content, closeDrawer } = useDrawer();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (!dialogRef.current?.open) {
          dialogRef.current?.showModal();
      }
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleClose = () => {
      closeDrawer();
  }

  return (
    <dialog ref={dialogRef} className="drawer" onClose={handleClose}>
      <header className="drawer__header">
        <h2 className="drawer__title">{title}</h2>
        <button className="button button--secondary" onClick={handleClose}>
          Close
        </button>
      </header>
      <section className="drawer__content">
        {content}
      </section>
    </dialog>
  );
}
