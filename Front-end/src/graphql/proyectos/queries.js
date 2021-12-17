import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fase
      objetivos {
        _id
        descripcion
        tipo
      }
      lider {
        _id
        correo
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
      
    }
  }
`;

const GET_PROYECTO = gql`
  query Proyecto($id: String!) {
    Proyecto(_id: $id) {
      nombre
      presupuesto
      objetivos {
        _id
        descripcion
        tipo
      }
    }
  }
`;


export { PROYECTOS, GET_PROYECTO };
