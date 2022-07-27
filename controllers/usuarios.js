const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const usuariosGet = async( req, res = response ) =>{
    
    const { limite = 5, desde=0 } = req.query;
    // const usuarios = await Usuario.find({ estado: true })
    //                 .skip(Number(desde))
    //                 .limit(Number(limite));

    // const total = await Usuario.countDocuments({ estado: true });
    

    //promise.all ejecutara ambas promesas de forma simultanea
    //pero si una da error, todas daran error
    //se guardan en una desestructuracion de arreglos
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
                    .skip(Number(desde))
                    .limit(Number(limite))


    ])
    
    res.json({
        total,
        usuarios
    })
}
const usuariosPut = async( req, res = response ) =>{
    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    //  TODO validar contra base de datos
    if(password){
        //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario)
}
const usuariosPost = async( req, res = response ) =>{


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol });
   


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt)

    //para guardar en la bse de datos
    await usuario.save();
    res.json({
        msg: 'Post api',
        usuario 

    })
}
const usuariosPatch = ( req, res = response ) =>{
    res.json({
        msg: 'Pach api'
    })
}

const usuariosDelete = async( req, res = response ) =>{
    const { id } = req.params;

    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuario
    res.json({
        usuario, usuarioAutenticado
    })
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}