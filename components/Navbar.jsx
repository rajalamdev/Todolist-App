import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { UseAppContext } from "../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Theme = dynamic(() => import("./Theme"), {ssr: false})

export const Navbar = () => {
  const context = UseAppContext();
  const [clock, setClock] = useState(null);
    
  useEffect(() => {
    setInterval(() => {
      const now = new Date().toLocaleTimeString().split(":").join(" : ");
      setClock(now);
    });
  }, [clock]);


  return (
    <nav className="fixed w-full py-3 px-8 lg:px-12 flex justify-between items-center border-b border-border-primary shadow-sm bg-bg-nav backdrop-blur-sm z-[999]">
      <div className="flex-1">
        <div className="w-max rounded-full relative">
          <FontAwesomeIcon
            className="cursor-pointer p-2 rounded-full bg-button-primary relative z-50"
            icon={faMoon}
            size="lg"
            ref={context.themeBtn}
            onClick={() => {
                context.themePopup();
            }}
          />
          <Theme />
        </div>
      </div>
      <div className="flex-2 bg-button-primary py-2 px-4 rounded-md">
        {clock}
      </div>
      <div className="flex flex-1 justify-end items-center text-lg font-bold gap-1">
        <h1 className="text-base hidden sm:block">TodoList App</h1>
        <FontAwesomeIcon icon={faCalendarCheck} size="lg" />
      </div>
    </nav>
  );
};
