"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      // Save user to users table
      const { error: dbError } = await supabase
        .from("users")
        .insert([
          {
            id: data.user?.id,
            email: email,
            created_at: new Date().toISOString(),
          },
        ]);

      if (dbError) {
        console.log("DB Error (table might not exist):", dbError);
      }

      alert("Signup successful!");
      router.push("/login");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl mb-4">Signup</h1>

      <input
        className="p-2 mb-2 text-black"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="p-2 mb-2 text-black"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-green-500 px-4 py-2"
        onClick={handleSignup}
      >
        Signup
      </button>
    </div>
  );
}