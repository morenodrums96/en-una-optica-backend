import { catalogRegisterServices ,getGroupsServices} from '../services/catalog.service.js';


export const catalogRegister = async (req, res) => {
  try {
    const catalogRegis = req.body;
    await catalogRegisterServices(catalogRegis);
    res.status(201).json({ message: 'nuevo registro en el catalogo registrado correctamente' });
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

