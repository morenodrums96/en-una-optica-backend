// controllers/expenses.controller.js
import {
  getexpensestService,
  postExpensesService,
  deleteExpensesService,
  updateExpenseService,
} from '../services/expenses.service.js'

export const getExpenses = async (req, res) => {
  try {
    const data = await getexpensestService()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error al obtener Expenses : ', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const postExpenses = async (req, res) => {
  try {
    const newExpense = await postExpensesService(req.body)
    res.status(201).json(newExpense)
  } catch (error) {
    console.error('Error en el post Expenses : ', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

export const deleteExpenses = async (req, res) => {
  try {
    await deleteExpensesService(req.params.id)
    res.status(200).json({ message: 'Gasto eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar Expenses : ', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
export const updateExpense = async (req, res) => {
  try {
    const updated = await updateExpenseService(req.params.id, req.body)
    res.status(200).json(updated)
  } catch (error) {
    console.error('Error al editar Expenses:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}
