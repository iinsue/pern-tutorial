import { Link, useResolvedPath } from "react-router-dom";

import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";

import ThemeSelector from "./ThemeSelector";
import { useProductStore } from "../store/useProductStore";

function Navbar() {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";

  const { products } = useProductStore();

  return (
    <div className="bg-base-100/80 border-base-center/10 sticky top-0 z-50 border-b backdrop-blur-lg">
      <div className="mx-auto max-w-7xl">
        <div className="navbar min-h-[4rem] justify-between px-4">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="transition-opacity hover:opacity-80">
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="text-primary size-9" />
                <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text font-mono text-2xl font-semibold tracking-widest text-transparent">
                  POSTGRESTORE
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <ThemeSelector />

            {isHomePage && (
              <div className="indicator">
                <div className="hover:bg-base-200 rounded-full p-2 transition-colors">
                  <ShoppingBagIcon className="size-5" />
                  <span className="badge badge-sm badge-primary indicator-item">
                    {products.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
