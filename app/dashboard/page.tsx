"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import { ISubscription } from "@/lib/models/Subscription";
import { normalizeToMonthlyCNY } from "@/lib/exchange-rates";

// Common subscription icons
const ICON_OPTIONS = [
  "Music",
  "Video",
  "Tv",
  "Newspaper",
  "Cloud",
  "Globe",
  "Smartphone",
  "Laptop",
  "Camera",
  "Gamepad2",
  "Book",
  "Dumbbell",
  "Coffee",
  "ShoppingCart",
  "CreditCard",
  "Folder",
];

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<
    ISubscription[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] =
    useState<ISubscription | null>(null);
  const [error, setError] = useState("");
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: number;
  } | null>(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    icon: "Cloud",
    name: "",
    renewalCycle: "monthly" as "yearly" | "quarterly" | "monthly",
    price: "",
    currency: "USD",
    nextRenewalDate: "",
  });

  useEffect(() => {
    // Check authentication status
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (isAuthenticated !== "true") {
        router.push("/auth");
      } else {
        setIsLoading(false);
        fetchSubscriptions();
        fetchExchangeRates();
      }
    }
  }, [router]);

  useEffect(() => {
    // Filter subscriptions based on search query
    if (searchQuery.trim() === "") {
      setFilteredSubscriptions(subscriptions);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = subscriptions.filter(
        (sub) =>
          sub.name.toLowerCase().includes(query) ||
          sub.renewalCycle.toLowerCase().includes(query)
      );
      setFilteredSubscriptions(filtered);
    }
  }, [searchQuery, subscriptions]);

  const fetchSubscriptions = async () => {
    try {
      const authKey = localStorage.getItem("authKey");
      const res = await fetch("/api/subscriptions", {
        headers: {
          "X-API-Key": authKey || "",
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("authKey");
        router.push("/auth");
        return;
      }

      const result = await res.json();
      if (result.success) {
        setSubscriptions(result.data);
      } else {
        setError("加载订阅失败");
      }
    } catch {
      setError("连接数据库出错");
    }
  };

  const fetchExchangeRates = async () => {
    try {
      setRatesLoading(true);
      const authKey = localStorage.getItem("authKey");
      const res = await fetch("/api/exchange-rates", {
        headers: {
          "X-API-Key": authKey || "",
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("authKey");
        router.push("/auth");
        return;
      }

      const result = await res.json();
      if (result.success) {
        setExchangeRates(result.rates);
        setRatesError("");
      } else {
        setRatesError("汇率加载失败");
      }
    } catch {
      setRatesError("获取汇率时出错");
    } finally {
      setRatesLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.price || !formData.nextRenewalDate) {
      setError("请填写所有必填字段");
      return;
    }

    try {
      const url = editingSubscription
        ? `/api/subscriptions/${editingSubscription._id}`
        : "/api/subscriptions";
      const method = editingSubscription ? "PUT" : "POST";
      const authKey = localStorage.getItem("authKey");

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": authKey || "",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("authKey");
        router.push("/auth");
        return;
      }

      const result = await res.json();
      if (result.success) {
        fetchSubscriptions();
        closeModal();
      } else {
        setError(result.error || "保存订阅失败");
      }
    } catch {
      setError("保存订阅时出错");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除此订阅吗？")) {
      return;
    }

    try {
      const authKey = localStorage.getItem("authKey");
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: "DELETE",
        headers: {
          "X-API-Key": authKey || "",
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("authKey");
        router.push("/auth");
        return;
      }

      const result = await res.json();
      if (result.success) {
        fetchSubscriptions();
      } else {
        setError("删除订阅失败");
      }
    } catch {
      setError("删除订阅时出错");
    }
  };

  const openAddModal = () => {
    setEditingSubscription(null);
    setFormData({
      icon: "Cloud",
      name: "",
      renewalCycle: "monthly",
      price: "",
      currency: "USD",
      nextRenewalDate: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (subscription: ISubscription) => {
    setEditingSubscription(subscription);
    setFormData({
      icon: subscription.icon,
      name: subscription.name,
      renewalCycle: subscription.renewalCycle,
      price: subscription.price.toString(),
      currency: subscription.currency,
      nextRenewalDate: new Date(subscription.nextRenewalDate)
        .toISOString()
        .split("T")[0],
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubscription(null);
    setError("");
  };

  const getRemainingTime = (nextRenewalDate: Date) => {
    const now = new Date();
    const renewal = new Date(nextRenewalDate);
    const diff = renewal.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 0)
      return { text: "已过期", color: "text-red-600 dark:text-red-400" };
    if (days === 0)
      return { text: "今天", color: "text-red-600 dark:text-red-400" };
    if (days < 7)
      return { text: `${days} 天`, color: "text-red-600 dark:text-red-400" };
    if (days < 30)
      return {
        text: `${days} 天`,
        color: "text-yellow-600 dark:text-yellow-400",
      };
    if (days < 60)
      return {
        text: `${Math.floor(days / 30)} 个月`,
        color: "text-green-600 dark:text-green-400",
      };
    return {
      text: `${Math.floor(days / 30)} 个月`,
      color: "text-green-600 dark:text-green-400",
    };
  };

  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) return null;
    return <IconComponent className="h-6 w-6" />;
  };

  const calculateMonthlyCNY = (subscription: ISubscription): string => {
    if (!exchangeRates) {
      return "N/A";
    }

    try {
      const monthlyCNY = normalizeToMonthlyCNY(
        subscription.price,
        subscription.currency,
        subscription.renewalCycle,
        exchangeRates
      );
      return `¥${monthlyCNY.toFixed(2)}`;
    } catch {
      return "N/A";
    }
  };

  const calculateTotalAnnualCNY = (): number => {
    if (!exchangeRates || subscriptions.length === 0) {
      return 0;
    }

    try {
      return subscriptions.reduce((total, subscription) => {
        const monthlyCNY = normalizeToMonthlyCNY(
          subscription.price,
          subscription.currency,
          subscription.renewalCycle,
          exchangeRates
        );
        // Convert monthly to annual by multiplying by 12
        return total + monthlyCNY * 12;
      }, 0);
    } catch {
      return 0;
    }
  };

  const calculateAverageMonthly = (): number => {
    const totalAnnual = calculateTotalAnnualCNY();
    return totalAnnual / 12;
  };

  const formatCurrency = (amount: number): string => {
    return `¥${amount.toLocaleString("zh-CN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (date: Date): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="px-6 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              订阅管理器
            </h1>
            <button
              onClick={openAddModal}
              className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              添加订阅
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="搜索订阅..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-gray-900 dark:text-white focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-800 dark:text-red-200">
              {error}
            </div>
          )}

          {/* Exchange Rate Error Message */}
          {ratesError && (
            <div className="mb-6 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 px-4 py-3 text-sm text-yellow-800 dark:text-yellow-200">
              {ratesError} - 汇率列将显示为 N/A
            </div>
          )}

          {/* Subscriptions Table */}
          {filteredSubscriptions.length === 0 ? (
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-12 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                {searchQuery
                  ? "未找到订阅"
                  : "还没有订阅。点击「添加订阅」开始。"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      图标
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      周期
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      价格
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      每月人民币
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      下次续费
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      剩余
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredSubscriptions.map((subscription) => {
                    const remaining = getRemainingTime(
                      subscription.nextRenewalDate
                    );
                    return (
                      <tr key={subscription._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900 dark:text-white">
                            {renderIcon(subscription.icon)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {subscription.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 capitalize">
                          {subscription.renewalCycle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {subscription.currency}{" "}
                          {subscription.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {ratesLoading
                            ? "加载中..."
                            : calculateMonthlyCNY(subscription)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(subscription.nextRenewalDate)}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${remaining.color}`}
                        >
                          {remaining.text}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => openEditModal(subscription)}
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleDelete(subscription._id!)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Subscription Summary */}
          {filteredSubscriptions.length > 0 && (
            <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                订阅总览
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Annual Cost */}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    每年总花费
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {ratesLoading
                      ? "加载中..."
                      : formatCurrency(calculateTotalAnnualCNY())}
                  </span>
                </div>

                {/* Average Monthly Cost */}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    平均每月花费
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {ratesLoading
                      ? "加载中..."
                      : formatCurrency(calculateAverageMonthly())}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {editingSubscription ? "编辑订阅" : "添加订阅"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  图标
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                {/* Icon Preview */}
                <div className="mt-3 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="text-sm">图标预览：</span>
                  <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-2">
                    {renderIcon(formData.icon)}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  名称 *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  续费周期 *
                </label>
                <select
                  value={formData.renewalCycle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      renewalCycle: e.target.value as
                        | "yearly"
                        | "quarterly"
                        | "monthly",
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white"
                >
                  <option value="monthly">按月</option>
                  <option value="quarterly">按季度</option>
                  <option value="yearly">按年</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    价格 *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    货币 *
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="USD">USD (美元)</option>
                    <option value="CNY">CNY (人民币)</option>
                    <option value="EUR">EUR (欧元)</option>
                    <option value="GBP">GBP (英镑)</option>
                    <option value="RUB">RUB (卢布)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  下次续费日期 *
                </label>
                <input
                  type="date"
                  value={formData.nextRenewalDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nextRenewalDate: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white"
                  required
                />
              </div>
              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-800 dark:text-red-200">
                  {error}
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  {editingSubscription ? "更新" : "添加"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
