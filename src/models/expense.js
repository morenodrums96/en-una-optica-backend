import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Gasto Fijo', 'Gasto Variable', 'Gasto Diferido', 'Aplicación de gasto diferido'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    unitCost: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    months: {
      type: Number,
      required: function () {
        return this.type === 'Gasto Diferido'
      },
    },
    amount: {
      type: Number,
      required: true,
    },
    groupId: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      required: true,
    },
    monthIndex: {
      type: Number,
      default: null,
    },
    affectsStock:{
        type:Boolean,
        default:false,
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Expense', ExpenseSchema)
