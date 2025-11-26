import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Toaster, toast } from "sonner";
import HomePage from "./pages/HomePage";
import MasterLayout from "./components/layout/MasterLayout";
import NotFound from "./pages/NotFound";
import AuthLayout from "./components/layout/AuthLayout";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Profile from "./components/profile/Profile";
import OrderDetail from "./components/order/OrderDetail";
import ProductDetail from "./components/products/ProductDetail";
import SearchResults from "./pages/SearchResults";
import MyVouchers from "./pages/MyVouchers";
import Favorites from "./pages/Favorites";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/order_detail",
          element: <OrderDetail />,
        },
        {
          path: "/room_detail",
          element: <ProductDetail />,
        },
        {
          path: "/search",
          element: <SearchResults />,
        },
        {
          path: "/my-vouchers",
          element: <MyVouchers />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/payment",
          element: <PaymentPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "register",
          element: <RegisterForm />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Blue Corner Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle 600px at 0% 200px, #bfdbfe, transparent),
        radial-gradient(circle 600px at 100% 200px, #bfdbfe, transparent)
      `,
        }}
      />
      {/* Your Content Here */}
      <div className="relative z-10">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
