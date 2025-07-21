import mongoose from 'mongoose'

const StockItemSchema = new mongoose.Schema(
  {
    expenseRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense', 
      required: true,
    },
    name: { type: String, required: true },
    unitCost: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    usedQuantity: { type: Number, default: 0 },
    availableQuantity: { type: Number, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('StockItem', StockItemSchema)
