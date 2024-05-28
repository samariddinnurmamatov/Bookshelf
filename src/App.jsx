import { Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import routes from './configs/routes.config';
import AuthGuard from './components/route/AuthGuard';
import renderRoutes from './components/route/RenderRoutes/RenderRoutes';

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div className='flex items-center justify-center h-screen'><CircularProgress size={24} /></div>}>
      <AuthGuard>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </AuthGuard>
    </Suspense>
  </BrowserRouter>
);

export default App;
