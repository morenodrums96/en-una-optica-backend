// services/expenses.service.js
import ExpenseModel from '../models/expense.js'

export const getexpensestService = async () => {
  return await ExpenseModel.find().sort({ date: -1 })
}

export const postExpensesService = async (data) => {
  const newExpense = new ExpenseModel(data)
  return await newExpense.save()
}

export const deleteExpensesService = async (id) => {
  return await ExpenseModel.findByIdAndDelete(id)
}

export const updateExpenseService = async (id, data) => {
  return await ExpenseModel.findByIdAndUpdate(id, data, { new: true })
}
