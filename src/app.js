import express from "express";
import cors from 'cors';//importa los paquetes cors---permiso de acceso
import path from 'path';
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken"; // Cambiado a ES Modules
import clientesRoutes from './routes/clientes.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import productosRoutes from './routes/productos.routes.js';
import pedidosRoutes from './routes/pedidos.routes.js';
import pedidosDetalleRoutes from './routes/pedidosDet.routes.js';

//definir modulo de ES
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const app = express();
const corsOptions={
    origin:'*',//direccion del dominio del servidor
    methods:['GET','POST','PUT','PATCH','DELETE'], 
    credentials:true
}

app.use(cors(corsOptions));
app.use(express.json()); // Para interpretar los objetos JSON
app.use(express.urlencoded({extended:true}));//se añade para receptar el formulario 

app.use('/uploads', express.static(path.join(__dirname,'../uploads')));
// Rutas
app.use('/api', clientesRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', productosRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', pedidosDetalleRoutes);

app.get("/api", (req, res) => {
    res.json({
        mensaje: "Nodejs and JWT"
    });
});

app.get("/api/login", (req, res) => {
    const user = {
        id: 1,
        nombre: "Maritza",
        email: "kchalen14@gmail.com"
    };

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.json({
                mensaje: "Post fue creado",
                authData: authData
            });
        }
    });
});

// Autenticación: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken; // Agregamos el token al request
        next(); // Continuar con el middleware
    } else {
        res.sendStatus(403);
    }
}

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(400).json({
        message: 'Página no encontrada'
    });
});

// Iniciar servidor
app.listen(3001, function(){
    console.log("Node.js app running on port 3001...");
});

export default app;
