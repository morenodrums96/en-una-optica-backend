import { getAllFinancialReportService,saveSettingsFinanceService,getSettingsFinanceService } from '../services/financialReport.service.js';

export const getAllFinalcialReport = async (req, res) => {
    try {
        const financialReport = await getAllFinancialReportService();
        res.json(financialReport);
    } catch (error) {
        console.error('Error al obtener financialReport: ', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const saveSettingsFinance = async (req, res) => {
    try {
        const financialReport = await saveSettingsFinanceService(req.body);
        res.json(financialReport);
    } catch (error) {
        console.error('Error al guardar configuración financiera: ', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};


export const getSettingsFinance = async (req, res) => {
    try {
        const financialReport = await getSettingsFinanceService();
        res.json(financialReport);
    } catch (error) {
        console.error('Error al obtener financialReport: ', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
