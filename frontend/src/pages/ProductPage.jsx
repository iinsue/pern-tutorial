import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

import { useProductStore } from "../store/useProductStore";

function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="mr-2 size-4" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* PRODUCT IMAGE */}
        <div className="bg-base-100 overflow-hidden rounded-lg shadow-lg">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="size-full object-cover"
          />
        </div>

        {/* PRODUCT FORM */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-6 text-2xl">Edit Product</h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateProduct(id);
              }}
              className="space-y-6"
            >
              {/* PRODUCT NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Product Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                />
              </div>

              {/* PRODUCT PRICE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Price
                  </span>
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(event) =>
                    setFormData({ ...formData, price: event.target.value })
                  }
                />
              </div>

              {/* PRODUCT IMAGE URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">
                    Image URL
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(event) =>
                    setFormData({ ...formData, image: event.target.value })
                  }
                />
              </div>

              {/* FORM ACTIONS */}
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={handleDelete}
                >
                  <Trash2Icon className="mr-2 size-4" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.image
                  }
                  className="btn btn-primary"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="mr-2 size-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
