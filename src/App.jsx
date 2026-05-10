import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import UserManager from './components/UserManager'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSplits from './components/ExpenseSplits'
import Dashboard from './components/Dashboard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [users, setUsers] = useState([])
  const [expenses, setExpenses] = useState([])
  const [transactions, setTransactions] = useState([])
  const [splits, setSplits] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`)
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/expenses`)
      setExpenses(response.data)
    } catch (error) {
      console.error('Error fetching expenses:', error)
    }
  }

  // Fetch latest transactions (uses backend /transactions/{limit})
  const fetchTransactions = async (limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}/transactions/${limit}`)
      setTransactions(response.data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  // Fetch splits
  const fetchSplits = async () => {
    try {
      const response = await axios.get(`${API_URL}/splits`)
      setSplits(response.data)
    } catch (error) {
      console.error('Error fetching splits:', error)
    }
  }

  // Initial load
  useEffect(() => {
    fetchUsers()
    fetchExpenses()
    fetchSplits()
    fetchTransactions(10)
  }, [])

  const handleAddUser = async (username) => {
    try {
      setLoading(true)
      const response = await axios.post(`${API_URL}/users`, { username })
      setUsers([...users, response.data])
    } catch (error) {
      console.error('Error adding user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expenseData) => {
    try {
      setLoading(true)
      const response = await axios.post(`${API_URL}/expenses`, expenseData)
      setExpenses([...expenses, response.data])
      await fetchSplits()
      await fetchTransactions(10)
    } catch (error) {
      console.error('Error adding expense:', error)
    } finally {
      setLoading(false)
    }
  }

  // Deletion of expenses disabled by policy; backend delete endpoint removed

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        userCount={users.length}
        expenseCount={expenses.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <Dashboard 
            users={users}
            expenses={expenses}
            splits={splits}
            transactions={transactions}
            selectedUser={selectedUser}
          />
        )}

        {currentView === 'users' && (
          <UserManager 
            users={users}
            onAddUser={handleAddUser}
            loading={loading}
            onSelectUser={setSelectedUser}
          />
        )}

        {currentView === 'expenses' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ExpenseForm 
                users={users}
                onAddExpense={handleAddExpense}
                loading={loading}
              />
            </div>
            <div className="lg:col-span-2">
              <ExpenseList 
                expenses={expenses}
                users={users}
              />
            </div>
          </div>
        )}

        {currentView === 'splits' && (
          <ExpenseSplits 
            splits={splits}
            expenses={expenses}
            users={users}
            selectedUser={selectedUser}
          />
        )}
      </main>
    </div>
  )
}