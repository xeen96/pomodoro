import { useState } from "react";
import Settings from "./settings";
import { MenuBtn, CloseBtn } from "./buttons";
import clsx from "clsx";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="bg-slate-800 h-16 p-4 shadow-md flex flex-row-reverse justify-between">
        <h1 className="text-lg font-bold text-cyan-500">Pomodoro</h1>
        <button
          onClick={toggleMenu}
          title="Settings"
          aria-label="Settings"
          className="flex rounded-full hover:bg-gray-500 aspect-square items-center justify-center"
        >
          <MenuBtn size="1.5rem" />
        </button>
      </header>
      <div
        className={clsx("fixed top-0 right-0 w-1/2 lg:w-1/3 xl:w-1/4 h-full bg-slate-900 text-cyan-500 shadow-lg z-10 p-5 transform transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isMenuOpen,
            "translate-x-full": !isMenuOpen,
          })}
      >
        <button
          className="flex rounded-full hover:bg-gray-500 aspect-square items-center justify-center"
          onClick={toggleMenu}
          title="Close Settings"
          aria-label="Close Settings"
        >
          <CloseBtn size="1.5rem" />
        </button>
        <Settings />
      </div>
      <div className={clsx({ "brightness-75": isMenuOpen })}>{children}</div>
    </>
  );
}
