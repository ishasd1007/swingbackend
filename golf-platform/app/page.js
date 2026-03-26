import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center px-6">

      {/* Hero Section */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6">
        Golf Charity Platform ⛳
      </h1>

      <p className="text-gray-400 text-lg md:text-xl text-center max-w-2xl mb-10">
        Enter your scores, win monthly rewards, and support charities —
        all in one powerful platform.
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-600 transition px-8 py-3 rounded-xl text-lg shadow-lg">
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button className="bg-green-500 hover:bg-green-600 transition px-8 py-3 rounded-xl text-lg shadow-lg">
            Signup
          </button>
        </Link>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        
        <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md">
          <h2 className="text-xl font-semibold mb-2">🎯 Monthly Rewards</h2>
          <p className="text-gray-400 text-sm">
            Participate in exciting monthly draws and win prizes.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md">
          <h2 className="text-xl font-semibold mb-2">❤️ Support Charity</h2>
          <p className="text-gray-400 text-sm">
            A portion of your subscription goes to a cause you choose.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl text-center shadow-md">
          <h2 className="text-xl font-semibold mb-2">⛳ Track Scores</h2>
          <p className="text-gray-400 text-sm">
            Enter and manage your golf scores easily.
          </p>
        </div>

      </div>

    </div>
  );
}