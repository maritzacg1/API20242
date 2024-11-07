import { Router } from "express";
import { getPedidos,
     getPedidoById, 
     postPedido, 
     putPedido, 
    } from '../controladores/pedidosCtrl.js';
const router = Router();

router.get('/pedidos', getPedidos); 
router.get('/pedidos/:id', getPedidoById); 
router.post('/pedidos', postPedido); 
router.put('/pedidos/:id', putPedido); 

export default router;
