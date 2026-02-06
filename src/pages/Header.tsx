import { Button } from "@/components/ui/button";
import { Outlet, Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/use_dark_mode";

const Header = () => {
  const { is_dark, toggle } = useDarkMode();

  return (
    <>
      <header className="flex bg-nav text-nav-foreground w-full p-2 justify-between items-center border-b border-border">
        <ul className="flex items-center">
          <li>
            <Button variant="link" className="text-nav-foreground hover:text-nav-foreground/90">
              <Link to="/">Strona główna</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-nav-foreground hover:text-nav-foreground/90">
              <Link to="/classes">Spotkania</Link>
            </Button>
          </li>
        </ul>
        <ul className="flex items-center gap-2">
          <li>
            <Button
              onClick={toggle}
              variant="ghost"
              size="icon"
              className="text-nav-foreground hover:bg-nav-foreground/10 hover:text-nav-foreground"
              aria-label={
                is_dark ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"
              }
            >
              {is_dark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </li>
        </ul>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
