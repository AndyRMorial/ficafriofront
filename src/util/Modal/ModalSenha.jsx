import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import axios from 'axios';
import "./ModalSenha.scss"

const ModalSenha = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset(); // Limpa os campos do formulário ao fechar o modal
  };

  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {

    try{

       await axios.put ( `${API_URL_UPDATE}/1`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    // Feche o modal
    handleClose();
    reset(); // Limpa os campos do formulário ao fechar o modal

    } catch (error){
      console.error('Erro ao enviar dados:', error);
    }

  }

  return (
   
    <>

      <Button className='esqueceuSenha' variant="primary" onClick={handleShow}>
        <strong>Esqueceu sua senha?</strong>
      </Button>

      <Modal className='modal_login' show={show} onHide={handleClose}>
        <Modal.Header closeButton className='recuperacaoFundo1'>
          <Modal.Title className='tituloRecuperacaoSenha'>Recuperação de senha</Modal.Title>
        </Modal.Header >
        <Modal.Body className='recuperacaoFundo2'>
            <div className="confirmarEmailRecuperacao">
              <label>Confirme seu usuário</label>
              <input
                //className={errors?.name && "input-error"}
                placeholder="digite seu usuário aqui"
                aria-label="Usuário"
                type='text'
                
                {...register("usuario", { required: true,  autoFocus: true, 
                  minLength: {
                    value: 2,
                    message: 'O nome deve ter pelo menos 2 caracteres.'
                  },
                  maxLength: {
                    value: 100,
                    message: 'O nome é muito longo.'
                  }})}
              />
            </div>
            <div className="confirmarEmailRecuperacao">
            <label>Digite sua nova senha</label>
            <input
                //className={errors?.password && "input-error"}
                placeholder="nova senha aqui"
                aria-label="Senha"
                type='password'
                {...register("senha", { required: true, minLength: 6 })}
              />

              {errors?.password?.type === "required" && (
                <p className="error-message">Senha é obrigatória.</p>
              )}

              {errors?.password?.type === "minLength" && (
                <p className="error-message">
                  Sua senha deve ter pelo menos 6 caracteres.
                </p>
              )}
            </div>
            <div
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
            </div>
        </Modal.Body>
        <Modal.Footer className='recuperacaoFundo3'>
          <Button className='botaoRecuperarCancelar' variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className='botaoRecuperarConfirmar' variant="primary" type="submit" onClick={() => handleSubmit(onSubmit)()}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSenha;