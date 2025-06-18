import Link from "next/link";
import "@/app/[locale]/globals.css";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

// Optionally, if you want to explicitly set status code (though Next.js handles this for 404s)
// import { headers } from 'next/headers';
// export function generateStaticParams() {
//   headers().set('x-next-cache-tag', '404');
//   return [];
// }
