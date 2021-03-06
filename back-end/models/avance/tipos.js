import { gql } from 'apollo-server-express';

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creadoPor: Usuario!
  }
  type Query {
    Avances(project: String): [Avance]
    filtrarAvance(_id: String!): [Avance]
  }
  type Mutation {
    crearAvance(fecha: Date!, descripcion: String!, proyecto: String!, creadoPor: String!): Avance
  }
`;

export { tiposAvance };


// import { gql } from 'apollo-server-express';

// const tiposAvance = gql`
//   type Avance {
//     _id: ID!
//     fecha: Date!
//     descripcion: String!
//     observaciones: [String]
//     proyecto: Proyecto!
//     creadoPor: Usuario!
//   }

//   type Query {
//     Avances(project: String): [Avance]
//     filtrarAvance(_id: String!): [Avance]
//     avancesEstudiantes(creadoPor: String!): [Avance]
//   }
//   type Mutation {
//     crearAvance(fecha: Date!, descripcion: String!, proyecto: String!, creadoPor: String!): Avance
//     modificarAvance(
//       proyecto: String!
//     ) :Avance
//     actualizarAvance(
//       _id: String!,
//       campos: camposObjetivo!
//     ) :Avance

    
//   }
// `;

// export { tiposAvance };
