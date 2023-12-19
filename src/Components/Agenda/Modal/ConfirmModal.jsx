import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import parse from 'html-react-parser'
import { MODAL_ACTION_CLOSE , MODAL_ACTION_CONFIRM } from '../../../util/constant';

const ConfirmModal = (props) => {

    const {titulo, conteudo, show, onAction} = props;



  return (
    <>
      <Modal show={show} onHide={() => onAction(MODAL_ACTION_CLOSE)} backdrop={'static'}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{parse(conteudo)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;