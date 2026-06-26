import { Routes, Route } from "react-router-dom";
import Messages from "../pages/shared/Messages";

import NotificationsPage from "../pages/shared/NotificationsPage";

/* PUBLIC */
import LandingPage from "../pages/landing/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";

/* LAYOUTS */
import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";
import ManagerLayout from "../layouts/ManagerLayout";
import DriverLayout from "../layouts/DriverLayout";

/* CUSTOMER PAGES */
import CustomerDashboard from "../pages/customer/Dashboard";
import Orders from "../pages/customer/Orders";
import OrderForm from "../pages/customer/OrderForm";
import Addresses from "../pages/customer/Addresses";
import RatingForm from "../pages/customer/RatingForm";
import CustomerAddressMap from "../pages/customer/CustomerAddressMap";
import CustomerPayment from "../pages/customer/CustomerPayment"; /* ADMIN PAGES */
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Drivers from "../pages/admin/Drivers";
import AdminOrders from "../pages/admin/Orders";
import Ratings from "../pages/admin/Ratings";

/* DRIVER PAGES */
import DriverDashboard from "../pages/driver/Dashboard";
import DriverDeliveries from "../pages/driver/Deliveries";
import DriverProfile from "../pages/driver/Profile";

/* MANAGER PAGES */
import ManagerDashboard from "../pages/manager/Dashboard";
import AssignOrders from "../pages/manager/AssignOrders";
import ManagerDeliveries from "../pages/manager/Deliveries";

/* FINANCE */
import FinanceLayout from "../layouts/FinanceLayout";
import FinanceDashboard from "../pages/finance/Dashboard";
import Payments from "../pages/finance/Payments";
import Transactions from "../pages/finance/Transactions";
import Invoices from "../pages/finance/Invoices";

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";


export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC ===== */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="*" element={<NotFound />} />

      {/* ===== CUSTOMER ===== */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout />
          </ProtectedRoute>
        }>
        <Route index element={<CustomerDashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="address-map" element={<CustomerAddressMap />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="create-order" element={<OrderForm />} />
        <Route
          path="/customer/payment/:orderId"
          element={<CustomerPayment />}
        />{" "}
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>

      {/* ===== ADMIN ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="ratings" element={<Ratings />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* ===== MANAGER ===== */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <ManagerLayout />
          </ProtectedRoute>
        }>
        <Route index element={<ManagerDashboard />} />
        <Route path="assign-orders" element={<AssignOrders />} />
        <Route path="deliveries" element={<ManagerDeliveries />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* ===== DRIVER ===== */}
      <Route
        path="/driver"
        element={
          <ProtectedRoute allowedRoles={["driver"]}>
            <DriverLayout />
          </ProtectedRoute>
        }>
        <Route index element={<DriverDashboard />} />
        <Route path="deliveries" element={<DriverDeliveries />} />
        <Route path="profile" element={<DriverProfile />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>

      {/* ===== FINANCE ===== */}

      <Route
        path="/finance"
        element={
          <ProtectedRoute allowedRoles={["finance"]}>
            <FinanceLayout />
          </ProtectedRoute>
        }>
        <Route index element={<FinanceDashboard />} />
        <Route path="payments" element={<Payments />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="messages" element={<Messages />} />
      </Route>
    </Routes>
  );
}
