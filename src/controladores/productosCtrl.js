import { conmysql } from "../db.js";

export const getProductos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM productos');
        res.json(result);
    } catch (error) {
        return res.status(404).json({ message: "error consultar productos" });
    }
};

export const getproductosxid = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            cli_id: 0,
            message: "Producto no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'error del lado del servidor' });
    }
};

export const postProducto = async (req, res) => {
    try {
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;
        const prod_imagen = req.file ? `/uploads/${req.file.filename}` : null; // Captura la imagen si está disponible
        
        console.log("Archivo de imagen:", req.file); // Verificación del archivo

        const [rows] = await conmysql.query(
            'INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES (?, ?, ?, ?, ?, ?)',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen]
        );
        
        res.send({
            id: rows.insertId,
        });
    } catch (error) {
        console.error(error); // Para ver detalles de error en el servidor
        return res.status(500).json({ message: "error del lado del servidor" });
    }
};

export const putProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen } = req.body;
        const [result] = await conmysql.query(
            'UPDATE productos SET prod_codigo = ?, prod_nombre = ?, prod_stock = ?, prod_precio = ?, prod_activo = ?, prod_imagen = ? WHERE prod_id = ?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
        );
        if (result.affectedRows <= 0) return res.status(404).json({ message: "Producto no encontrado" });
        const [rows] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "error del lado del servidor" });
    }
};

export const patchProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen } = req.body;
        const [result] = await conmysql.query(
            'UPDATE productos SET prod_codigo = IFNULL(?, prod_codigo), prod_nombre = IFNULL(?, prod_nombre), prod_stock = IFNULL(?, prod_stock), prod_precio = IFNULL(?, prod_precio), prod_activo = IFNULL(?, prod_activo), prod_imagen = IFNULL(?, prod_imagen) WHERE prod_id = ?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
        );
        if (result.affectedRows <= 0) return res.status(404).json({ message: "cliente no encontrado" });
        const [rows] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "error del lado del servidor" });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM productos WHERE prod_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({
            id: 0,
            message: "No pudo eliminar el producto"
        });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({
            message: "Error del lado del servidor"
        });
    }
};
