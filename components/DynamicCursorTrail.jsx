"use client";
import dynamic from "next/dynamic";

const CursorTrail = dynamic(() => import("@/components/CursorTrail"), {
  ssr: false,
  loading: () => null,
});

export default function DynamicCursorTrail() {
  return <CursorTrail />;
}
