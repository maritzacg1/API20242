import { conmysql } from '../db.js';

export const getPedidos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar pedidos" });
    }
};

export const getPedidoById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            ped_id: 0,
            message: "Pedido no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const postPedido = async (req, res) => {
    try {
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO pedidos (cli_id, ped_fecha, usr_id, ped_estado) VALUES (?, ?, ?, ?)',
            [cli_id, ped_fecha, usr_id, ped_estado]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const putPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;
        const [result] = await conmysql.query(
            'UPDATE pedidos SET cli_id = ?, ped_fecha = ?, usr_id = ?, ped_estado = ? WHERE ped_id = ?',
            [cli_id, ped_fecha, usr_id, ped_estado, id]
        );
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Pedido no encontrado'
        });
        const [rows] = await conmysql.query('SELECT * FROM pedidos WHERE ped_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }

    
};
