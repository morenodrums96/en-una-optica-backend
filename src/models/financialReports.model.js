import mongoose from 'mongoose';

const financialReportSchema = new mongoose.Schema({
  desiredMargin: Number,
  projectedMonthlySales: Number,
  breakEvenSales: Number,
}, { timestamps: true });

export const FinancialReport = mongoose.model('FinancialReport', financialReportSchema);
