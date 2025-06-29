// app/layout.tsx
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-200 text-black p-4 flex gap-6">

          <Link href="/">Home</Link>
          <Link href="/create">Add_task</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
