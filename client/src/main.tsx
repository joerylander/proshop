import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.ts';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import App from './App.tsx';
import HomeScreens from './screens/HomeScreens.tsx';
import ProductScreen from './screens/ProductScreen.tsx';
import CartScreen from './screens/CartScreen.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomeScreens />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
    </Route>,
  ),
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
