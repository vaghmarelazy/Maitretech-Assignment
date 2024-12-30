import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Menu from "./components/Menu";
import ThankYou from "./components/ThankYou";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/homepage",
      element: <HomePage />,
    },
    {
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/thankyou",
      element: <ThankYou />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
