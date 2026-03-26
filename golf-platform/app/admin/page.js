"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const ADMIN_PASSWORD = "golf2026"; // Simple password

  useEffect(() => {
    // Check if already verified (sessionStorage - clears on browser close)
    const verified = sessionStorage.getItem("adminVerified");
    if (verified === "true") {
      setIsVerified(true);
      checkAdmin();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAdmin = async () => {
    const { data } = await supabase.auth.getUser();
    setAdminUser(data.user);

    if (data.user) {
      fetchAllUsers();
    } else {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setPasswordError("");
      sessionStorage.setItem("adminVerified", "true");
      setIsVerified(true);
      checkAdmin();
    } else {
      setPasswordError("❌ Galat password!");
      setPassword("");
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } else {
        setUsers(data || []);
      }
    } catch (err) {
      console.error("Error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const { error } = await supabase
          .from("users")
          .delete()
          .eq("id", userId);

        if (error) {
          console.error("Error deleting user:", error);
          alert("Error deleting user");
        } else {
          setUsers(users.filter((u) => u.id !== userId));
          alert("User deleted successfully!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminVerified");
    setIsVerified(false);
    setPassword("");
  };

  // Password verification screen
  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="card text-center">
            <div className="text-5xl mb-6">🔐</div>
            <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
            <p className="text-gray-400 mb-8">Enter the secret password</p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />

              {passwordError && (
                <p className="text-red-400 text-sm">{passwordError}</p>
              )}

              <button
                type="submit"
                className="w-full btn-primary justify-center"
              >
                Unlock Admin Panel
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <Link href="/">
                <button className="text-gray-400 hover:text-white transition">
                  ← Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // Admin panel screen after verification
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">🔓 Verified</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition"
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="text-gray-400 text-sm mb-1">Total Users</h3>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>

          <div className="card">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="text-gray-400 text-sm mb-1">New This Month</h3>
            <p className="text-3xl font-bold">
              {
                users.filter(
                  (u) =>
                    u.created_at &&
                    new Date(u.created_at).getMonth() ===
                      new Date().getMonth()
                ).length
              }
            </p>
          </div>

          <div className="card">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-gray-400 text-sm mb-1">Latest Signup</h3>
            <p className="text-lg font-semibold">
              {users.length > 0 && users[0]?.email
                ? users[0].email
                : "No users yet"}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="card overflow-hidden">
          <h2 className="text-2xl font-bold mb-6">All Users</h2>

          {users.length === 0 ? (
            <p className="text-gray-400 py-8 text-center">No users found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                      User ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">
                      Joined
                    </th>
                    <th className="text-center py-3 px-4 text-gray-400 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-800 hover:bg-gray-800 transition"
                    >
                      <td className="py-4 px-4 font-semibold">{user.email}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm truncate">
                        {user.id}
                      </td>
                      <td className="py-4 px-4 text-gray-400">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User Details Card */}
        {users.length > 0 && (
          <div className="mt-8 card">
            <h2 className="text-2xl font-bold mb-6">User Details (Raw Data)</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <p className="font-semibold text-blue-400 mb-2">
                    {user.email}
                  </p>
                  <pre className="text-xs text-gray-400 overflow-x-auto bg-black p-2 rounded">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
