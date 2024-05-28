import React from "react";

const routesConfig = [
  {
    key: "signUp",
    path: '/',
    element: React.lazy(() => import("../../views/auth/SignUp")),
  },
  {
    key: "signIn",
    path: '/sign-in', // Add a slash at the beginning
    element: React.lazy(() => import("../../views/auth/SignIn")),
  },
  {
    key: "main",
    path: '/main',
    element: React.lazy(() => import("../../components/layouts")),
    children: [
      { key: "home", path: '/', element: React.lazy(() => import("../../views/Home")) },
    //   { path: '/expr', element: lazy(() => import("../../views/Expr")) },
    //   { path: '/kitob', element: lazy(() => import("../../views/kitob")) },
    ],
  },
  {
    key: "notFound",
    path: '/*', // Match any path that hasn't been matched yet
    element: React.lazy(() => import("../../views/NotFound/NotFound")),
  },
];

export default routesConfig;
