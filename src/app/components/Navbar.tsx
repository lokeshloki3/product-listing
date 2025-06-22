'use client';

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { RootState } from "@/store";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { clearCart } from "@/store/slices/cartSlice";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state: RootState) => state.auth);
  const { items: cartItems, loading: cartLoading } = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      dispatch(setUser(null));
      dispatch(clearCart());
      setMenuOpen(false);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [dispatch, router]);

  if (authLoading || cartLoading) return null;

  return (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold text-green-600">
          Products Home
        </Link>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          {user ? (
            <>
              <span className="text-white font-medium">Welcome, {user.email.split("@")[0]}</span>
              <Link href="/cart" className="relative text-base font-bold text-slate-100">
                <FaShoppingCart className="text-2xl" />
                {cartItems?.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 10 }}
                    className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center rounded-full text-white"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </Link>
              <button onClick={handleLogout} className="text-sm font-bold text-red-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-green-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400">
                Login
              </Link>
              <Link href="/signup" className="text-sm font-bold text-green-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-slate-800 z-40"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setMenuOpen(false)} className="text-white text-3xl">
                <FaTimes />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center h-full space-y-6">
              {user ? (
                <>
                  <p className="text-white text-lg font-medium">
                    Welcome, {user.email.split("@")[0]}
                  </p>
                  <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-base font-bold text-white bg-green-600 px-4 py-2 rounded-xl hover:bg-green-700">
                    Cart ({cartItems?.length || 0})
                  </Link>
                  <button onClick={handleLogout} className="text-base font-bold text-red-600 bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-400">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="text-base font-bold text-green-600 bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-400">
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-base font-bold text-green-600 bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-400">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
