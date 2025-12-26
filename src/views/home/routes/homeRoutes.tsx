// ** Components Imports
import Home from "../pages/Home";
import LayoutHome from "../utils/components/layout";

// ** Another Imports
import { RouteObject } from "react-router-dom";
import { HomeRoutePaths } from "../utils/enum/home";

const homeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutHome />,
    children: [
      {
        path: HomeRoutePaths.HOME,
        element: <Home />,
      },
    ],
  },
];

export default homeRoutes;
