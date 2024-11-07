import { conmysql } from '../db.js';

// Obtener todos los detalles de pedidos
export const getDetalles = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos_detalle');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar detalles de pedidos" });
    }
};

// Obtener un detalle de pedido por ID
export const getDetalleById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            det_id: 0,
            message: "Detalle no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Insertar un nuevo detalle de pedido
export const postDetalle = async (req, res) => {
    try {
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES (?, ?, ?, ?)',
            [prod_id, ped_id, det_cantidad, det_precio]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar un detalle de pedido existente
export const putDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_id, ped_id, det_cantidad, det_precio } = req.body;
        const [result] = await conmysql.query(
            'UPDATE pedidos_detalle SET prod_id = ?, ped_id = ?, det_cantidad = ?, det_precio = ? WHERE det_id = ?',
            [prod_id, ped_id, det_cantidad, det_precio, id]
        );
        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Detalle no encontrado"
        });
        const [rows] = await conmysql.query('SELECT * FROM pedidos_detalle WHERE det_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Eliminar un detalle de pedido
export const deleteDetalle = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM pedidos_detalle WHERE det_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({
            id: 0,
            message: 'No se puede eliminar el detalle'
        });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
