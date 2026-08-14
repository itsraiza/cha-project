import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="max-lg:hidden">
        <ul className="flex gap-10 ">
          <li className="font-semibold">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `hover:text-gray-700 ${isActive ? "underline text-black" : ""}`
              }
            >
              Início
            </NavLink>
          </li>

          <li className="font-semibold">
            <NavLink
              to={"/sobrenos"}
              className={({ isActive }) =>
                `hover:text-gray-700 ${isActive ? "underline text-black" : ""}`
              }
            >
              Sobre Nós
            </NavLink>
          </li>
          <li className="font-semibold">
            <NavLink
              to={"/presentes"}
              className={({ isActive }) =>
                `hover:text-gray-700 ${isActive ? "underline text-black" : ""}`
              }
            >
              Lista de Presentes
            </NavLink>
          </li>
          <li className="font-semibold">
            <NavLink
              to={"/recados"}
              className={({ isActive }) =>
                `hover:text-gray-700 ${isActive ? "underline text-black" : ""}`
              }
            >
              Recados
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
