// services/expenses.service.js
import ExpenseModel from '../models/expense.js'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import StockItemModel from '../models/StockItemSchema.js'

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
  // Caso especial: Gasto diferido
  if (data.type === 'Gasto Diferidos') {
    const baseDate = dayjs(data.date || new Date())
    const totalAmount = Number(data.unitCost) * Number(data.quantity)
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

  // Caso normal: Gasto fijo o variable
  const newExpense = new ExpenseModel({
    type: data.type,
    description: data.description,
    unitCost: Number(data.unitCost),
    quantity: Number(data.quantity),
    amount: Number(data.unitCost) * Number(data.quantity),
    date: data.date || new Date(),
    affectsStock: data.affectsStock
  })

  const savedExpense = await newExpense.save()

  // Si afecta el inventario, registramos en stock
  if (data.affectsStock) {
    await StockItemModel.create({
      expenseRef: savedExpense._id,
      name: savedExpense.description,
      unitCost: savedExpense.unitCost,
      totalQuantity: savedExpense.quantity,
      usedQuantity: 0,
      availableQuantity: savedExpense.quantity,
    })
  }

  return savedExpense
}


export const deleteExpensesService = async (id) => {
  try {
    const expense = await ExpenseModel.findById(id)
    if (!expense) throw new Error('No encontrado')

    // Buscar si está en el inventario
    const stockItem = await StockItemModel.findOne({ expenseRef: id })

    if (stockItem) {
      if (stockItem.usedQuantity > 0) {
        // ❌ Bloquear la eliminación y lanzar error
        throw new Error('No se puede eliminar este gasto porque el insumo ya fue utilizado.')
      }

      // ✅ Eliminar el stock si no ha sido usado
      await StockItemModel.findByIdAndDelete(stockItem._id)
      console.log('Insumo eliminado del inventario ✅')
    }

    if (expense.groupId) {
      return await ExpenseModel.deleteMany({ groupId: expense.groupId })
    } else {
      return await ExpenseModel.findByIdAndDelete(id)
    }
  } catch (error) {
    console.error('Error al eliminar gasto o inventario:', error)
    throw error // <-- Propaga el error al controller
  }
}

export const updateExpenseService = async (id, data) => {
  const existingExpense = await ExpenseModel.findById(id)
  if (!existingExpense) throw new Error('Gasto no encontrado')

  const updatedExpense = await ExpenseModel.findByIdAndUpdate(id, data, { new: true })

  const stockExists = await StockItemModel.findOne({ expenseRef: id })

  // 🔁 Si antes tenía stock y ya no debe tener
  if (existingExpense.affectsStock && !data.affectsStock && stockExists) {
    await StockItemModel.deleteOne({ expenseRef: id })
  }

  // ✅ Si antes no tenía y ahora sí debe tener
  if (!existingExpense.affectsStock && data.affectsStock) {
    await StockItemModel.create({
      expenseRef: id,
      name: data.description,
      unitCost: data.unitCost,
      totalQuantity: data.quantity,
      usedQuantity: 0,
      availableQuantity: data.quantity,
    })
  }

  // 🔄 Si sigue siendo de stock, y el registro ya existía
  if (existingExpense.affectsStock && data.affectsStock && stockExists) {
    const difference = data.quantity - stockExists.totalQuantity
    const newUsed = stockExists.usedQuantity
    const newAvailable = data.quantity - newUsed

    await StockItemModel.updateOne(
      { expenseRef: id },
      {
        name: data.description,
        unitCost: data.unitCost,
        totalQuantity: data.quantity,
        availableQuantity: newAvailable < 0 ? 0 : newAvailable,
      }
    )
  }

  return updatedExpense
}

export const getStockItemsService = async () => {
  const stockItems = await StockItemModel.find()
    .populate('expenseRef', 'date type') // opcional: para ver info del gasto original
    .sort({ createdAt: -1 })

  return stockItems
}
