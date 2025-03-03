"use client";

import { BucketProvider } from "@/contexts/bucket.context";

export default function BucketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BucketProvider>{children}</BucketProvider>;
}
