import { createBrowserRouter } from "react-router-dom";
import Home from "pages/Home";
import Error from "pages/Error";
import Route from "types/routes.types";
import RoutesEnum from "enums/routes.enum";
import Root from "./Root";

import CadastroGeral from "pages/CadastroGeral";
import Endereco from "pages/Endereco";

export const routes: Route[] = [
  {
    index: true,
    element: <Home />,
    name: "Inicial",
  },
  {
    path: RoutesEnum.CADASTROGERAL,
    element: <CadastroGeral />,
    name: "Cadastro Geral",
  },
  {
    path: RoutesEnum.ENDERECO,
    element: <Endereco />,
    name: "Endereço",
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
