import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { Card, Button, Form, InputGroup, } from 'react-bootstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/Logo.png';
import ModalSenha from '../../util/Modal/ModalSenha'
import "./Login.scss"
import { API_URL_LOGIN } from '../../Services/APIS/ApiService';



const Login = ({ }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()

 const onSubmit = async (data) => {
  console.log(data)
    axios.post( API_URL_LOGIN, data, {
      headers: {
        'Content-Type': "application/json"
      }
    }).then(response => {
      /* const data = response.data
      renderResults.textContent = JSON.stringify */
      console.log(response)
      navigate('/agenda')
    }).catch(error => {
      const message = error.response?.data?.message || 'Ocorreu um erro durante o login.';
      console.error(message, error);
    })

  };


  return (
    /* Fundo Inicio */
    <div className="fundo_login">
      <div className='circles'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* Fundo Fim */}

      <div className="text-center conteudo_login">
        <Card.Link as={Link} to="/" className='logo_login'>
          <img
            src={Logo}
            alt="Logo"
            width={100}
          />
        </Card.Link>
        <div className='tamanho_login'>



          <Card.Title className='text-center titulo_login'><p>Pronto para ficar frio?</p></Card.Title>

          <div className='digite_usuario'>
            <FontAwesomeIcon icon={faUser} className='icone_input_login' />
            <input
              className='input_login'
              type='text'
              placeholder='Digite seu Usuario'
              {...register("usuario", {
                required: 'Este campo é obrigatório.',
                minLength: {
                  value: 2,
                  message: 'O nome deve ter pelo menos 2 caracteres.'
                },
                maxLength: {
                  value: 100,
                  message: 'O nome é muito longo.'
                }
              })}
            />

          </div>
          {errors.usuario && <p className='mensagem_erro'>{errors.usuario.message}</p>}

          <div className='digite_senha'>
            <FontAwesomeIcon icon={faLock} className='icone_input_login' />
            <input
              className='input_senha'
              type="password"
              placeholder='Digite sua senha'
              {...register("senha", {
                required: 'Este campo é obrigatório.',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres.'
                }
              })}
            />

          </div>
          {errors.senha && <p className='mensagem_erro'>{errors.senha.message}</p>}

          <div className='botoes_login '>

            <Button className='continuar_login' type='submit' onClick={() => handleSubmit(onSubmit)()} >
              <p className='text-center conteudo_botao'> Continuar </p>
            </Button>

            <ModalSenha />



            <Card.Text className='naoPossuiConta'>
              Não possui conta?
              <Card.Link href='cadastro'>
                Clique aqui e faça seu cadastro.
              </Card.Link>
            </Card.Text>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Login