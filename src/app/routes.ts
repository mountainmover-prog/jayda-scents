import { createBrowserRouter } from 'react-router';
import { RootLayout } from './pages/RootLayout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { WomenPage } from './pages/WomenPage';
import { MenPage } from './pages/MenPage';
import { UnisexPage } from './pages/UnisexPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'shop', Component: ShopPage },
      { path: 'women', Component: WomenPage },
      { path: 'men', Component: MenPage },
      { path: 'unisex', Component: UnisexPage },
      { path: 'product/:id', Component: ProductDetailPage },
      { path: 'cart', Component: CartPage },
    ],
  },
]);