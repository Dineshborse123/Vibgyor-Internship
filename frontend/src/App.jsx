import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import ProductsPage from './pages/ProductsPage';
import CategoryDashboard from './CategoryDashboard';

function DummyPage({ title }) {
  return (
    <div className="top-bar">
      <div className="welcome-text">
        <h1>{title}</h1>
        <p>This module is under development.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Secured Routes */}
        <Route element={<Layout role="ADMIN" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoryDashboard />} />
          <Route path="/leave-requests" element={<DummyPage title="HR Leave Requests" />} />
          <Route path="/manage-products" element={<DummyPage title="Manage & Create Products" />} />
        </Route>

        {/* Customer Secured Routes */}
        <Route element={<Layout role="CUSTOMER" />}>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<DummyPage title="Active Cart" />} />
          <Route path="/orders" element={<DummyPage title="My Orders" />} />
        </Route>
        
        {/* Wildcard Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
