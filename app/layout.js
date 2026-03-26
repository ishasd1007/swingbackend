import "./globals.css";

export const metadata = {
  title: "Golf Charity Platform",
  description: "Enter your scores, win monthly rewards, and support charities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}