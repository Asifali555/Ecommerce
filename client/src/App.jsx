import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout.jsx";
import LogIn from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import AdminLayout from "./components/admin-view/layout.jsx";
import AdminDashboard from "./pages/admin-view/dashboard.jsx";
import AdminFeatures from "./pages/admin-view/features.jsx";
import AdminOrders from "./pages/admin-view/orders.jsx";
import AdminProducts from "./pages/admin-view/products.jsx";
import ShoppingLayout from "./components/shopping-view/layout.jsx";
import NotFound from "./pages/not-found/index.jsx";
import ShoppingHome from "./pages/shopping-view/home.jsx";
import ShoppingListing from "./pages/shopping-view/listing.jsx";
import ShoppingAccount from "./pages/shopping-view/account.jsx";
import ShoppingChekcout from "./pages/shopping-view/checkout.jsx";
import CheckAuth from "./components/common/check-auth.jsx";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/index.js";
import PaypalReturnPage from "./pages/shopping-view/paypal-return.jsx";
import PaymentSuccessPage from "./pages/shopping-view/payment-success.jsx";
import SearchProducts from "./pages/shopping-view/search.jsx";


function App() {
  const {user, isAuthenticated, isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  if(isLoading) return <div> Loading....</div>
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
     
      <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
          }>
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingChekcout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />}/>
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
