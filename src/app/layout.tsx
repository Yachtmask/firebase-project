
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AptosWalletProvider } from "@/components/wallet/AptosWalletProvider";

export const metadata: Metadata = {
  title: 'GhostDrop | Dead Man\'s Switch Vault',
  description: 'Encrypt your files, set a countdown, and ensure your data reaches the right hands if you go dark.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        <AptosWalletProvider>
          {children}
          <Toaster />
        </AptosWalletProvider>
      </body>
    </html>
  );
}
