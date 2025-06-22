'use client';

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setAuthenticated, setAuthLoading } from "@/store/slices/authSlice";
import { RootState } from "@/store";
import { useEffect } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setAuthLoading(true));
      try {
        const res = await fetch("/api/users/verify", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        dispatch(setAuthenticated(data.isAuthenticated));
      } catch {
        dispatch(setAuthenticated(false));
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      dispatch(setAuthenticated(false));
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ⛔️ Don't render navbar until auth is checked
  if (loading) return null;

  return (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold text-green-600">
          Products Home
        </Link>

        <div className="flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <Link
                href="/cart"
                className="text-sm font-bold text-green-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400"
              >
                🛒 Cart
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-red-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400"
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
