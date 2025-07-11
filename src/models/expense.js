import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['Gasto Indirecto', 'Costo Directo'],
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
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true, // crea createdAt y updatedAt automáticamente
    }
)


export default mongoose.model('Expense', ExpenseSchema)
