import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { Provider, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { RootState, store } from "./stores/Store";
import { ReactNode, Suspense } from "react";
import Navbar from "./components/organisms/Navbar";
import Cart from "./pages/Cart";
import DrugDetail from "./pages/DrugDetail";
import LoadingSpinner from "./components/atoms/LoadingSpinner";
import CheckoutSuccess from "./pages/CheckoutSuccess";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Cart />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/drug/:id"
                element={
                  <ProtectedRoute>
                    <DrugDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout/success"
                element={
                  <ProtectedRoute>
                    <CheckoutSuccess />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </>
  );
}

export default App;
