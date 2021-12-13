
import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fase
      objetivos {
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

const PROYECTO = gql`
  query Proyecto($id: String!) {
    Proyecto(_id: $id) {
      nombre
      presupuesto
      objetivos {
        descripcion
        tipo
      }
    }
  }
`;


export { PROYECTOS, PROYECTO };