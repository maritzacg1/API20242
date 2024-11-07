import { conmysql } from '../db.js';

export const getUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuarios');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar usuarios" });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            usr_id: 0,
            message: "Usuario no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const postUsuario = async (req, res) => {
    try {
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        const [rows] = await conmysql.query(
            'INSERT INTO usuarios(usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES(?,?,?,?,?,?)',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo]
        );

        res.send({ id: rows.insertId });
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const putUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        const [result] = await conmysql.query(
            'UPDATE usuarios SET usr_usuario = ?, usr_clave = ?, usr_nombre = ?, usr_telefono = ?, usr_correo = ?, usr_activo = ? WHERE usr_id = ?',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Usuario no encontrado"
        });

        const [rows] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const patchUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        const [result] = await conmysql.query(
            'UPDATE usuarios SET usr_usuario = IFNULL(?, usr_usuario), usr_clave = IFNULL(?, usr_clave), usr_nombre = IFNULL(?, usr_nombre), usr_telefono = IFNULL(?, usr_telefono), usr_correo = IFNULL(?, usr_correo), usr_activo = IFNULL(?, usr_activo) WHERE usr_id = ?',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Usuario no encontrado"
        });

        const [rows] = await conmysql.query('SELECT * FROM usuarios WHERE usr_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM usuarios WHERE usr_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({
            id: 0,
            message: 'No se pudo eliminar al usuario'
        });
        res.sendStatus(202);
    } catch (error) {
        console.error(error); // Log de error
        return res.status(500).json({ message: "Error de lado del servidor" });
    }
};
