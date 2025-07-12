import { FinancialReport } from "../models/financialReports.model.js";

export const getAllFinancialReportService = async () => {

    const financialReport = await FinancialReport.find();
    return financialReport;
}

export const saveSettingsFinanceService = async (data) => {
    const { desiredMargin, projectedMonthlySales } = data;

    const financialReport = await FinancialReport.findOneAndUpdate(
        {},
        { desiredMargin, projectedMonthlySales },
        { new: true, upsert: true }
    )

    return financialReport;
}


export const getSettingsFinanceService = async () => {

    const financialReport = await FinancialReport.find();
    return financialReport;
}
