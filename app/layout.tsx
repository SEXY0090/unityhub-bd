import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "UnityHub BD — Your Developer Identity",
  description: "Build your public developer identity. Create, showcase and verify your portfolio.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
