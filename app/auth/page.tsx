"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (isAuthenticated === "true") {
        router.push("/dashboard");
      }
    }
  }, [router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate empty input
    if (!key.trim()) {
      setError("请输入认证密钥。");
      return;
    }

    // Validate key against environment variable
    const configuredKey = process.env.NEXT_PUBLIC_AUTH_KEY;
    if (key === configuredKey) {
      // Successful authentication
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    } else {
      // Invalid key
      setError("无效的认证密钥，请重试。");
      setKey("");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            需要认证
          </h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
            输入您的认证密钥以访问仪表板
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="auth-key"
              className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
            >
              认证密钥
            </label>
            <input
              id="auth-key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              placeholder="输入您的密钥"
              autoComplete="off"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-800 dark:text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            提交
          </button>
        </form>
      </div>
    </div>
  );
}
