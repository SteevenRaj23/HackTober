import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Layout from "./components/Layout";
import SendMoney from "./pages/SendMoney"; // if you have it

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* All pages that should have Navbar + Sidebar */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/transactions"
          element={
            <Layout>
              <Transactions />
            </Layout>
          }
        />
        <Route
          path="/send-money"
          element={
            <Layout>
              <SendMoney />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
