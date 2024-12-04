import { Button } from "@/components/ui/button";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <ul className="flex bg-slate-800">
        <li>
          <Button variant="link" className="text-white">
            <Link to="/recrutation">Rekrutacja</Link>
          </Button>
        </li>
        <li>
          <Button variant="link" className="text-white">
            <Link to="/classes">Spotkania</Link>
          </Button>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Header;
