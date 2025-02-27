import React from "react";
import { useDispatch } from "react-redux";
import { CheckCircle, ArrowLeft, ShoppingBag } from "lucide-react";
import Button from "../components/uis/Button";
import { useNavigate } from "react-router";
import { clearCart } from "../stores/CartSlice";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderNumber = React.useMemo(
    () => Math.floor(100000 + Math.random() * 900000),
    []
  );

  // Clear cart on component mount
  React.useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Order Number</p>
          <p className="text-lg font-semibold text-gray-900">#{orderNumber}</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your email address. You can
            check the status of your order in your account dashboard.
          </p>

          <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
            <Button
              variant="primary"
              className="w-full flex items-center justify-center"
              onClick={() => navigate("/dashboard")}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
