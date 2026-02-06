import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <h1 className="text-5xl font-bold text-destructive mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2 text-foreground">
      Nie znaleziono strony
    </h2>
    <p className="mb-6 text-muted-foreground">
      Przepraszamy, taka strona nie istnieje.
    </p>
    <Button asChild>
      <Link to="/">Wróć do strony głównej</Link>
    </Button>
  </div>
);

export default NotFound;
