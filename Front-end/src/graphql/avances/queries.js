import { gql } from '@apollo/client';

const GET_AVANCES = gql`
query Query($project: String) {
  Avances(project: $project) {
    _id
    descripcion
    fecha
    observaciones
    proyecto {
      nombre
    }
   }
}
`;

export { GET_AVANCES };