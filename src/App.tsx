import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import UserPage from './Pages/UserPage'

export function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="/user/:username/repo/:repo" element={<div>Repo Details</div>} />
      </Routes>
    </Router>
  )
}
