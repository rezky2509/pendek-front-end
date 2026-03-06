import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "URL Shortener",
    description: "Shorten your URLs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="grid-overlay"></div>
                {children}
            </body>
        </html>
    );
}
