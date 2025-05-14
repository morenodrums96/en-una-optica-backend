import { FinancialReport } from "../models/financialReports.model.js";

export const getAllFinancialReportService = async () => {

    const financialReport = await FinancialReport.find();
    return financialReport;
}