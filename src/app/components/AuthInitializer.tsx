'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setAuthLoading } from '@/store/slices/authSlice';
import { setCart, clearCart, setCartLoading } from '@/store/slices/cartSlice';

export default function AuthInitializer() {
  const dispatch = useDispatch();

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
      } catch (err: unknown) {
        dispatch(setUser(null));
        dispatch(clearCart());
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  return null;
}
