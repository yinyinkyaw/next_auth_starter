"use client";

import { create } from "zustand";
import { User as FirebaseUser, onIdTokenChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/services/firebase";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface AuthState {
  user: FirebaseUser | null;
}

export const useAuthStore = create<AuthState>(() => ({
  user: null,
}));

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      useAuthStore.setState({ user });
    });
    return () => unsubscribe();
  }, []);

  return <NuqsAdapter>{children}</NuqsAdapter>;
}
