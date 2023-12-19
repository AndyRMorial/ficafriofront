import React, { useState } from 'react';
import './Perfil.scss';
import InputPerfil from '../../util/InputPerfil/InputPerfil'

const Perfil = () => {
  const [conteudoAtivo, setConteudoAtivo] = useState(null);

  const mostrarConteudo = (id) => {
    setConteudoAtivo(id);
  };

  {/*Inputs Inicio*/}
  
  const [emailPerfil, setEmailPerfil] = useState('');
  const [usuarioPerfil, setUsuarioPerfil] = useState('')
  const [telefonePerfil, setTelefonePerfil] = useState('')
  const [nascimentoPerfil, setNascimentoPerfil] = useState('')

  {/*Inputs Fim*/}

  {/*Atualizar Nome de Usuario Inicio*/}

  const [nomeUsuario, setNomeUsuario] = useState('Usuário');

  const alterarUsuarioPerfil = () => {
    const alteracaoUsuario = 'Nome Alterado';
    setNomeUsuario(alteracaoUsuario);
  }

  {/*Atualizar Nome de Usuario Fim*/}

  {/*Atualizando Nova Senha Inicio*/}

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

  const handleChangeSenhaAtual = (event) => {
    setSenhaAtual(event.target.value);
  };

  const handleChangeNovaSenha = (event) => {
    setNovaSenha(event.target.value);
  };

  const handleChangeConfirmarNovaSenha = (event) => {
    setConfirmarNovaSenha(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (novaSenha === confirmarNovaSenha) {
      console.log('Senha alterada com sucesso!');

    } else {
      console.log('As senhas não coincidem, tente novamente.');
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

  {/*Atualizando Nova Senha Fim*/}


  return (

    <div
      style={{
        position: 'relative',
        background: 'white',
        border: '1px solid black',
        padding: '20rem',
        margin: '9rem',
        marginTop: '20px',
        borderRadius: '.5rem',
      }}
    >
        <div className='titulo_perfil' style={{ position: 'absolute', top: '.70rem', left: '1.5rem' }}>
          Olá {nomeUsuario}
        </div>

        <div className='botoes_perfil'>
          <button type='button' className={conteudoAtivo === 'informações' ? 'botao-ativo' : ''} onClick={() => mostrarConteudo('informações')}>
            Informações pessoais
          </button>
          <button type='button' className={conteudoAtivo === 'senha' ? 'botao-ativo' : ''} onClick={() => mostrarConteudo('senha')}>
            Senha
          </button>
          <button type='button' className={conteudoAtivo === 'atividade' ? 'botao-ativo' : ''} onClick={() => mostrarConteudo('atividade')}>
            Atividade
          </button>
          {/*
          <button type='button' className={conteudoAtivo === 'configuração' ? 'botao-ativo' : ''} onClick={() => mostrarConteudo('configuração')}>
            Configurações
          </button>
          */}
        </div>

        <hr className='linha_perfil'/>

        <div className='informacao_perfil'>

          {conteudoAtivo === 'informações' && (
            <>
              <h2>Nome de usuário</h2>
              <InputPerfil
                tipo='usuarioPerfil'
                valor={usuarioPerfil}
                onChange={(e) => {
                  setUsuarioPerfil(e.target.value);
                  setNomeUsuario(e.target.value);
                }}
                placeholder='Nome de usuário'
              />
            </>
          )}

          {conteudoAtivo === 'informações' && (
            <>
              <h2>Email Cadastrado</h2>
              <InputPerfil
                tipo='emailPerfil'
                valor={emailPerfil}
                onChange={(e) => setEmailPerfil(e.target.value)}
                placeholder='Email cadastrado'
              />
            </>
          )}

          {conteudoAtivo === 'informações' && (
            <>
              <h2>Número de telefone</h2>            
              <InputPerfil
                tipo='telefonePerfil'
                valor={telefonePerfil}
                onChange={(e) => setTelefonePerfil(e.target.value)}
                placeholder='Número de telefone'
              />
            </>
          )}

          {conteudoAtivo === 'informações' && (
            <>
              <h2>Data de Nascimento</h2>
              <InputPerfil
                tipo='nascimentoPerfil'
                valor={nascimentoPerfil}
                onChange={(e) => setNascimentoPerfil(e.target.value)}
                placeholder='Data de nascimento'
              />
            </>
          )}

        </div>
        
        <div className='senha_perfil'>
          <form onSubmit={handleSubmit}>
            {conteudoAtivo === 'senha' && (
              <>
                <h2>Confirma sua senha atual para trocá-la</h2>
                <InputPerfil
                  tipo='senhaPerfil'
                  valor={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)} // Alteração aqui
                  placeholder='Senha atual'
                />
              </>
            )}

            {conteudoAtivo === 'senha' && (
              <>
                <h2>Digite a nova senha</h2>
                <InputPerfil
                  tipo='novaSenhaPerfil'
                  valor={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)} // Alteração aqui
                  placeholder='Nova senha'
                />
              </>
            )}

            {conteudoAtivo === 'senha' && (
              <>
                <h2>Confirme a nova senha</h2>
                <InputPerfil
                  tipo='confirmarSenhaPerfil'
                  valor={confirmarNovaSenha}
                  onChange={(e) => setConfirmarNovaSenha(e.target.value)} // Alteração aqui
                  placeholder='Confirmar nova senha'
                />
                <button className='botaoTrocaSenha' onClick={handleClick} type="submit">Confirmar troca de senha</button>
              </>
            )}

          </form>
        </div>

        <div id='informações' className={`conteudo_perfil ${conteudoAtivo === 'informações' ? 'ativo' : ''}`}>
        </div>
        <div id='senha' className={`conteudo_perfil ${conteudoAtivo === 'senha' ? 'ativo' : ''}`}>
        </div>
        <div id='atividade' className={`conteudo_perfil ${conteudoAtivo === 'atividade' ? 'ativo' : ''}`}>
        </div>
        {/*<div id='configuração' className={`conteudo_perfil ${conteudoAtivo === 'configuração' ? 'ativo' : ''}`}>
        </div>*/}
        
    </div>
    );
};

export default Perfil;