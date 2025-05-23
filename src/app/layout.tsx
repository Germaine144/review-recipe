import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Load custom fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata for SEO and browser tabs
export const metadata: Metadata = {
  title: 'Recipe Vault',
  description: 'Access premium recipes from world-renowned chefs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ensure the Clerk key is defined at build and runtime
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkPublishableKey) {
    throw new Error(
      ' Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable. Please set it in your .env.local file or hosting platform settings.'
    );
  }

  // Optional: Log only during development
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Clerk Publishable Key Loaded:', clerkPublishableKey);
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
