"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, UserPlus, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isRegister) {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Registration failed");
          setLoading(false);
          return;
        }

        const signInRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInRes?.ok) {
          router.push("/");
          router.refresh();
        } else {
          setError("Registration successful. Please log in.");
          setIsRegister(false);
        }
      } catch {
        setError("Something went wrong");
      }
    } else {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Invalid email or password");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white p-10 md:p-12">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">
              {isRegister ? "Welcome" : "Welcome Back"}
            </p>
            <h1 className="text-3xl font-serif font-medium text-charcoal mb-3">
              {isRegister ? "Create Account" : "Sign In"}
            </h1>
            <div className="divider-gold mx-auto" />
            <p className="text-gray-400 font-light mt-4 text-sm">
              {isRegister
                ? "Join LAAE and enjoy exclusive member benefits"
                : "Access your account and saved preferences"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-charcoal text-white py-4 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold transition-all duration-300 disabled:opacity-40"
            >
              {loading ? (
                "Please wait..."
              ) : isRegister ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              className="text-sm text-gray-400 hover:text-gold transition-colors"
            >
              {isRegister
                ? "Already have an account? Sign in"
                : "New to LAAE? Create an account"}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-charcoal transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Continue browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
