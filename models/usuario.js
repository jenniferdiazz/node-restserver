const {Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});
//tiene que ser una funcion normal por el this haciendo referencia al a instancia creada
UsuarioSchema.methods.toJSON = function(){
    //genera la instancia con los valores respectivos
    //estoy sacando __v , password y lo demas se almacena en usuario
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);