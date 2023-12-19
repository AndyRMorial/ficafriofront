import React, { useEffect, useState, useRef } from 'react'
import { mapOrdem } from '../../../util/sorts';

import { Container, Draggable } from "react-smooth-dnd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../../util/constant';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import ConfirmModal from '../Modal/ConfirmModal';
import Card from '../TaskCard/Card'
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import './Coluna.scss'
import CalendarioComp from '../../CalendarioComp/CalendarioComp';



const Coluna = (props) => {
    const { coluna, onCardDrop, onUpdateColuna } = props;
    const cards = mapOrdem(coluna.cards, coluna.cardOrder, 'id');
    const [isFirstClick, setIsFirstClick] = useState(true)
    const [isShowModelDelete, setShowModalDelete] = useState(false);
    const [tituloColuna, setTituloColuna] = useState('');
    const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);
    const [valueTextArea, setValueTextArea] = useState('')
    const textAreaRef = useRef(null);
    const inputRef = useRef(null)

    const handleUpdateCard = (updatedCard) => {
        const updatedCards = coluna.cards.map((c) => {
            if (c.id === updatedCard.id) {
                return updatedCard;
            }
            return c;
        });

        let updatedColuna = { ...coluna, cards: updatedCards };

        if (updatedCard.checked) {
            const filteredCards = updatedColuna.cards.filter((c) => !c.checked);
            updatedColuna = { ...updatedColuna, cards: filteredCards };
        }

        onUpdateColuna(updatedColuna);
    };

    const cardEvents = cards.map((card) => {
        const start = card.start ? new Date(card.start) : null;
        const end = card.end ? new Date(card.end) : null;

        return {
            id: card.id,
            title: card.title,
            start, // Convertendo para objeto Date
            end, // Convertendo para objeto Date
        };
    });


    useEffect(() => {
        if (isShowAddNewCard === true && textAreaRef && textAreaRef.current) {
            textAreaRef.current.focus()
        }
    }, [isShowAddNewCard])


    useEffect(() => {
        if (coluna && coluna.titulo) {
            setTituloColuna(coluna.titulo)
        }
    }, [coluna.titulo])

    const toggleModal = () => {
        setShowModalDelete(!isShowModelDelete)
    }

    const onModalAction = (type) => {
        if (type === MODAL_ACTION_CLOSE) {

        } if (type === MODAL_ACTION_CONFIRM) {

            const novaColuna = {
                ...coluna,
                _destroy: true
            }
            onUpdateColuna(novaColuna)
        }

        toggleModal()
    }

    const selectAllText = (event) => {
        setIsFirstClick(false)
        if (isFirstClick) {
            event.target.select();
        }
        event.target.focus();


    }

    const handleClickOutside = () => {
        setIsFirstClick(true)
    }

    const handleAddNewCard = () => {
        if (!valueTextArea) {
            textAreaRef.current.focus();
            return;
        }

        const novoCard = {
            id: uuidv4(),
            quadroId: coluna.quadroId,
            colunaId: coluna.id,
            title: valueTextArea,
            image: null
        }

        let novaColuna = { ...coluna };
        novaColuna.cards = [...novaColuna.cards, novoCard];
        novaColuna.cardOrder = novaColuna.cards.map(card => card.id);

        onUpdateColuna(novaColuna);
        setValueTextArea('');
        setIsShowAddNewCard(false);


    }
    return (
        <>
            <div className='column' >
                <header className='header_agenda column-drag-handle'>
                    <div className='coluna_titulo'>

                        <Form.Control
                            size={'sm'}
                            type='text'
                            value={tituloColuna}
                            className='customize-input-coluna'
                            onClick={selectAllText}
                            onChange={(event) => setTituloColuna(event.target.value)}
                            spellCheck='false'
                            onBlur={handleClickOutside}
                            onMouseDown={(e) => e.preventDefault()}
                            ref={inputRef}
                        />
                    </div>
                    <div className='coluna_dropdown'>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" size='sm'>

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={toggleModal}>excluir coluna</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </header>
                <div className='list_agenda'>
                    <Container
                        groupName="col"
                        onDrop={(dropResult) => onCardDrop(dropResult, coluna.id)}
                        getChildPayload={index => cards[index]
                        }
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'card-drop-preview'
                        }}
                        dropPlaceholderAnimationDuration={200}
                    >
                        {cards && cards.length > 0 && cards.map((card, index) => {
                            return (
                                <Draggable key={card.id}>
                                <Card card={card} onUpdateCard={handleUpdateCard} />
                            </Draggable>
                            )
                        })}
                        {isShowAddNewCard === true &&
                            <div className='add-new-card'>
                                <textarea
                                    className='form-control form_addcard'
                                    rows="2"
                                    placeholder='Digite o nome de sua tarefa aqui...'
                                    ref={textAreaRef}
                                    value={valueTextArea}
                                    onChange={(event) => setValueTextArea(event.target.value)}
                                >
                                </textarea>
                                <div className='group-btn'>
                                    <Button
                                        className='btn btn-primary botao_add_tarefa'
                                        onClick={() => handleAddNewCard()} >
                                        Adicionar
                                    </Button>
                                    <FontAwesomeIcon className='botao_fechar_card' style={{ marginRight: '15px' }} icon={faX} onClick={() => setIsShowAddNewCard(false)} />
                                </div>
                            </div>
                        }
                        {isShowAddNewCard === false &&
                            <footer className='foter_agenda'>
                                <div className='footer_action'>

                                    <Button className='botao_add_tarefa' onClick={() => setIsShowAddNewCard(true)}     >
                                        <FontAwesomeIcon className='icone' style={{ marginRight: '15px' }} icon={faPlus} />adicione uma nova tarefa
                                    </Button>
                                </div>
                            </footer>
                        }

                    </Container>

                </div>

            </div >

            <div style={{ display: 'none' }}>
                <CalendarioComp events={cardEvents} />
            </div>


            <ConfirmModal

                show={isShowModelDelete}
                titulo={'Remover Coluna'}
                conteudo={` Voce tem certeza que deseja remover essa coluna: <b>${coluna.titulo}</b>`}
                onAction={onModalAction}
            />
        </>

    )
}

export default Coluna;