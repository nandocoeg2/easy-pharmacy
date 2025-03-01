import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/Store";
import { ProductCard } from "../blocks";
import { SortOption } from "../../stores/SearchSlice";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rate: number;
  des: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = React.memo(function ProductGrid({
  products,
}: ProductGridProps) {
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const sortOption = useSelector((state: RootState) => state.search.sortBy);

  const filteredAndSortedProducts = React.useMemo(() => {
    // First filter by search query
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.des.toLowerCase().includes(query)
    );

    // Then sort based on the selected option
    return sortProducts(filtered, sortOption);
  }, [products, searchQuery, sortOption]);

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No products found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAndSortedProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
});

// Helper function to sort products
function sortProducts(products: Product[], sortOption: SortOption): Product[] {
  const productsCopy = [...products];

  switch (sortOption) {
    case "name-asc":
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return productsCopy.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
        return priceA - priceB;
      });
    case "price-desc":
      return productsCopy.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
        return priceB - priceA;
      });
    default:
      return productsCopy;
  }
}

export default ProductGrid;
