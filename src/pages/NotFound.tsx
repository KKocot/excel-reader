import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Nie znaleziono strony</h2>
    <p className="mb-6">Przepraszamy, taka strona nie istnieje.</p>
    <Link
      to="/"
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Wróć do strony głównej
    </Link>
  </div>
);

export default NotFound;
