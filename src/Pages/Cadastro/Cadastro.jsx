import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { Link, useNavigate, } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { API_URL_CADASTRO } from "../../Services/APIS/ApiService";
import './Cadastro.scss';
import axios from "axios";

const Cadastro = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [etapaCadastro, setEtapaCadastro] = useState(1);
  const [transitionClass, setTransitionClass] = useState('');
  const navigate = useNavigate()

  const watchPassword = watch("senha");

  const onSubmit = async (data) => {

    console.log(data)
    axios.post(API_URL_CADASTRO, data, {
      headers: {
        'Content-Type': "application/json"
      }
    }).then(response => {
      console.log(response)
      navigate('/agenda')
    }).catch(error => {
      const message = error.response?.data?.message || 'Ocorreu um erro durante o login.';
      console.error(message, error);
    })

    if (etapaCadastro === 3) {
      // Se etapaCadastro for 3, envie o formulário
      try {
        await handleSubmit(() => { })();
        console.log("Dados enviados!");
        setTransitionClass('fade-out');
        setTimeout(() => {
          setEtapaCadastro(etapaCadastro + 1);
          setTransitionClass('fade-in');
        }, 500);
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
      }
    }
  };

  const renderizarBotao = () => {
    switch (etapaCadastro) {
      case 1:
      case 2:
        return (
          <button className='continuar_cadastro' onClick={avancarEtapa}>
            <strong>Continuar</strong>
          </button>
        );
      case 3:
        return (
          <button className='botao_etapa4' type="submit" onClick={() => handleSubmit(onSubmit)()}>
            <strong>Continuar</strong>
          </button>
        );
      case 4:
        return (
          <>
            <div className='botoes_etapa4'>
              <Link className='botao_etapa4' to='/agenda'>
                <strong>Iniciar Jornada</strong>
              </Link>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const avancarEtapa = () => {
    if (etapaCadastro < 4) {
      setTransitionClass('fade-out');
      setTimeout(() => {
        setEtapaCadastro(etapaCadastro + 1);
        setTransitionClass('fade-in');
      }, 500);
    }
  };

  return (
    <div className="fundo_cadastro">
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
      <div className='text-center conteudo_cadastro'>
        <div href="/" className='logo_cadastro'>
          <img
            src={Logo}
            alt="Logo"
            width={100}
          />
        </div>
        {etapaCadastro === 1 && (
          <>
            <div className='titulo_cadastro'><strong>Olá! Seja bem-vindo(a) ao Fica Frio.</strong></div>
            <div className='texto_fria_cadastro'>
              Meu nome é Fri.ia, sou a sua companheira que vai resfriar o seu uso nesse site.
            </div>
          </>
        )}
        {/* //fim etapa 1 */}
        {etapaCadastro === 2 && (
          <>

            <div className='titulo_cadastro_titulo2'><strong>Ótimo! Agora nos informe o seu Email e o Usuário de sua escolha.</strong></div>
            <div className="mb-3 inputs_cadastro">
              <div id="inputGroup-sizing-lg" className='icone_input_email' >
                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#41748D', margin: '5px', height: '25px' }} />
              </div>
              <input
                className='input_email_cadastro'
                type="email"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="inputGroup-sizing-lg"
                {...register("email", {
                  required: true,
                  validate: (value) => isEmail(value),
                })}
              />
              {errors?.email?.type === "required" && (
                <p className='mensagem_erro'>Email é obrigatório.</p>
              )}
              {/*  {errors.usuario && <p className='mensagem_erro'>{errors.usuario.message}</p>} */}

              {errors?.email?.type === "validate" && (
                <p className='mensagem_erro'>Email é invalido.</p>
              )}
            </div>
            {/* //fim input email */}

            <div className="mb-3 inputs_cadastro">
              <div id="inputGroup-sizing-lg" className='icone_input_usuario' >
                <FontAwesomeIcon icon={faUser} style={{ color: '#41748D', margin: '5px', height: '25px' }} />
              </div>
              <input
                className='input_usuario_cadastro'
                placeholder="Usuário"
                aria-label="Usuário"
                type='text'
                aria-describedby="inputGroup-sizing-lg"
                {...register("usuario", {
                  required: true,
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
              {errors?.name?.type === "required" && (
                <p className='mensagem_erro'>Usuário é obrigatório.</p>
              )}
            </div>
          </>
        )}
        {/* // fim etapa 2 */}
        {etapaCadastro === 3 && (
          <>
            <div className='titulo_cadastro_titulo2'><strong>Perfeito, agora digite uma senha e a confirme-a para podermos organizar o seu dia!</strong></div>

            <div className="mb-3 inputs_cadastro">
              <div id="inputGroup-sizing-lg" className='icone_input_senha' >
                <FontAwesomeIcon icon={faLock} style={{ color: '#41748D', margin: '5px', height: '25px' }} />
              </div>
              <input
                className='input_senha_cadastro'
                placeholder="Senha"
                aria-label="Senha"
                aria-describedby="inputGroup-sizing-lg"
                type='password'
                {...register("senha", { required: true, minLength: 6 })}
              />

              {errors?.password?.type === "required" && (
                <p className='mensagem_erro'>Senha é obrigatória.</p>
              )}

              {errors?.password?.type === "minLength" && (
                <p className='mensagem_erro'>
                  Sua senha deve ter pelo menos 6 caracteres.
                </p>
              )}
            </div>
            {/* // fim do input senha */}

            <div className="mb-3 inputs_cadastro">
              <div id="inputGroup-sizing-lg-cSenha" className='icone_input_confirmar_senha' >
                <FontAwesomeIcon icon={faLock} style={{ color: '#41748D', margin: '5px', height: '25px' }} />
              </div>
              <input
                className='input_senha_confimar_cadastro'
                placeholder="Confirmar senha"
                aria-label="Confirmar senha"
                aria-describedby="inputGroup-sizing-lg"
                type='password'
                {...register("confirmarSenha", {
                  required: true,
                  validate: (value) => value === watchPassword,
                })}
              />
              {errors?.passwordConfirmation?.type === "required" && (
                <p className='mensagem_erro'>Confirmar senha é obrigatório.</p>
              )}

              {errors?.passwordConfirmation?.type === "validate" && (
                <p className='mensagem_erro'>As senhas não são iguais.</p>
              )}
            </div>
          </>
        )}
        {/* //fim etapa 3 */}
        {etapaCadastro === 4 && (
          <>
            <div className='titulo_cadastro_titulo2'><strong>Perfeito, sua conta foi criada! Gostaria de ver o tutorial e conhecer sua agenda?</strong></div>
          </>
        )}
        {/* //fim etapa 4*/}

        {renderizarBotao()}
        {/* // botão avancar Etapa */}

        <div className='ja_tem_uma_conta_cadastro'>
          Já tem uma conta? -
          <Link to="/login">
            Clique aqui e faça o login.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;