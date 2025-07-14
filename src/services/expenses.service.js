// services/expenses.service.js
import ExpenseModel from '../models/expense.js'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

export const getExpensesService = async ({ month, year }) => {
  let filter = {}

  if (month && year) {
    const startDate = new Date(Number(year), Number(month) - 1, 1)
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59)

    filter.date = { $gte: startDate, $lte: endDate }
  }

  return await ExpenseModel.find(filter).sort({ date: -1 })
}


export const postExpensesService = async (data) => {
  if (data.type === 'Gasto Diferidos') {
    const baseDate = dayjs(data.date || new Date())
    const totalAmount = Number(data.unitCost) || 0
    const months = Number(data.months) || 1
    const amountPerMonth = parseFloat((totalAmount / months).toFixed(2))
    const groupId = uuidv4()

    const deferredExpenses = []

    for (let i = 0; i < months; i++) {
      deferredExpenses.push({
        type: 'Aplicación de gasto diferido',
        description: data.description,
        quantity: 1,
        unitCost: amountPerMonth,
        amount: amountPerMonth,
        date: baseDate.add(i, 'month').toDate(),
        groupId,
         monthIndex: i + 1
      })
    }

    return await ExpenseModel.insertMany(deferredExpenses)
  }

  const amount = Number(data.unitCost) * Number(data.quantity)
  const newExpense = new ExpenseModel({ ...data, amount })
  return await newExpense.save()
}


export const deleteExpensesService = async (id) => {
  try {
    const expense = await ExpenseModel.findById(id)
    if (!expense) return res.status(404).json({ message: 'No encontrado' })

    if (expense.groupId) {
      // Eliminar todos los del grupo
      return await ExpenseModel.deleteMany({ groupId: expense.groupId })
    } else {
      return await ExpenseModel.findByIdAndDelete(id)
    }
  } catch (error) {
    console.error('Error al eliminar gasto:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const updateExpenseService = async (id, data) => {
  return await ExpenseModel.findByIdAndUpdate(id, data, { new: true })
}
