import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface DrawerContextType {
  isOpen: boolean;
  title: ReactNode | null;
  content: ReactNode | null;
  openDrawer: (title: ReactNode, content: ReactNode) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<ReactNode | null>(null);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openDrawer = useCallback((newTitle: ReactNode, newContent: ReactNode) => {
    setTitle(newTitle);
    setContent(newContent);
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setTitle(null);
      setContent(null);
    }, 300); // clear content after animation
  }, []);

  return (
    <DrawerContext.Provider value={{ isOpen, title, content, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
}
