import { catalogRegisterServices ,getGroupsServices,updateCatalogEntryServices,updateCatalogActiveStatusService,getAllGroupsServices} from '../services/catalog.service.js';


export const catalogRegister = async (req, res) => {
  try {
    const catalogRegis = req.body;
    await catalogRegisterServices(catalogRegis);
    res.status(201).json({ message: 'Registro agregado con éxito.' });
  } catch (error) {
    console.log('Error en el catalogRegister:' + error.message);

    if (error.code === 409) {
      return res.status(409).json({ message: error.message });
    }

    res.status(500).json({ message: 'error en el servidor' });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = Array.isArray(req.query.group)
      ? req.query.group
      : [req.query.group];

    const result = await getGroupsServices(groups);

    // Agrupar por campo group
    const grouped = {};

    for (const item of result) {
      if (!grouped[item.group]) {
        grouped[item.group] = [];
      }
      grouped[item.group].push(item);
    }

    // Respuesta agrupada por tipo
    res.status(200).json({ catalogs: grouped });

  } catch (error) {
    console.error('Error getGroups :', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const updateCatalogEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;

    await updateCatalogEntryServices(id, label);

    res.status(200).json({ message: 'Registro actualizado con éxito' });
  } catch (error) {
    console.error('Error en updateCatalogEntry:', error.message);
    const status = error.code === 409 ? 409 : 500;
    res.status(status).json({ message: error.message || 'Error en el servidor' });
  }
};

export const updateCatalogActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    await updateCatalogActiveStatusService(id, active);

    res.status(200).json({
      message: `Registro ${active ? 'desactivado' : 'activado'} con éxito`
    });
  } catch (error) {
    console.error('Error en updateCatalogActiveStatus:', error.message);
    const status = error.code === 409 ? 409 : 500;
    res.status(status).json({
      message: error.message || 'Error en el servidor'
    });
  }
};


export const getAllGroups = async (req, res) => {
  try {
    const result = await getAllGroupsServices();
    res.status(200).json(result);

  } catch (error) {
    console.error('Error getGroups :', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};