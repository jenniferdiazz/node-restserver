const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res, next) =>{
    const token = req.header('x-token');
 
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        //leer el usuario que corresponde al uid

        const usuario = await Usuario.findById({_id : uid});
        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no existe'
            })
        }

        // verificar si el usuario tiene estado=true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario desactivado del sistema'
            })
        }

        req.usuario = usuario
        
        next()

    }catch(error){
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })

    }
  
}

module.exports = {
    validarJWT
}