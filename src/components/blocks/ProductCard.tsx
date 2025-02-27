import React from "react";
import { Banknote, ShoppingCart } from "lucide-react";
import Button from "../uis/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/CartSlice";
import { useNavigate } from "react-router";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rate: number;
  des: string;
}

function ProductCard({
  id,
  name,
  price,
  description,
  image,
  des,
}: ProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <img
        src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80"
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-3">{des}</p>
          <div className="flex items-center text-gray-700">
            <Banknote className="h-5 w-5 mr-1 text-gray-400" />
            <span className="text-lg font-semibold text-green-600">
              {price}
            </span>
          </div>
        </div>

        <div className="pt-4 flex space-x-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => navigate(`/drug/${id}`)}
          >
            View Details
          </Button>
          <Button variant="primary" onClick={handleAddToCart}>
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
