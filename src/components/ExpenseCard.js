import React from "react";
import { motion } from "framer-motion";

function ExpenseCard({ expense, onDelete, onEdit }) {

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card shadow-sm mb-3 expense-card"
    >
      <div className="card-body d-flex justify-content-between align-items-center">

        <div>
          <h5>{expense.title}</h5>
          <p className="text-muted mb-1">{expense.category}</p>
          <small>{expense.date}</small>
        </div>

        <div className="text-end">
          <h5 className="text-orange">₹{expense.amount}</h5>

          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => onEdit(expense)}
          >
            <i className="bi bi-pencil"></i>
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(expense.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>

      </div>
    </motion.div>
  );
}

export default ExpenseCard;
