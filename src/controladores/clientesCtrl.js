import { conmysql } from '../db.js';

export const getClientes = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM clientes');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar clientes" });
    }
};

export const getclientesxid = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM clientes WHERE cli_id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            cli_id: 0,
            message: "Cliente no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const postCliente = async (req, res) => {
    try {
        const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body;

        const [rows] = await conmysql.query(
            'INSERT INTO clientes(cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad) VALUES(?,?,?,?,?,?,?)',
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad]
        );

        res.send({ id: rows.insertId });
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const putCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body;

        const [result] = await conmysql.query(
            'UPDATE clientes SET cli_identificacion = ?, cli_nombre = ?, cli_telefono = ?, cli_correo = ?, cli_direccion = ?, cli_pais = ?, cli_ciudad = ? WHERE cli_id = ?',
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Cliente no encontrado"
        });

        const [rows] = await conmysql.query('SELECT * FROM clientes WHERE cli_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const patchCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body;

        const [result] = await conmysql.query(
            'UPDATE clientes SET cli_identificacion = IFNULL(?, cli_identificacion), cli_nombre = IFNULL(?, cli_nombre), cli_telefono = IFNULL(?, cli_telefono), cli_correo = IFNULL(?, cli_correo), cli_direccion = IFNULL(?, cli_direccion), cli_pais = IFNULL(?, cli_pais), cli_ciudad = IFNULL(?, cli_ciudad) WHERE cli_id = ?',
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Cliente no encontrado"
        });

        const [rows] = await conmysql.query('SELECT * FROM clientes WHERE cli_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM clientes WHERE cli_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({
            id: 0,
            message: 'No se pudo eliminar al cliente'
        });
        res.sendStatus(202);
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({ message: "Error de lado del servidor" });
    }
};
