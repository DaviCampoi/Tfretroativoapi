import { Pessoa } from '../Model/Pessoa.js';
import { Telefone } from '../Model/Telefone.js';

export async function listPessoas(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const orderBy = req.query.orderBy || 'id,asc';

    const [field, direction] = orderBy.split(',');

    const validFields = ['id', 'created_at', 'updated_at'];
    const validDirections = ['asc', 'desc'];

    const sortField = validFields.includes(field) ? field : 'id';
    const sortDirection = validDirections.includes(direction?.toLowerCase()) ? direction.toUpperCase() : 'ASC';

    const pessoas = await Pessoa.findAll({
      include: [{
        model: Telefone,
        as: 'telefones'
      }],
      limit,
      offset,
      order: [[sortField, sortDirection]]
    });

    return res.json(pessoas);
  } catch (error) {
    console.error('Erro ao listar pessoas:', error);
    return res.status(500).json({ error: 'Erro ao listar pessoas' });
  }
}