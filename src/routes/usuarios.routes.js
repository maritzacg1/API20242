import { Router } from 'express';
import {
    getUsuarios,
    getUsuarioById,
    postUsuario,
    putUsuario,
    patchUsuario,
    deleteUsuario
} from '../controladores/usuariosCtrl.js';

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById); 
router.post('/usuarios', postUsuario);
router.put('/usuarios/:id', putUsuario);
router.patch('/usuarios/:id', patchUsuario);
router.delete('/usuarios/:id', deleteUsuario);

export default router;
