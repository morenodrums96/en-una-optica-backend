import mongoose from "mongoose";

const financialReportSchema = new mongoose.Schema({
  month: {
    type: Date,
    required: true
  },
  totalInvestment: {
    type: Number,
    required: true,
    min: 0
  },
  totalSales: {
    type: Number,
    required: true,
    min: 0
  },
  netProfit: {
    type: Number,
    required: true,
    min: 0
  },
  profitMargin: {
    type: Number,
    required: true,
    min: 0
  },
  expenses: {
    marketing: {
      type: Number,
      default: 0,
      min: 0
    },
    salaries: {
      type: Number,
      default: 0,
      min: 0
    },
    servers: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  salesByProduct: [
    {
      productId: {
        type: String,
        required: true,
        trim: true
      },
      quantitySold: {
        type: Number,
        required: true,
        min: 0
      },
      revenue: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ]
}, {
  timestamps: true
});

export const FinancialReport = mongoose.model('FinancialReport', financialReportSchema);
