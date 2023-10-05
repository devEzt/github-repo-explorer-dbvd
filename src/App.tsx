import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'

export function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/user/:username" element={<div>User Profile</div>} />
        <Route path="/user/:username/repo/:repo" element={<div>Repo Details</div>} />
      </Routes>
    </Router>
  )
}
