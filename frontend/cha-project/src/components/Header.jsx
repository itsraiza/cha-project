import amor from "../assets/amor.png";
import Nav from "./Nav";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import PresenceButton from "./PresenceButton";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative">
      <div className="flex justify-evenly items-center p-4 shadow-2xs">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl text-black font-montserrat">ane & iza</h1>
          <img className="w-9" src={amor} alt="coração" />
        </div>

        {/* Menu desktop */}
        <div className="hidden lg:block">
          <Nav />
        </div>

        {/* Botão desktop */}
        <div className="hidden lg:block">
          <PresenceButton/>
        </div>

        {/* Botão mobile */}
        <button
          className="lg:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <MenuIcon className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full right-0 bg-gray-100/95 shadow-md w-70 min-h-screen p-6 z-50">
          <nav>
            <ul className="flex flex-col justify-center items-center gap-6 text-sm text-black font-medium">
              <li className="font-semibold">
                <NavLink
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-gray-700 ${
                      isActive ? "underline text-black" : ""
                    }`
                  }
                >
                  Início
                </NavLink>
              </li>

              <li className="font-semibold">
                <NavLink
                  to="/sobrenos"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-gray-700 ${
                      isActive ? "underline text-black" : ""
                    }`
                  }
                >
                  Sobre Nós
                </NavLink>
              </li>

              <li className="font-semibold">
                <NavLink
                  to="/presentes"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-gray-700 ${
                      isActive ? "underline text-black" : ""
                    }`
                  }
                >
                  Lista de Presentes
                </NavLink>
              </li>

              <li className="font-semibold">
                <NavLink
                  to="/recados"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `hover:text-gray-700 ${
                      isActive ? "underline text-black" : ""
                    }`
                  }
                >
                  Recados
                </NavLink>
              </li>

              <li>
                <PresenceButton/>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
