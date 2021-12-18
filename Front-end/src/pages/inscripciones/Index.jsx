import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';
//import {InsContext, useInsc } from '../../context/insContext';

const IndexInscripciones = () => {
  const { data, loading, refetch } = useQuery(GET_INSCRIPCIONES);

  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) return <div>Loading...</div>;
  return (
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div className='p-10'>
        <div>Pagina de inscripciones</div>
        <div className='my-4'>
          <AccordionInscripcion
            titulo='Inscripciones aprobadas'
            data={data.Inscripciones.filter((el) => el.estado === 'ACEPTADO')}
          />
          <AccordionInscripcion
            titulo='Inscripciones pendientes'
            data={data.Inscripciones.filter((el) => el.estado === 'PENDIENTE')}
            refetch={refetch}
          />
          <AccordionInscripcion
            titulo='Inscripciones rechazadas'
            data={data.Inscripciones.filter((el) => el.estado === 'RECHAZADO')}
            refetch={refetch}
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => {
  return (
    <AccordionStyled>
      <AccordionSummaryStyled>
        {titulo} ({data.length})
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className='flex'>
          {data &&
            data.map((inscripcion) => {
              return <Inscripcion inscripcion={inscripcion} refetch={refetch} />;
            })}
        </div>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};

const Inscripcion = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, { data, loading, error }] = useMutation(APROBAR_INSCRIPCION);
  const [rechazarInscripcion, { dataRechazar, loadingRechazar, errorRechazar }] = useMutation(RECHAZAR_INSCRIPCION);
  
  useEffect(() => {
    if (data) {
      toast.success('Inscripcion aprobada con exito');
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error aprobando la inscripcion');
    }
  }, [error]);

  useEffect(() => {
    if (dataRechazar) {
      toast.success('Inscripcion rechazando con exito');
      refetch();
    }
  }, [dataRechazar]);

  useEffect(() => {
    if (errorRechazar) {
      toast.error('Error rechazando la inscripcion');
    }
  }, [errorRechazar]);

  const cambiarEstadoInscripcion = () => {
    aprobarInscripcion({
      variables: {
        aprobarInscripcionId: inscripcion._id,
      },
    });
  };
  
  const cambiarEstadoInscripcionR = () => {
    rechazarInscripcion({
      variables: {
        rechazarInscripcionId: inscripcion._id,
      },
    });
  };
  

  return (
    <div className='bg-gray-900 text-gray-50 flex flex-col p-6 m-2 rounded-lg shadow-xl'>
      <span>{inscripcion.proyecto.nombre}</span>
      <span>{inscripcion.estudiante.nombre}</span>
      <span>{inscripcion.estado}</span>
      {inscripcion.estado === 'PENDIENTE' && (
        <>
          <ButtonLoading
            onClick={() => {
              cambiarEstadoInscripcion();
            }}
            text='Aprobar Inscripcion'
            loading={loading}
            disabled={false}
          />
          <ButtonLoading
            onClick={() => {
              cambiarEstadoInscripcionR();
            }}
            text='Rechazar Inscripcion'
            loading={loadingRechazar}
            disabled={false}
          />
        </>
      )}
    </div>
  );
};

export default IndexInscripciones;

// <InsContext.Provider value = {{data, refetch}}>

// </InsContext.Provider>

// const {refetch} = useInsc();
