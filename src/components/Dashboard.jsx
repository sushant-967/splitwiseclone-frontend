import { Users, IndianRupee, TrendingUp, Clock, Calendar } from 'lucide-react'

export default function Dashboard({ users, expenses, splits, selectedUser, transactions }) {

  // Calculate statistics
  const totalExpenses = expenses.reduce((sum, e) => sum + e.total_amount, 0)
  const totalSplits = splits.length

  // Currency formatter
  const formatCurrency = (amount) => {
    return `₹${Number(amount).toFixed(2)}`
  }

  // Date formatter
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Calculate user balances
  const userBalances = {}

  users.forEach(user => {
    userBalances[user.id] = 0
  })

  splits.forEach(split => {
    const balance = split.amount_owed - split.amount_paid
    userBalances[split.user_id] =
      (userBalances[split.user_id] || 0) + balance
  })

  // Use transactions from backend if provided
  const recentExpenses =
    (transactions && transactions.length > 0)
      ? transactions
      : [...expenses]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5)

  const getUserName = (userId) => {
    return users.find(u => u.id === userId)?.username || 'Unknown'
  }

  const getTopDebtor = () => {
    const sorted = Object.entries(userBalances)
      .filter(([userId]) => users.find(u => u.id === parseInt(userId)))
      .sort((a, b) => b[1] - a[1])
    return sorted.length > 0 && sorted[0][1] > 0 ? sorted[0] : null
  }

  const getTopCreditor = () => {
    const sorted = Object.entries(userBalances)
      .filter(([userId]) => users.find(u => u.id === parseInt(userId)))
      .sort((a, b) => a[1] - b[1])
    return sorted.length > 0 && sorted[0][1] < 0 ? sorted[0] : null
  }

  // Quick Stats Helpers
  const getMostActiveMember = () => {
    if (expenses.length === 0) return null
    const expensesByUser = {}
    expenses.forEach(exp => {
      expensesByUser[exp.paid_by] = (expensesByUser[exp.paid_by] || 0) + 1
    })
    const sorted = Object.entries(expensesByUser).sort((a, b) => b[1] - a[1])
    return sorted.length > 0 ? { userId: sorted[0][0], count: sorted[0][1] } : null
  }

  const getHighestExpense = () => {
    if (expenses.length === 0) return null
    return expenses.reduce((max, exp) => 
      exp.total_amount > max.total_amount ? exp : max
    )
  }

  const getSettlementCount = () => {
    return new Set(splits.map(s => s.expense_id)).size
  }

  return (
    <div className="space-y-8">

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Expenses */}
        <div className="card-hover bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-700 font-semibold">
              Total Expenses
            </h3>

            <IndianRupee className="text-blue-600" size={24} />
          </div>

          <p className="text-4xl font-bold text-gray-900">
            {formatCurrency(totalExpenses)}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            {expenses.length} transactions
          </p>
        </div>

        {/* Total Users */}
        <div className="card-hover bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-700 font-semibold">
              Total Users
            </h3>

            <Users className="text-purple-600" size={24} />
          </div>

          <p className="text-4xl font-bold text-gray-900">
            {users.length}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Active members
          </p>
        </div>

        {/* Total Splits */}
        <div className="card-hover bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-700 font-semibold">
              Total Splits
            </h3>

            <TrendingUp className="text-green-600" size={24} />
          </div>

          <p className="text-4xl font-bold text-gray-900">
            {totalSplits}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Split entries
          </p>
        </div>

        {/* Average Expense */}
        <div className="card-hover bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border-2 border-pink-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-700 font-semibold">
              Average
            </h3>

            <Clock className="text-pink-600" size={24} />
          </div>

          <p className="text-4xl font-bold text-gray-900">
            {
              expenses.length > 0
                ? formatCurrency(totalExpenses / expenses.length)
                : '₹0.00'
            }
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Per expense
          </p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Expenses
          </h2>

          {
            recentExpenses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No expenses yet
                </p>
              </div>
            ) : (
              <div className="space-y-3">

                {
                  recentExpenses.map((expense) => (

                    <div
                      key={expense.expense_id || expense.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {expense.title}
                        </p>

                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(expense.created_at)} • by {getUserName(expense.paid_by)}
                        </p>
                      </div>

                      <p className="text-lg font-bold text-indigo-600">
                        {
                          formatCurrency(
                            expense.total_amount || 0
                          )
                        }
                      </p>

                    </div>
                  ))
                }

              </div>
            )
          }
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Stats
          </h2>

          <div className="space-y-4">

            {/* Most Active Member */}
            {
              getMostActiveMember() && (
                <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">

                  <p className="text-sm text-gray-600 mb-2">
                    🌟 Most Active Member
                  </p>

                  <p className="text-xl font-bold text-blue-600">
                    {getUserName(getMostActiveMember().userId)}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Created {getMostActiveMember().count} expense{getMostActiveMember().count !== 1 ? 's' : ''}
                  </p>

                </div>
              )
            }

            {/* Highest Single Expense */}
            {
              getHighestExpense() && (
                <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">

                  <p className="text-sm text-gray-600 mb-2">
                    💰 Highest Single Expense
                  </p>

                  <p className="text-xl font-bold text-purple-600">
                    {getHighestExpense().title}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(getHighestExpense().total_amount)} • By {getUserName(getHighestExpense().paid_by)}
                  </p>

                </div>
              )
            }

            {/* Number of Settlements */}
            <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">

              <p className="text-sm text-gray-600 mb-2">
                ✓ Number of Settlements
              </p>

              <p className="text-xl font-bold text-orange-600">
                {getSettlementCount()} transaction{getSettlementCount() !== 1 ? 's' : ''}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Expense records created
              </p>

            </div>

          </div>
        </div>
      </div>

      {/* User Summary */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          User Summary
        </h2>

        {
          users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Add users to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {
                users.map(user => (

                  <div
                    key={user.id}
                    className="card-hover p-4 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg border-2 border-indigo-200"
                  >

                    <div className="flex items-center gap-3 mb-3">

                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 flex items-center justify-center text-white font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-bold text-gray-900">
                          {user.username}
                        </p>

                        <p className="text-xs text-gray-600">
                          ID #{user.id}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`text-lg font-bold ${
                        userBalances[user.id] > 0
                          ? 'text-red-600'
                          : userBalances[user.id] < 0
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }`}
                    >

                      {
                        userBalances[user.id] > 0
                          ? `Owes ${formatCurrency(userBalances[user.id])}`
                          : userBalances[user.id] < 0
                          ? `Gets ${formatCurrency(Math.abs(userBalances[user.id]))}`
                          : 'Settled ✓'
                      }

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>
    </div>
  )
}