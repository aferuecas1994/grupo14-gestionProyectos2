import { gql } from '@apollo/client';

// const GET_USUARIOS = gql`
//   query Query($filtro: FiltroUsuarios) { CON ESTE QUERY REEMPLAZARÍA EL DE LA LÍNEA 18, AGREGANDO EL FILTRO CREADO EN EL BACK
//     Usuarios(filtro: $filtro) {
//       _id
//       nombre
//       apellido
//       correo
//       estado
//       identificacion
//       rol
//     }
//   }
// `;

const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
