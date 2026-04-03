import { useState, useEffect } from "react"
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts"

const COLORS = ["#22c55e", "#ef4444"]

export default function App() {
  const [role, setRole] = useState("viewer")

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions")
    return saved
      ? JSON.parse(saved)
      : [
          { date: "2026-04-01", category: "Food", amount: 500, type: "expense" },
          { date: "2026-04-02", category: "Salary", amount: 5000, type: "income" },
          { date: "2026-04-03", category: "Shopping", amount: 1200, type: "expense" }
        ]
  })

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  const income = transactions.filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions.filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses

  const filtered = transactions.filter(t =>
    (filter === "all" || t.type === filter) &&
    t.category.toLowerCase().includes(search.toLowerCase())
  )

  function addTransaction() {
    const newT = {
      date: "2026-04-05",
      category: "New",
      amount: Math.floor(Math.random() * 2000),
      type: Math.random() > 0.5 ? "income" : "expense"
    }
    setTransactions([...transactions, newT])
  }

  const chartData = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses }
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* NAVBAR */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Finance Dashboard</h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded-md px-3 py-1 text-sm"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Balance</p>
            <h2 className="text-2xl font-semibold mt-1">₹{balance}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Income</p>
            <h2 className="text-2xl font-semibold text-green-600 mt-1">
              ₹{income}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Expenses</p>
            <h2 className="text-2xl font-semibold text-red-600 mt-1">
              ₹{expenses}
            </h2>
          </div>
        </div>

        {/* CHART + INSIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4">Spending Overview</h2>

            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} dataKey="value">
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4">Insights</h2>

            <p className="text-gray-600">
              Your expenses are{" "}
              <span className="font-semibold text-red-500">
                ₹{expenses}
              </span>{" "}
              and income is{" "}
              <span className="font-semibold text-green-600">
                ₹{income}
              </span>.
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Try to reduce expenses and increase savings.
            </p>
          </div>

        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Transactions</h2>

            {role === "admin" && (
              <button
                onClick={addTransaction}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Add
              </button>
            )}
          </div>

          <div className="flex gap-3 mb-4">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded-md text-sm w-48"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border px-3 py-2 rounded-md text-sm"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left">Category</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Type</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t, i) => (
                <tr key={i} className="border-b">
                  <td className="p-3">{t.date}</td>
                  <td>{t.category}</td>
                  <td>₹{t.amount}</td>
                  <td className={
                    t.type === "income"
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }>
                    {t.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}