import React from 'react'
import './NotFound.scss'
import Ficafrioicone from '../../assets/Fria pergunta.png';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='fundo404'>
      <div className='errorFound'>
        <img className='img_notFound' src={Ficafrioicone} alt="error"/>
        <div className='text_notfound'>
          <h1 className='h1_notFound'><span className='span__notFound2'>404</span> OPS...</h1>
          <h2 className='h2_notFound'>Nós não encontramos essa página.</h2>
          <h3 className='h3_notFound'>Mas <Link to="/"><span className='span__notFound'>Fica Frio!</span></Link>  Acesse nossa página inicial e siga com a sua organização.</h3>
        </div>
      </div>
    </div>
  )
}

export default NotFound;