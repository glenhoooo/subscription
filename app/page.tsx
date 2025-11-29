import Link from "next/link";
import { Calendar, Globe, Bell } from "lucide-react";

export default function Home() {
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
          <div className="mt-10">
            <Link
              href="/auth"
              className="inline-block rounded-lg bg-gray-900 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              开始使用
            </Link>
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
                无缝处理不同货币的订阅。
                非常适合拥有国际客户的全球企业。
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
