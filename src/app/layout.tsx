import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Notes — Visual Chapter-by-Chapter Notes",
  description:
    "A visual, memory-friendly collection of book notes organized by chapters with key insights, concepts, and quotes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(!s&&d)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
