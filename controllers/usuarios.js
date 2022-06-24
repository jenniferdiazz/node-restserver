const {response} = require('express');
const usuariosGet = ( req, res = response ) =>{
    res.json({
        msg: 'get api'
    })
}
const usuariosPut = ( req, res = response ) =>{

    res.json({
        msg: 'put api'
    })
}
const usuariosPost = ( req, res = response ) =>{

    res.json({
        msg: 'Post api',

    })
}
const usuariosPatch = ( req, res = response ) =>{
    res.json({
        msg: 'Pach api'
    })
}

const usuariosDelete = ( req, res = response ) =>{
    res.json({
        msg: 'delete api'
    })
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}