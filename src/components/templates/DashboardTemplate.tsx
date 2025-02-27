import ProductGrid, { Product } from "../sections/ProductGrid";

interface DashboardTemplateProps {
  userName: string;
  products: Product[];
  totalProducts: number;
}

export default function DashboardTemplate({
  products,
}: DashboardTemplateProps) {
  return (
    <div className="space-y-6">
      {/* Products Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Available Products
          </h3>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
