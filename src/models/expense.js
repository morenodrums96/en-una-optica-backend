import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['Gasto Fijo', 'Gasto Variable', 'Gasto Diferidos', 'Aplicación de gasto diferido'],
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
                return this.type === 'Gasto Diferidos'
            },
        },
        amount: {
            type: Number,
            required: true,
        },
        groupId: {
            type: String,
            default: null,
        }
        ,
        date: {
            type: Date,
            required: true,
        },
        monthIndex: {
            type: Number,
            default: null,
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Expense', ExpenseSchema)
