import { useState, useEffect } from 'react'
import { Plus, IndianRupee, Check } from 'lucide-react'

export default function ExpenseForm({ users, onAddExpense, loading }) {

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    paid_by: '',
    participants: [],
    comments: ''
  })

  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const toggleParticipant = (userId) => {

    setFormData(prev => ({
      ...prev,

      participants: prev.participants.includes(parseInt(userId))
        ? prev.participants.filter(id => id !== parseInt(userId))
        : [...prev.participants, parseInt(userId)]
    }))
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    if (
      formData.title &&
      formData.amount &&
      formData.paid_by &&
      formData.participants.length > 0
    ) {

      onAddExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        paid_by: parseInt(formData.paid_by),
        participants: formData.participants
      })

      // Show success animation
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)

      setFormData({
        title: '',
        amount: '',
        paid_by: '',
        participants: [],
        comments: ''
      })
    }
  }

  const isValid =
    formData.title &&
    formData.amount &&
    formData.paid_by &&
    formData.participants.length > 0

  return (

    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-20">

      {/* Success Animation */}
      {
        showSuccess && (
          <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 z-50 animate-pulse">
            <div className="text-center">
              <div className="mb-4 animate-bounce">
                <Check className="text-white" size={64} />
              </div>
              <p className="text-white text-2xl font-bold">
                Expense Added! 🎉
              </p>
              <p className="text-green-100 mt-2">
                Great job splitting!
              </p>
            </div>
          </div>
        )
      }

      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Plus className="text-indigo-600" size={28} />
        Add Expense
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expense Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Dinner at restaurant"
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors text-sm"
            disabled={loading}
          />

        </div>

        {/* Amount */}
        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Total Amount (₹)
          </label>

          <div className="relative">

            <IndianRupee
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors text-sm"
              disabled={loading}
            />

          </div>

        </div>

        {/* Paid By */}
        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Paid By
          </label>

          <select
            name="paid_by"
            value={formData.paid_by}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors text-sm"
            disabled={loading}
          >

            <option value="">
              Select a user
            </option>

            {
              users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))
            }

          </select>

        </div>

        {/* Participants */}
        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Participants
          </label>

          <div className="space-y-2 max-h-40 overflow-y-auto">

            {
              users.map(user => (

                <label
                  key={user.id}
                  className="flex items-center gap-2 cursor-pointer p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                >

                  <input
                    type="checkbox"
                    checked={formData.participants.includes(user.id)}
                    onChange={() => toggleParticipant(user.id)}
                    className="w-4 h-4 rounded border-2 border-gray-300 accent-indigo-600"
                    disabled={loading}
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {user.username}
                  </span>

                </label>
              ))
            }

          </div>

        </div>

        {/* Comments */}
        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notes (optional)
          </label>

          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Add any notes..."
            rows="2"
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors text-sm resize-none"
            disabled={loading}
          />

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isValid}
          className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
        >

          {
            loading
              ? 'Adding...'
              : '✓ Add Expense'
          }

        </button>

      </form>
    </div>
  )
}