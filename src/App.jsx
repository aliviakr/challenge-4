import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

const App = () => {
  const routes = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/details/:id",
      element: <DetailsPage />,
    },
  ];

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  );
};

export default App;
