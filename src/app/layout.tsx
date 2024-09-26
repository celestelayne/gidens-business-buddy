import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
// import { inter } from "@/app/ui/fonts"; 
import localFont from 'next/font/local'

// best practice to add to the top level component
import "./globals.css";

const monaSans = localFont({
  src: [
    {
      path: '../styles/Mona-Sans/WOFF-2/MonaSans-Regular.woff2',
      weight: '400',
      style: 'bold',
    },
    {
      path: '../styles/Mona-Sans/WOFF-2/MonaSans-ExtraBold.woff2',
      weight: '400',
      style: 'extra bold',
    },
    {
      path: '../styles/Mona-Sans/WOFF-2/MonaSans-Medium.woff2',
      weight: '400',
      style: 'medium',
    },
    {
      path: '../styles/Mona-Sans/WOFF-2/MonaSans-Regular.woff2',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../styles/Mona-Sans/WOFF-2/MonaSans-SemiBold.woff2',
      weight: '400',
      style: 'semi bold',
    },
  ], 
  display: 'swap',
})

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
        <body className={`${monaSans.className} antialiased min-h-screen bg-regal-blue text-white`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
