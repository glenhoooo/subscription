"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Globe, Bell } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (isAuthenticated === "true") {
        router.push("/dashboard");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="px-6 py-20 sm:px-8 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-sans text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            轻松管理您的订阅
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
            在一个地方跟踪所有定期付款。在续费前收到通知，
            管理多种货币，永远不会错过订阅截止日期。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth"
              className="inline-block rounded-lg bg-gray-900 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              开始使用
            </Link>
            <a
              href="https://github.com/glenhoooo/subscription"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-8 py-3 text-base font-semibold text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-hidden="true"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 sm:px-8 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {/* Feature 1: Subscription Management */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-4">
                <Calendar className="h-8 w-8 text-gray-900 dark:text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                订阅管理
              </h2>
              <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-300">
                在一个集中的仪表板中跟踪您的所有用户订阅。
                轻松监控活跃、过期和即将续费的订阅。
              </p>
            </div>

            {/* Feature 2: Multi-Currency Support */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-4">
                <Globe className="h-8 w-8 text-gray-900 dark:text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                多货币支持
              </h2>
              <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-300">
                无缝处理不同货币的订阅。 非常适合拥有国际客户的全球企业。
              </p>
            </div>

            {/* Feature 3: Expiry Notifications */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-4">
                <Bell className="h-8 w-8 text-gray-900 dark:text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                到期通知
              </h2>
              <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-300">
                永远不会错过续费日期。在订阅到期前及时收到提醒，
                以便您主动采取行动。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
