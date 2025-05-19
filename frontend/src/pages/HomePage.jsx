import { useEffect } from "react";

import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";

import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

import { useProductStore } from "../store/useProductStore";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_product_modal").showModal()
          }
        >
          <PlusCircleIcon className="mr-2 size-5" />
          Add Product
        </button>

        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      {/* ADD PRODUCT MODAL */}
      <AddProductModal />

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {products.length === 0 && !loading && (
        <div className="flex h-96 flex-col items-center justify-center space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>

          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-semibold">No products found</h3>
            <p className="max-w-sm text-gray-500">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}

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
