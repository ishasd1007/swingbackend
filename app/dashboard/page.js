"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⛳</span>
            <h1 className="text-2xl font-bold">Golf Platform</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <button className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg font-semibold transition">
                Admin Panel
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {user ? (
          <>
            {/* Welcome Section */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-2">Welcome back! 👋</h2>
              <p className="text-gray-400 text-lg">{user.email}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="card">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-gray-400 text-sm mb-1">Total Rounds</h3>
                <p className="text-3xl font-bold">24</p>
              </div>

              <div className="card">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-gray-400 text-sm mb-1">Best Score</h3>
                <p className="text-3xl font-bold">72</p>
              </div>

              <div className="card">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-gray-400 text-sm mb-1">Avg Score</h3>
                <p className="text-3xl font-bold">85</p>
              </div>

              <div className="card">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="text-gray-400 text-sm mb-1">Rewards Points</h3>
                <p className="text-3xl font-bold">1,240</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 card">
                <h3 className="text-xl font-semibold mb-6">Recent Rounds</h3>
                <div className="space-y-4">
                  {[
                    { date: "Mar 24, 2026", score: 82, course: "Pebble Beach" },
                    { date: "Mar 22, 2026", score: 78, course: "Torrey Pines" },
                    { date: "Mar 20, 2026", score: 86, course: "Augusta" },
                  ].map((round, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition"
                    >
                      <div>
                        <p className="font-semibold">{round.course}</p>
                        <p className="text-gray-400 text-sm">{round.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">
                          {round.score}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <button className="w-full btn-primary mb-3 justify-center">
                    ➕ Add Round
                  </button>
                  <button className="w-full btn-secondary justify-center">
                    🎁 View Rewards
                  </button>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold mb-4">This Month</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Rank</p>
                      <p className="text-2xl font-bold">🥈 8th Place</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Prize Pool</p>
                      <p className="text-xl font-bold text-blue-400">$500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-red-400 mb-6">Not logged in</p>
            <Link href="/login">
              <button className="btn-primary">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}