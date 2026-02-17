import React, { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ExpenseCard from "../components/ExpenseCard";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function Dashboard() {

  const [expenses, setExpenses] = useState([]);

  // ADD FORM
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  // EDIT MODAL
  const [editExpense, setEditExpense] = useState(null);

  // FILTERS
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // DEFAULT CATEGORIES
  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Other",
  ];

  const colors = [
    "#ff7a00",
    "#FFB347",
    "#FFCC80",
    "#FFD699",
    "#FFE0B3",
    "#FFA726",
    "#FB8C00",
    "#F57C00",
  ];

  // FETCH EXPENSES
  const fetchExpenses = useCallback(async () => {

    let url = "expenses/?";

    if (search) url += `search=${search}&`;
    if (category) url += `category=${category}&`;

    const res = await API.get(url);
    setExpenses(res.data);

  }, [search, category]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // ADD
  const addExpense = async (e) => {
    e.preventDefault();

    await API.post("expenses/", form);

    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
    });

    fetchExpenses();
  };

  // DELETE
  const deleteExpense = async (id) => {
    await API.delete(`expenses/${id}/`);
    fetchExpenses();
  };

  // EDIT
  const openEdit = (expense) => setEditExpense(expense);

  const saveEdit = async () => {
    await API.put(`expenses/${editExpense.id}/`, editExpense);
    setEditExpense(null);
    fetchExpenses();
  };

  // TOTAL
  const total = expenses.reduce(
    (sum, e) => sum + parseFloat(e.amount),
    0
  );

  // PIE CHART DATA
  const chartData = categories
    .map((cat) => ({
      name: cat,
      value: expenses
        .filter((e) => e.category === cat)
        .reduce((sum, e) => sum + parseFloat(e.amount), 0),
    }))
    .filter((item) => item.value > 0);

  return (
    <>
      <Navbar />

      <div className="container-fluid mt-4 px-4">
        <div className="row g-4">

          {/* ================= LEFT PANEL ================= */}
          <div className="col-lg-4">

            <div className="sticky-top" style={{ top: "90px" }}>

              {/* ADD EXPENSE */}
              <div className="card shadow-sm border-0 p-4 mb-4 dashboard-card">
                <h5 className="text-orange fw-bold mb-3">Add Expense</h5>

                <form onSubmit={addExpense}>
                  <input
                    className="form-control mb-3"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e)=>setForm({...form,title:e.target.value})}
                  />

                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e)=>setForm({...form,amount:e.target.value})}
                  />

                  <select
                    className="form-select mb-3"
                    value={form.category}
                    onChange={(e)=>setForm({...form,category:e.target.value})}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat,i)=>(
                      <option key={i}>{cat}</option>
                    ))}
                  </select>

                  <input
                    type="date"
                    className="form-control mb-3"
                    value={form.date}
                    onChange={(e)=>setForm({...form,date:e.target.value})}
                  />

                  <button className="btn btn-orange w-100">
                    Add Expense
                  </button>
                </form>
              </div>

              {/* FILTER CARD */}
              <div className="card shadow-sm border-0 p-4 mb-4 dashboard-card">
                <h5 className="text-orange fw-bold mb-3">Filters</h5>

                <input
                  className="form-control mb-3"
                  placeholder="Search title..."
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                />

                <select
                  className="form-select"
                  value={category}
                  onChange={(e)=>setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat,i)=>(
                    <option key={i}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* TOTAL CARD */}
              <div className="card shadow-sm border-0 p-4 dashboard-card">
                <h6>Total Spending</h6>
                <h2 className="text-orange fw-bold">₹{total}</h2>
              </div>

            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="col-lg-8">

            {/* ⭐ INTRO FEATURE CARD */}
            <div className="card shadow-sm border-0 p-4 mb-4 dashboard-card">
              <h4 className="text-orange fw-bold">
                👋 Welcome to Expense Tracker
              </h4>

              <p className="text-muted mb-3">
                Manage your daily expenses, analyze spending habits,
                and control your budget effectively.
              </p>

              <div className="row">
                <div className="col-md-6">
                  <ul>
                    <li>Add / Edit / Delete Expenses</li>
                    <li>Category Tracking</li>
                    <li>Smart Search & Filters</li>
                  </ul>
                </div>

                <div className="col-md-6">
                  <ul>
                    <li>Pie Chart Analytics</li>
                    <li>JWT Authentication</li>
                    <li>Responsive UI Design</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* PIE CHART */}
            <div className="card shadow-sm border-0 p-4 mb-4 dashboard-card">
              <h5 className="text-orange fw-bold mb-3">
                Expense Distribution
              </h5>

              {chartData.length === 0 ? (
                <p className="text-muted">No chart data</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((entry,index)=>(
                        <Cell
                          key={index}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* EXPENSE LIST */}
            {expenses.length === 0 ? (
              <div className="card p-5 text-center shadow-sm border-0">
                <h5>No expenses yet</h5>
              </div>
            ) : (
              expenses.map((expense)=>(
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onDelete={deleteExpense}
                  onEdit={openEdit}
                />
              ))
            )}

          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editExpense && (
        <div className="modal d-block" style={{background:"rgba(0,0,0,0.5)"}}>
          <div className="modal-dialog">
            <div className="modal-content p-4">

              <h5 className="mb-3">Edit Expense</h5>

              <input
                className="form-control mb-2"
                value={editExpense.title}
                onChange={(e)=>
                  setEditExpense({...editExpense,title:e.target.value})
                }
              />

              <input
                type="number"
                className="form-control mb-3"
                value={editExpense.amount}
                onChange={(e)=>
                  setEditExpense({...editExpense,amount:e.target.value})
                }
              />

              <button className="btn btn-orange me-2" onClick={saveEdit}>
                Save
              </button>

              <button
                className="btn btn-secondary"
                onClick={()=>setEditExpense(null)}
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Dashboard;
