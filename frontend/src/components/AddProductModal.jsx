import React from "react";
import { useProductStore } from "../store/useProductStore";
import {
  DollarSignIcon,
  ImageIcon,
  Package2Icon,
  PlusCircleIcon,
} from "lucide-react";

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* CLOSE BUTTON */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle absolute top-2 right-2">
            X
          </button>
        </form>

        {/* MODAL HEADER */}
        <h3 className="mb-8 text-xl font-bold">Add New Product</h3>

        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* PRODUCT NAME INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Product Name
                </span>
              </label>

              <div className="relative">
                <div className="text-base-content/50 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Package2Icon className="z-[2] size-5" />
                </div>

                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered focus:input-primary w-full py-3 pl-10 transition-colors duration-200"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                />
              </div>
            </div>

            {/* PRODUCT PRICE INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>

              <div className="relative">
                <div className="text-base-content/50 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DollarSignIcon className="z-[2] size-5" />
                </div>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered focus:input-primary w-full py-3 pl-10 transition-colors duration-200"
                  value={formData.price}
                  onChange={(event) =>
                    setFormData({ ...formData, price: event.target.value })
                  }
                />
              </div>
            </div>

            {/* PRODUCT IMAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Image URL
                </span>
              </label>

              <div className="relative">
                <div className="text-base-content/50 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <ImageIcon className="z-[2] size-5" />
                </div>

                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered focus:input-primary w-full py-3 pl-10 transition-colors duration-200"
                  value={formData.image}
                  onChange={(event) =>
                    setFormData({ ...formData, image: event.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="modal-action">
            {/* <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form> */}

            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.name || !formData.price || !formData.image || loading
              }
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="mr-2 size-5" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* BACKDROP */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddProductModal;
