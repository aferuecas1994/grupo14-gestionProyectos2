import { UserModel } from './usuario.js';
import bcrypt from 'bcrypt';
import { InscriptionModel } from '../inscripcion/inscripcion.js';

const resolversUsuario = {
  // Usuario: {
  //   inscripciones: async (parent, args, context) => {
  //     return InscriptionModel.find({ estudiante: parent._id });
  //   },
  // },

  Query: {
    Usuarios: async (parent, args, context) => {
      const usuarios = await UserModel.find().populate([
        {
          path: 'inscripciones',
          populate: {
            path: 'proyecto',
            populate: [{ path: 'lider' }, { path: 'avances' }],
          },
        },
        {
          path: 'proyectosLiderados',
        },
      ]);
      return usuarios;
    },

    // Query: { ANIDADO, SIN USAR POPULATE Y QUE FILTRE LO QUE SE LE PASE EN LOS ARGUMENTOS, QUEDA GENÉRICO EL FILTRO
    //   Usuarios: async (parent, args, context) => {
    //     console.log(args);
    //     const usuarios = await UserModel.find({ ...args.filtro });
    //     return usuarios;
    //   },

    UsuarioInfo: async(parent, args, context) => { //Nuevo. 26 de noviembre HU_03
      const usuarioInfo = await UserModel.find();
      if (args.rol==="ADMINISTRADOR") {   
        return usuarioInfo;   
      }
      else {
        return null;
      }
    },






    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id });
      return usuario;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },


    editarUsuario: async (parent, args) => { //HU_05
      const usuarioEditado = await UserModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          estado: args.estado,
        },
        { new: true }
      );

      if (args.rol==="ADMINISTRADOR") {   
        return usuarioEditado;;   
      }
      else {
        return null;
      }
      
    },
    
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };