"use client";

import { useEffect, useRef, useState } from "react";

import { MenuItem } from "./menu-item";
import { HeaderProps } from "./header";

export function MobileMenu(props: {
  navigation: HeaderProps["headerNavigation"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function onNavigationClick() {
    setIsOpen(false);
  }

  function onWindowResize() {
    const { matches } = window.matchMedia("(max-width: 768px)");

    if (matches) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-40 grid size-10 place-items-center rounded-lg text-foreground hover:bg-background"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          {!isOpen && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          )}
          {isOpen && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          )}
        </svg>
      </button>
      <div
        ref={menuRef}
        data-state={isOpen ? "open" : "closed"}
        className="group absolute -top-[100vh] left-0 z-[90] h-[100vh] w-screen p-2.5 opacity-0 transition-opacity data-[state='open']:top-0 data-[state='open']:opacity-100"
      >
        <div className="h-full w-full rounded-lg bg-white p-4">
          <div className="flex items-center justify-between">
            <div></div>
            <button onClick={() => setIsOpen(false)}>Lukk</button>
          </div>
          <ul className="grid gap-8 opacity-0 transition-opacity delay-200 group-data-[state='open']:opacity-100">
            {props.navigation?.map((menuItem) => (
              <li onClick={onNavigationClick} key={menuItem._key}>
                <MenuItem href={`/${menuItem.href}`}>{menuItem.label}</MenuItem>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
