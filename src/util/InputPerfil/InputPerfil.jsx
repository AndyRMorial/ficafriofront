import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';

const InputPerfil = ({ tipo, valor, onChange, placeholder }) => {

  return (
    <div className='input_perfil'>
      <InputGroup className="mb-3 inputs_perfil">

        <Form.Control
          controlId={`formBasic${tipo}`}
          placeholder={placeholder}
          aria-label={tipo}
          aria-describedby="inputGroup-sizing-lg"
          type={tipo === 'senha' ? 'password' : 'text'} 
          className={`input_${tipo}`}
          size='lg'
          border
          value={valor}
          onChange={onChange}
        />
        
      </InputGroup>
    </div>
  );
};

export default InputPerfil;