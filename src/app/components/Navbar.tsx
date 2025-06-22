'use client';

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setAuthLoading } from "@/store/slices/authSlice";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  clearCart,
  setCart,
  setCartLoading,
} from "@/store/slices/cartSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state: RootState) => state.auth);
  const { items: cartItems, loading: cartLoading } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setAuthLoading(true));
      dispatch(setCartLoading(true));

      try {
        const res = await fetch("/api/users/verify", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.user) {
          dispatch(setUser(data.user));

          const cartRes = await fetch("/api/cart/get", {
            credentials: "include",
          });

          const cartData = await cartRes.json();

          if (cartRes.ok && Array.isArray(cartData.cart)) {
            dispatch(setCart(cartData.cart));
          } else {
            dispatch(setCart([]));
          }
        } else {
          dispatch(setUser(null));
          dispatch(clearCart());
        }
      } catch (err) {
        dispatch(setUser(null));
        dispatch(clearCart());
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      dispatch(setUser(null));
      dispatch(clearCart());
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (authLoading || cartLoading) return null;

  return (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold text-green-600">
          Products Home
        </Link>

        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <span className="text-white font-medium">
                Welcome, {user.email.split("@")[0]}
              </span>
              <Link
                href="/cart"
                className="relative text-sm font-bold text-green-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400"
              >
                🛒 Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-red-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-bold text-green-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-bold text-green-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
