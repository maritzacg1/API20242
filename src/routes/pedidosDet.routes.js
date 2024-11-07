import { Router } from "express";
import { 
     getDetalles,
     getDetalleById,
     postDetalle, 
     putDetalle, 
     deleteDetalle 
    } from '../controladores/pedidosDetCtrl.js';
const router = Router();

// Rutas para pedidos_detalle
router.get('/pedidos_detalle', getDetalles); 
router.get('/pedidos_detalle/:id', getDetalleById); 
router.post('/pedidos_detalle', postDetalle); // Insertar 
router.put('/pedidos_detalle/:id', putDetalle); // Actualizar 
router.delete('/pedidos_detalle/:id', deleteDetalle); // Eliminar 
export default router;
