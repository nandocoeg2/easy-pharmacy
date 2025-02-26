import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/CartSlice";
import Layout from "../components/Layout";
import { DrugDetailTemplate } from "../components/templates";
import { useNavigate, useParams } from "react-router";

interface Obat {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rate: number;
  des: string;
}

export default function DrugDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drug, setDrug] = React.useState<Obat | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchDrug = async () => {
      try {
        const response = await fetch(
          "https://requestly.tech/api/mockv2/obat.json?username=user1740545433411&"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const foundDrug = data.find((item: Obat) => item.id === Number(id));
        if (!foundDrug) {
          throw new Error("Drug not found");
        }
        setDrug(foundDrug);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load drug details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrug();
  }, [id]);

  const handleAddToCart = () => {
    if (drug) {
      dispatch(
        addToCart({
          id: drug.id,
          name: drug.name,
          price: drug.price,
          image: drug.image,
        })
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !drug) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">{error || "Drug not found"}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <DrugDetailTemplate
        drug={drug}
        onBack={() => navigate("/dashboard")}
        onAddToCart={handleAddToCart}
      />
    </Layout>
  );
}
