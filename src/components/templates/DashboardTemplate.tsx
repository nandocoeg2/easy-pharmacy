import { Suspense } from "react";
import { SortDropdown } from "../blocks";
import { ProductGrid } from "../sections";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rate: number;
  des: string;
}

interface DashboardTemplateProps {
  userName: string;
  products: ProductCardProps[];
}

export default function DashboardTemplate({
  userName,
  products,
}: DashboardTemplateProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {userName}
        </h2>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Available Products
          </h3>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            <Suspense
              fallback={
                <div className="w-40 h-10 bg-gray-100 animate-pulse rounded-md"></div>
              }
            >
              <div className="w-full sm:w-48">
                <SortDropdown />
              </div>
            </Suspense>
          </div>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
