import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom'
import { AuthProvider, AuthContext } from './Context/AuthContext';
import Nave from './Components/Navbar/Nave';
import Rodape from './Components/Rodape/Rodape';
import 'bootstrap/dist/css/bootstrap.min.css';// Ativa a estilização do bootstrap(PF N APAGUE);
import './App.scss'

function App() {
  return (
    <AuthProvider>
      <SectionWithId />
    </AuthProvider>
  );
}


function SectionWithId() {
  const { currentSectionId } = useContext(AuthContext);
  
  return (
    <>
      <section id={currentSectionId}>
        <Nave />
        <Outlet />
        <Rodape />
      </section>
    </>
  );
}

export default App;