import { Route } from 'react-router-dom';

const renderRoutes = (routes, parentPath = '') => (
  <>
    {routes.map(route => (
      <Route
        key={parentPath + route.path} // Har bir rota uchun unikal key yaratiladi
        path={`${parentPath}${route.path}`}
        element={<route.element />}
      >
        {route.children && route.children.map(childRoute => (
          <Route
            key={parentPath + route.path + childRoute.path}
            path={`${parentPath}${route.path}${childRoute.path}`}
            element={<childRoute.element />}
          />
        ))}
      </Route>
    ))}
  </>
);

export default renderRoutes;
