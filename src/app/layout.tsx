import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { inter } from "@/app/ui/fonts"; 

// best practice to add to the top level component
import "./globals.css";

export const metadata = {
  title: "Meet Your AI Business Buddy",
  description: "A powerful tool that helps you navigate the ambiguous journey of starting and growing your business.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
