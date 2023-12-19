import React, { useEffect, useRef, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { initData } from '../../Components/actions/initData';
import { v4 as uuidv4 } from 'uuid';
import { mapOrdem } from '../../util/sorts';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../util/DragAndDrop';
import Coluna from '../../Components/Agenda/Coluna/Coluna';
import _ from 'lodash';
import './Agenda.scss';

const Agenda = () => {
  const [isShowAddList, setIsShowAddList] = useState(false);
  const [quadro, setQuadro] = useState({});
  const [colunas, setColunas] = useState([]);
  const [valuelnput, setValueInput] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isShowAddList === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowAddList]);

  useEffect(() => {
    const quadroInitData = initData.quadro.find(item => item.id === 'quadro-1');
    if (quadroInitData) {
      setQuadro(quadroInitData);
      setColunas(mapOrdem(quadroInitData.colunas, quadroInitData.colunaOrdem, 'id'));
    }
  }, []);

  const updateTasksCompleted = () => {
    setTasksCompleted(prevCount => prevCount + 1);
  };

  const onColumnDrop = dropResult => {
    let novaColunas = [...colunas];
    novaColunas = applyDrag(novaColunas, dropResult);

    let novoQuadro = { ...quadro };
    novoQuadro.colunaOrdem = novaColunas.map(coluna => coluna.id);
    novoQuadro.colunas = novaColunas;

    setColunas(novaColunas);
    setQuadro(novoQuadro);
  };

  const onCardDrop = (dropResult, colunaId) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let novaColunas = [...colunas];

      let currentColuna = novaColunas.find(coluna => coluna.id === colunaId);
      currentColuna.cards = applyDrag(currentColuna.cards, dropResult);
      currentColuna.cardOrder = currentColuna.cards.map(card => card.id);

      setColunas(novaColunas);
    }
  };

  const handleAddList = () => {
    if (!valuelnput) {
      if (inputRef && inputRef.current) inputRef.current.focus();
      return;
    }

    const _colunas = _.cloneDeep(colunas);
    _colunas.push({
      id: uuidv4(),
      boardId: quadro.id,
      titulo: valuelnput,
      cards: [],
    });
    setColunas(_colunas);
  };

  const onUpdateColuna = novaColuna => {
    const colunaIdUpdate = novaColuna.id;
    let ncols = [...colunas];
    let index = ncols.findIndex(item => item.id === colunaIdUpdate);
    if (novaColuna._destroy) {
      ncols.splice(index, 1);
    } else {
      ncols[index] = novaColuna;
    }
    setColunas(ncols);
  };

  return (
    <>
      <section className="agenda">
        <div className="criacao_agenda">
          <div>
            <Row className="menu_tarefas_agenda">
              <Col className="coluna_botao">
                {isShowAddList === false ? (
                  <Button className="botao_addagenda" onClick={() => setIsShowAddList(true)}>
                    <FontAwesomeIcon style={{ marginRight: '15px' }} icon={faPlus} />
                    Criar uma agenda
                  </Button>
                ) : (
                  <div>
                    <div className="conteudo_adicione">
                      <Button className="botao_addagenda2" onClick={() => handleAddList()}>
                        <FontAwesomeIcon style={{ marginRight: '15px' }} icon={faPlus} />
                        Adicione uma lista
                      </Button>
                      <div className="cria_agenda">
                        <input
                          type="text"
                          className="form-control form-control-agenda"
                          ref={inputRef}
                          value={valuelnput}
                          onChange={event => setValueInput(event.target.value)}
                        />
                        <FontAwesomeIcon icon={faX} className="x_agenda" onClick={() => setIsShowAddList(false)} />
                      </div>
                    </div>
                  </div>
                )}
              </Col>
              {/* <Col className="coluna_concluida">
                <div>
                  <h1>Suas tarefas</h1>
                  <div className="tarefas_concluidas">
                    <p>{`${tasksCompleted}`} Concluídas</p>
                  </div>
                </div>
              </Col> */}
            </Row>
          </div>
          <div>
            <div className="lista_tarefas">
              <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => colunas[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: 'coluna-drop-preview',
                }}
              >
                {colunas && colunas.length > 0 && colunas.map((coluna, index) => (
                  <Draggable key={coluna.id}>
                    <Coluna
                      coluna={coluna}
                      onCardDrop={onCardDrop}
                      onUpdateColuna={onUpdateColuna}
                      updateTasksCompleted={updateTasksCompleted} // Passando a função para Coluna
                    />
                  </Draggable>
                ))}
              </Container>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Agenda;