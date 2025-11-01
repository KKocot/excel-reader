import { Button } from "@/components/ui/button";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex bg-slate-800 w-full p-2 justify-between">
        <ul className="flex">
          <li>
            <Button variant="link" className="text-white">
              <Link to="/">Strona główna</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-white">
              <Link to="/classes">Spotkania</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-white">
              <Link to="/full-document">Caly dokument</Link>
            </Button>
          </li>
        </ul>
        <ul className="flex">
          <li>
            <a
              href="https://www.epochconverter.com/pl/tygodni/2025"
              target="_blank"
            >
              <Button variant="link" className="text-white">
                Kalendarz tygodni
              </Button>
            </a>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
