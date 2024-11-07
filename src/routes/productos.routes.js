import { Router } from "express";
import multer from "multer";
import {
    getProductos, 
    getproductosxid,
    postProducto,
    putProducto,
    patchProducto,
    deleteProducto
} from '../controladores/productosCtrl.js';

// Configuración de multer para almacenar las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => { // Corregido 'distination' a 'destination'
        cb(null, 'uploads'); // carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Corregido 'orginalmente' a 'originalname'
    }
});

const upload = multer({ storage });
const router = Router();

// Definición de rutas
router.get('/productos', getProductos); // select
router.get('/productos/:id', getproductosxid); // select x id
router.post('/productos', upload.single('image'), postProducto); // insert
router.put('/productos/:id', putProducto); // update
router.patch('/productos/:id', patchProducto); // update parcial
router.delete('/productos/:id', deleteProducto); // delete

export default router;
