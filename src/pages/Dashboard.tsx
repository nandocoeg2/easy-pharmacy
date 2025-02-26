import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stores/Store";
import Layout from "../components/Layout";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import { Loader } from "lucide-react";

interface Obat {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rate: number;
  des: string;
}

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [obatList, setObatList] = useState<Obat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const response = await fetch(
          "https://requestly.tech/api/mockv2/obat.json?username=user1740545433411&"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setObatList(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchObat();
  }, []);

  const calculateAverageRating = () => {
    if (obatList.length === 0) return 0;
    const total = obatList.reduce((acc, obat) => acc + (obat.rate || 0), 0);
    return Number((total / obatList.length).toFixed(1));
  };

  const calculateTotalValue = () => {
    if (obatList.length === 0) return "0.00";
    const total = obatList.reduce((acc, obat) => {
      const price = parseFloat(obat.price.replace(/[^0-9.-]+/g, ""));
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
    return total.toFixed(2);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <Loader className="h-8 w-8 text-indigo-600 animate-spin" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <DashboardTemplate
        userName={user?.email || ""}
        products={obatList}
        totalProducts={obatList.length}
        averageRating={calculateAverageRating()}
        totalValue={calculateTotalValue()}
      />
    </Layout>
  );
}
