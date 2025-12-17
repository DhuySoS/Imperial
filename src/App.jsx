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
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import Profile from "./components/profile/Profile";
import OrderDetail from "./components/order/OrderDetail";
import ProductDetail from "./components/products/ProductDetail";
import SearchResults from "./pages/SearchResults";
import MyVouchers from "./pages/MyVouchers";
import Favorites from "./pages/Favorites";
import PaymentPage from "./pages/PaymentPage";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminEmployee from "./components/admin/AdminEmployee";
import AdminCoupon from "./components/admin/AdminCoupon";
import AdminRooms from "./components/admin/AdminRooms";
import AdminCustomer from "./components/admin/AdminCustomer";
import AdminStore from "./components/admin/AdminStore";
import MyOrder from "./components/order/MyOrder";
import AdminWelcome from "./components/admin/AdminWelcome";
import AdminLogin from "./components/admin/AdminLogin";
import AdminBooking from "./components/admin/AdminBooking";
import PaymentSuccess from "./components/payment/PaymentSuccess";
import StaffSearchBooking from "./components/admin/StaffSearchBooking";

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
          path: "profile",
          element: <Profile />,
        },
        {
          path: "order_detail",
          element: <OrderDetail />,
        },
        {
          path: "my_order",
          element: <MyOrder />,
        },
        {
          path: "room_detail/:id",
          element: <ProductDetail />,
        },
        {
          path: "search",
          element: <SearchResults />,
        },
        {
          path: "my-vouchers",
          element: <MyVouchers />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
        {
          path: "payment",
          element: <PaymentPage />,
        },
        {
          path: "vnpay-return",
          element: <PaymentSuccess />,
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
        {
          path: "forgot-password",
          element: <ForgotPasswordForm />,
        },
      ],
    },
    {
      path: "/admin",
      children: [
        {
          index: true,
          element: <AdminWelcome />,
        },
        {
          path: "login",
          element: <AdminLogin />,
        },
        {
          path: "staff/search-booking",
          element: <StaffSearchBooking />,
        },
        {
          element: <AdminLayout />,
          children: [
            {
              path: "dashboard",
              element: <AdminDashboard />,
            },
            {
              path: "employee",
              element: <AdminEmployee />,
            },
            {
              path: "coupons",
              element: <AdminCoupon />,
            },
            {
              path: "rooms",
              element: <AdminRooms />,
            },
            {
              path: "customers",
              element: <AdminCustomer />,
            },
            {
              path: "bookings",
              element: <AdminBooking />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className="min-h-screen w-full bg-white relative ">
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
