import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ currentView, setCurrentView, userCount, expenseCount }) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'expenses', label: 'Expenses', icon: '💰' },
    { id: 'splits', label: 'Splits', icon: '📈' },
  ]

  return (
    <nav className="sticky top-0 z-50 gradient-bg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center gap-2">
              <div className="text-3xl">💵</div>
              <div className="text-white">
                <h1 className="text-xl font-bold">SplitWise</h1>
                <p className="text-xs text-indigo-200">Smart Expense Splitter</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-white/30 text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="hidden sm:flex gap-4 text-white">
            <div className="bg-white/20 px-3 py-1 rounded-lg">
              <p className="text-xs text-white/70">Users</p>
              <p className="text-xl font-bold">{userCount}</p>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-lg">
              <p className="text-xs text-white/70">Expenses</p>
              <p className="text-xl font-bold">{expenseCount}</p>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-white/30 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}