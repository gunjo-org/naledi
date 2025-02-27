import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Your Bluesky web client",
};

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative z-10 min-h-[100svh] flex items-center justify-center animate-fade animate-delay-500 animate-duration-[600ms]">
        {children}
      </main>
    </>
  );
}
