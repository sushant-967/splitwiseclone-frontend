import { useState } from 'react'
import { UserPlus, Users } from 'lucide-react'

export default function UserManager({ users, onAddUser, loading, onSelectUser }) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      onAddUser(username)
      setUsername('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Add User Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <UserPlus className="text-indigo-600" size={28} />
          Add New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (e.g., John)"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Adding...' : '+ Add User'}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="text-indigo-600" size={28} />
          All Users ({users.length})
        </h2>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">👤</div>
            <p className="text-gray-500 text-lg">No users yet. Add your first user above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <div
                key={user.id}
                onClick={() => onSelectUser(user)}
                className="card-hover cursor-pointer bg-gradient-to-br from-indigo-50 to-pink-50 p-6 rounded-xl border-2 border-indigo-200 hover:border-indigo-400"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{user.username}</p>
                    <p className="text-sm text-gray-500">ID: {user.id}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-indigo-200">
                  <p className="text-xs text-gray-600">
                    Joined: {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}