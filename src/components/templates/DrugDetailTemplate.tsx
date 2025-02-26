import Button from "../atoms/Button";
import {
  Package,
  Award,
  Clock,
  ShoppingCart,
  ArrowLeft,
  Banknote,
} from "lucide-react";
import Badge from "../atoms/Badge";

interface DrugDetailTemplateProps {
  drug: {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    rate: number;
    des: string;
  };
  onBack: () => void;
  onAddToCart: () => void;
}

export default function DrugDetailTemplate({
  drug,
  onBack,
  onAddToCart,
}: DrugDetailTemplateProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80"
              alt={drug.name}
              className="h-full w-full object-cover md:h-[500px]"
            />
          </div>

          <div className="p-8 md:w-1/2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {drug.name}
                </h1>
              </div>
              <div className="flex items-center text-gray-700">
                <Banknote className="h-6 w-6 mr-1 text-gray-400" />
                <span className="text-2xl font-bold text-green-600">
                  {drug.price}
                </span>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">In Stock</Badge>

            <div className="border-t border-gray-200 my-6"></div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <p className="text-gray-600">{drug.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                  <Package className="h-6 w-6 text-indigo-600" />
                  <span className="text-sm text-gray-600">
                    Stock {drug.rate}
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                  <Award className="h-6 w-6 text-indigo-600" />
                  <span className="text-sm text-gray-600">
                    Certified Product
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                  <Clock className="h-6 w-6 text-indigo-600" />
                  <span className="text-sm text-gray-600">Fast Delivery</span>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Button
                  variant="primary"
                  className="flex-1 flex items-center justify-center"
                  onClick={onAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
