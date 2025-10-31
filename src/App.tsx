import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Classes from "./pages/Classes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="classes" element={<Classes />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
