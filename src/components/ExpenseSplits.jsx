import {
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  IndianRupee
} from 'lucide-react'

export default function ExpenseSplits({
  splits,
  expenses,
  users,
  selectedUser
}) {

  const getUserName = (userId) => {
    return users.find(u => u.id === userId)?.username || 'Unknown'
  }

  const getExpenseName = (expenseId) => {
    return expenses.find(e => e.id === expenseId)?.title || 'Unknown'
  }

  // Currency formatter
  const formatCurrency = (amount) => {
    return `₹${Number(amount).toFixed(2)}`
  }

  // Filter splits for selected user if applicable
  const displaySplits = selectedUser
    ? splits.filter(
        s =>
          s.user_id === selectedUser.id ||
          expenses.find(e => e.id === s.expense_id)?.paid_by === selectedUser.id
      )
    : splits

  // Calculate balances
  const userBalances = {}

  users.forEach(user => {
    userBalances[user.id] = 0
  })

  splits.forEach(split => {

    const balance = split.amount_owed - split.amount_paid

    userBalances[split.user_id] =
      (userBalances[split.user_id] || 0) + balance
  })

  const getSettlements = () => {

    const balances = { ...userBalances }

    const settlements = []

    const debtors = Object.entries(balances)
      .filter(([_, amount]) => amount > 0)
      .sort((a, b) => b[1] - a[1])

    const creditors = Object.entries(balances)
      .filter(([_, amount]) => amount < 0)
      .sort((a, b) => a[1] - b[1])

    debtors.forEach(([debtor, debtAmount]) => {

      creditors.forEach(([creditor, creditAmount]) => {

        if (debtAmount > 0 && creditAmount < 0) {

          const amount = Math.min(
            debtAmount,
            Math.abs(creditAmount)
          )

          settlements.push({
            from: debtor,
            to: creditor,
            amount
          })

          balances[debtor] -= amount
          balances[creditor] += amount
        }
      })
    })

    return settlements
  }

  if (displaySplits.length === 0) {

    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">

        <div className="text-5xl mb-4">
          📊
        </div>

        <p className="text-gray-500 text-lg">
          {
            selectedUser
              ? `No splits for ${selectedUser.username}`
              : 'No expense splits yet'
          }
        </p>

      </div>
    )
  }

  const settlements = getSettlements()

  return (

    <div className="space-y-8">

      {/* Settlement Summary */}
      {
        settlements.length > 0 && (

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 border-2 border-green-200">

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">

              <TrendingUp
                className="text-green-600"
                size={28}
              />

              Settlement Summary

            </h2>

            <div className="space-y-3">

              {
                settlements.map((settlement, idx) => (

                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 flex items-center justify-between"
                  >

                    <div className="flex items-center gap-3 flex-1">

                      <div className="text-2xl">
                        {getUserName(settlement.from).charAt(0)}
                      </div>

                      <div>

                        <p className="font-bold text-gray-900">
                          {getUserName(settlement.from)}
                        </p>

                        <p className="text-sm text-gray-500">
                          owes
                        </p>

                      </div>
                    </div>

                    <div className="text-center mx-4">

                      <p className="text-lg font-bold text-green-600 flex items-center gap-1 justify-center">

                        <IndianRupee size={18} />

                        {settlement.amount.toFixed(2)}

                      </p>

                    </div>

                    <div className="flex items-center gap-3 flex-1 justify-end">

                      <div className="text-right">

                        <p className="font-bold text-gray-900">
                          {getUserName(settlement.to)}
                        </p>

                        <p className="text-sm text-gray-500">
                          to receive
                        </p>

                      </div>

                      <div className="text-2xl">
                        {getUserName(settlement.to).charAt(0)}
                      </div>

                    </div>

                  </div>
                ))
              }

            </div>

          </div>
        )
      }

      {/* User Balances */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          User Balances
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {
            users.map(user => (

              <div
                key={user.id}
                className={`card-hover p-4 rounded-xl border-2 ${
                  userBalances[user.id] > 0
                    ? 'bg-red-50 border-red-200'
                    : userBalances[user.id] < 0
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >

                <div className="flex items-center gap-3 mb-3">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      userBalances[user.id] > 0
                        ? 'bg-red-500'
                        : userBalances[user.id] < 0
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  >

                    {user.username.charAt(0).toUpperCase()}

                  </div>

                  <div>

                    <p className="font-bold text-gray-900">
                      {user.username}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-2">

                  {
                    userBalances[user.id] > 0 ? (
                      <>
                        <ArrowUpRight
                          className="text-red-500"
                          size={20}
                        />

                        <span className="font-bold text-red-600">
                          Owes {formatCurrency(userBalances[user.id])}
                        </span>
                      </>
                    ) : userBalances[user.id] < 0 ? (
                      <>
                        <ArrowDownLeft
                          className="text-green-500"
                          size={20}
                        />

                        <span className="font-bold text-green-600">
                          Gets {formatCurrency(Math.abs(userBalances[user.id]))}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-gray-600">
                        Settled ✓
                      </span>
                    )
                  }

                </div>

              </div>
            ))
          }

        </div>

      </div>

      {/* Detailed Splits */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Expense Splits
        </h2>

        <div className="space-y-3">

          {
            displaySplits.map(split => (

              <div
                key={split.id}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-200"
              >

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div className="flex-1">

                    <h3 className="font-bold text-gray-900">
                      {getExpenseName(split.expense_id)}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">

                      Split for

                      <span className="font-semibold">
                        {' '}
                        {getUserName(split.user_id)}
                      </span>

                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-4">

                    <div className="text-center">

                      <p className="text-xs text-gray-600 mb-1">
                        Owed
                      </p>

                      <p className="text-lg font-bold text-indigo-600">
                        {formatCurrency(split.amount_owed)}
                      </p>

                    </div>

                    <div className="text-center">

                      <p className="text-xs text-gray-600 mb-1">
                        Paid
                      </p>

                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(split.amount_paid)}
                      </p>

                    </div>

                  </div>

                </div>

                <div className="mt-4 pt-4 border-t border-blue-200">

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">

                    <div>

                      <p className="text-gray-600">
                        Opening
                      </p>

                      <p className="font-semibold">
                        {formatCurrency(split.opening_balance)}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-600">
                        Closing
                      </p>

                      <p className="font-semibold">
                        {formatCurrency(split.closing_balance)}
                      </p>

                    </div>

                    <div className="col-span-2 sm:col-span-1">

                      <p className="text-gray-600">
                        Balance
                      </p>

                      <p
                        className={`font-semibold ${
                          split.closing_balance > 0
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}
                      >

                        {formatCurrency(split.closing_balance)}

                      </p>

                    </div>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}