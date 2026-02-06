import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Classes from "./pages/Classes";
import WeekCalendar from "./pages/WeekCalendar";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/error-boundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route
        path="classes"
        element={<Classes />}
        errorElement={
          <ErrorBoundary>
            <div className="flex w-full items-center justify-center mt-12 text-xl flex-col">
              <h3 className="mr-2 font-bold">Błąd ładowania strony:</h3>
              <span>
                Wystąpił błąd podczas przetwarzania pliku CSV, ten plik jest
                nieprawidłowy.
              </span>
              <Link to="/classes" className="mt-4 text-blue-600 underline dark:text-blue-400">
                Powrót do strony
              </Link>
            </div>
          </ErrorBoundary>
        }
      />
      <Route path="classes/calendar" element={<WeekCalendar />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
