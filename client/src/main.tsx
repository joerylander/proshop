import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import App from './App.tsx';
import HomeScreens from './screens/HomeScreens.tsx';
import ProductScreen from './screens/ProductScreen.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomeScreens />} />
      <Route path="/product/:id" element={<ProductScreen />} />
    </Route>,
  ),
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
