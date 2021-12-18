import React from "react";
import { useUser } from 'context/userContext';
import { Link } from 'react-router-dom';
import perfil from '../assets/login/perfil.png';

const Index = () => {
  const { userData } = useUser();

  return (
    <div className='flex flex-col h-full w-full items-center justify-cente bg-blue-50 p-40'>
      <img src={perfil} alt='Logo' className='items-center justify-center h-64' />
      <h1 className='text-3xl font-bold p-10'>{userData.nombre} {userData.apellido}   
        <Link to={`/editarPerfil/${userData._id}`}>
          <i className='fas fa-pen text-green-600 hover:text-green-400 cursor-pointer' />
        </Link>
      </h1>
      <div className='flex flex-1'>
          <ul className='font-bold pr-16'>
              <ol>Correo</ol>
              <ol>Rol</ol>
              <ol>Identificación</ol>                       
          </ul>
          <ul>
              <ol>{userData.correo}</ol>
              <ol>{userData.rol}</ol>
              <ol>{userData.identificacion}</ol>
          </ul>
      </div>
    </div>
  );
};

export default Index;