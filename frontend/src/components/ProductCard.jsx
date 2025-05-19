import React from "react";
import { Link } from "react-router-dom";

import { EditIcon, Trash2Icon } from "lucide-react";

import { useProductStore } from "../store/useProductStore";

function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();

  return (
    <div className="card bg-base-100 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
      {/* PRODUCT IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-primary text-2xl font-bold">
          ${Number(product.price).toFixed(2)}
        </p>

        {/* CARD ACTIONS */}
        <div className="card-actions mt-4 justify-end">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-sm btn-info btn-outline"
          >
            <EditIcon className="size-4" />
          </Link>

          <button
            onClick={() => deleteProduct(product.id)}
            className="btn btn-sm btn-error btn-outline"
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
