import Link from "next/link";

interface User {
  email: string;
  userId: string;
}
interface NavbarProps {
  user: User | null; // user is either object or null
}

export default function Navbar() {

  return (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold text-green-600">
          Products Home
        </Link>

        <div className="flex gap-6 items-center">

          <Link href="/login" className="text-sm font-bold text-green-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400">
            Login
          </Link>

          <Link href="/signup" className="text-sm font-bold text-green-600 bg-gray-200 p-4 rounded-xl hover:bg-gray-400">
            Signup
          </Link>

        </div>
      </div>
    </nav>
  );
}
