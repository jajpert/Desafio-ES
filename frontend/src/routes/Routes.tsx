import { createBrowserRouter } from "react-router-dom";
import Home from "pages/Home";
import Error from "pages/Error";
import Route from "types/routes.types";
import RoutesEnum from "enums/routes.enum";
import Root from "./Root";

import Cadastro from "pages/Cadastro";
import Editar from "pages/Editar";
import Visualizar from "pages/Visualizar";

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
  {
    path: RoutesEnum.EDITAR,
    element: <Editar />,
    name: "Editar",
  },
  {
    path: RoutesEnum.VISUALIZAR,
    element: <Visualizar />,
    name: "Visualizar",
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
