# 💵 Splitwise Clone - Frontend

A beautiful, modern, and fully responsive React + Vite frontend for your expense splitting application. Built with Tailwind CSS and designed for mobile devices.

## ✨ Features

- **Beautiful UI**: Modern gradient designs with smooth animations
- **Mobile Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- **User Management**: Create and manage users easily
- **Expense Tracking**: Add and manage expenses with detailed information
- **Smart Splits**: Automatic expense splitting calculations
- **Settlement System**: Visual settlement suggestions for group payments
- **Dashboard**: Real-time statistics and expense overview
- **Easy Deployment**: One-click deployment to Vercel/Netlify

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend API running (http://localhost:8000)

### Installation

1. **Clone and navigate to frontend**
```bash
cd Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set environment variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your backend URL
# VITE_API_URL=http://localhost:8000
```

4. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser!

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Dashboard.jsx        # Main dashboard view
│   │   ├── UserManager.jsx      # User management
│   │   ├── ExpenseForm.jsx      # Add new expenses
│   │   ├── ExpenseList.jsx      # Display expenses
│   │   └── ExpenseSplits.jsx    # Settlement & splits view
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
└── .env.local                  # Environment variables
```

## 🎨 UI Components

### Dashboard
- Overview of all expenses and users
- Real-time statistics
- Recent transactions
- Settlement status

### User Manager
- Create new users
- View all users with creation dates
- Click to select user for filtered view

### Expense Form
- Add new expenses with title, amount, payer, and participants
- Add optional comments/notes
- Select multiple participants for cost splitting

### Expense List
- View all created expenses
- Delete expenses if needed
- See who paid and expense details

### Expense Splits
- View detailed settlement calculations
- See who owes whom
- Track opening/closing balances
- Get payment settlement suggestions

## 🔌 API Integration

The app connects to your backend API with the following endpoints:

```
GET    /users              # Get all users
POST   /users              # Create new user
GET    /expenses           # Get all expenses
POST   /expenses           # Create new expense
DELETE /expenses/{id}      # Delete expense
GET    /splits             # Get all expense splits
```

Make sure your backend API is running on the URL specified in `.env.local`.

## 🎯 Usage

### Adding Users
1. Navigate to **Users** tab
2. Enter username and click **Add User**
3. Users appear in the grid below

### Creating Expenses
1. Go to **Expenses** tab
2. Fill in the form:
   - **Title**: Description of expense
   - **Amount**: Total expense amount
   - **Paid By**: Who paid for it
   - **Participants**: Select who shares the expense
   - **Notes**: Optional comments
3. Click **Add Expense**

### Viewing Splits
1. Go to **Splits** tab
2. See settlement suggestions
3. View individual user balances
4. Check detailed split transactions

### Dashboard
1. View overall statistics
2. See recent expenses
3. Check settlement status
4. View all user balances

## 📱 Mobile Features

- Responsive navigation bar with mobile menu
- Optimized forms for touch input
- Mobile-friendly grids and layouts
- Touch-friendly buttons and interactions
- Readable text sizes on all screen sizes

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select the `Frontend` folder as root directory

3. **Set Environment Variables**
   - In Vercel project settings, add:
   - `VITE_API_URL`: Your backend API URL

4. **Deploy**
   - Vercel will automatically deploy on push

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Upload to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect GitHub for automatic deployments

3. **Set Environment Variables**
   - In Netlify Site settings, add build environment variables
   - `VITE_API_URL`: Your backend API URL

4. **Configure redirects** (add `_redirects` file)
```
/* /index.html 200
```

### Deploy to Your Own Server

1. **Build for production**
```bash
npm run build
```

2. **Upload `dist` folder** to your server
3. **Configure web server** to serve `index.html` for all routes
4. **Update API URL** in environment variables

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint JavaScript files
npm run lint
```

### Key Technologies

- **React 18**: Modern UI library
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Lucide React**: Beautiful icons

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  primary: '#6366f1',      // Indigo
  secondary: '#ec4899',    // Pink
  accent: '#f59e0b',       // Amber
}
```

### Styling
- Global styles: `src/index.css`
- Component styles: Inline with Tailwind classes
- Custom effects: See `.glass-effect`, `.gradient-bg`, `.card-hover` in `index.css`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### CORS Issues
- Make sure backend API URL is correct in `.env.local`
- Enable CORS in your backend

### Blank Page
- Check browser console for errors
- Verify backend API is running
- Check that API URL in `.env.local` is correct

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)

## 📝 License

MIT License - Feel free to use this project for personal and commercial purposes.

## 💪 Support

Need help? Check the backend README or create an issue in the repository.

---

**Happy Expense Splitting! 💰✨**