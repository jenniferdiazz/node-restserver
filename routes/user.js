const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {validarCampos, validarJWT, esAdminRole, tieneRole }= require('../middlewares');
const router = Router();

router.get('/', usuariosGet);
router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    check('rol').custom( (rol) => esRoleValido(rol) ),
    validarCampos
], usuariosPut);

//middlewares []
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( (correo) => emailExiste(correo) ),
    //check('rol', 'No es rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //CUSTOM hace una v erificacion personalizada
    //recibe como argumento el vaor que estoy leyendo del body (rol)
    check('rol').custom( (rol) => esRoleValido(rol) ),
    validarCampos
], usuariosPost);
router.patch('/', usuariosPatch);
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    validarCampos
    ],
     usuariosDelete);


module.exports = router;