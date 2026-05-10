import { Calendar, IndianRupee } from 'lucide-react'

export default function ExpenseList({ expenses, users }) {

  // Sort expenses in descending order by date
  const sortedExpenses = expenses
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  const getUserName = (userId) => {
    return users.find(u => u.id === userId)?.username || 'Unknown'
  }

  const formatDate = (dateString) => {

    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Currency formatter
  const formatCurrency = (amount) => {
    return `₹${Number(amount).toFixed(2)}`
  }

  if (sortedExpenses.length === 0) {

    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">

        <div className="text-5xl mb-4">
          💳
        </div>

        <p className="text-gray-500 text-lg">
          No expenses yet. Create your first expense!
        </p>

      </div>
    )
  }

  return (

    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Last 5 Expenses
      </h2>

      <div className="space-y-3">

        {
          sortedExpenses.map(expense => (

            <div
              key={expense.id}
              className="card-hover bg-gradient-to-r from-gray-50 to-indigo-50 p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-400"
            >

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="flex-1 min-w-0">

                  <h3 className="font-bold text-gray-900 text-lg truncate">
                    {expense.title}
                  </h3>

                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">

                    <Calendar size={14} />

                    {formatDate(expense.created_at)}

                    • Paid by

                    <span className="font-semibold">
                      {getUserName(expense.paid_by)}
                    </span>

                  </p>

                  {
                    expense.comments && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        {expense.comments}
                      </p>
                    )
                  }

                </div>

                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">

                  <div className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-4 py-2 rounded-lg font-bold text-lg flex items-center gap-1">

                    <IndianRupee size={18} />

                    {Number(expense.total_amount).toFixed(2)}

                  </div>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}