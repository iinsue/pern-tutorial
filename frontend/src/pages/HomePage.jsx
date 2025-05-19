import { useEffect } from "react";

import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";

import ProductCard from "../components/ProductCard";

import { useProductStore } from "../store/useProductStore";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <button className="btn btn-primary">
          <PlusCircleIcon className="mr-2 size-5" />
          Add Product
        </button>

        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default HomePage;
