import { createBrowserRouter } from "react-router-dom";
import Home from "pages/Home";
import Error from "pages/Error";
import Route from "types/routes.types";
import RoutesEnum from "enums/routes.enum";
import Root from "./Root";

import Cadastro from "pages/Cadastro";

export const routes: Route[] = [
  {
    index: true,
    element: <Home />,
    name: "Inicial",
  },
  {
    path: RoutesEnum.CADASTRO,
    element: <Cadastro />,
    name: "Cadastro",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: routes,
  },
]);
