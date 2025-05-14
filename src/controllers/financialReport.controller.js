import { getAllFinancialReportService } from '../services/financialReport.service.js';

export const getAllFinalcialReport = async (req, res) => {
    try {
        const financialReport = await getAllFinancialReportService();
        res.json(financialReport);
    } catch (error) {
        console.error('Error al obtener financialReport: ', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

