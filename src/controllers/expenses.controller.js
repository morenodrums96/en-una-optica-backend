// controllers/expenses.controller.js
import {
  getExpensesService,
  postExpensesService,
  deleteExpensesService,
  updateExpenseService,
  getStockItemsService,
} from '../services/expenses.service.js'

export const getExpenses = async (req, res) => {
  try {
    const { month, year } = req.query

    const data = await getExpensesService({ month, year })
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
    res.status(400).json({ message: error.message || 'Error del servidor' })
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


export const getStockItems = async (req, res) => {
  try {
    const items = await getStockItemsService()
    res.status(200).json(items)
  } catch (error) {
    console.error('Error al obtener stock:', error)
    res.status(500).json({ message: 'Error al obtener inventario.' })
  }
}
