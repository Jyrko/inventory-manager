"use client";
import { useEffect } from "react";

export default function Home() {
  // const router = useRouter();

  useEffect(() => {
    window.location.href = "/login";
  }, []);

  return null;
}
