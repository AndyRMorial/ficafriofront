import * as React from "react";
import './SobreNos.scss'
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import Simboloproa from '../../assets/simboloproa.png'
import Ficafrioicone from '../../assets/Ficafrioicone.png'
import { Link } from "react-router-dom";
import RedesFria from "../../Components/RedesFria/RedesFria";
import AlanNogueira from "../../assets/AlanNogueira.png";
import AndrewMorial from "../../assets/AndrewMorial.png";
import FelipeOrtiz from "../../assets/FelipeOrtiz.png";
import GustavoAngelo from "../../assets/GustavoAngelo.png";
import LarissaPires from "../../assets/LarissaPires.png";
import LiviaFreitas from "../../assets/LiviaFreitas.png";
import RodrigoLima from "../../assets/RodrigoLima.png";
import VictorHomem from "../../assets/VictorHomem.png";


function SobreNos() {

  /* const teamMembers = [
    { name: 'Alan Nogueira', role: 'Banco de dados', imageSrc: '../../assets/AlanNogueira.png' },
    { name: 'Felipe Ortiz', role: 'Scrum Master e Full-Stack', imageSrc: '../../assets/FelipeOrtiz.png' },
    { name: 'Lívia Freitas', role: 'Product Owner, UI/UX Designer e Front-End', imageSrc: '../../assets/LiviaFreitas.png' },
    { name: 'Larissa Pires', role: 'Product Owner e Full-Stack', imageSrc: '../../assets/LarissaPires.png' },
    { name: 'Andrew Morial', role: 'UI/UX Designer e Full-Stack', imageSrc: '../../assets/AndrewMorial.png' },
    { name: 'Gustavo Angelo', role: 'UI/UX Designer e Full-Stack', imageSrc: '../../assets/GustavoAngelo.png' },
    { name: 'Rodrigo Lima', role: 'Financeiro e Full-stack', imageSrc: '../../assets/RodrigoLima.png' },
    { name: 'Victor Homem', role: 'Full-Stack', imageSrc: '../../assets/VictorHomem.png' },

  ]; */
  return (
    <>
      <section className="sobrenos">
        <section className="quem_somos">
          <Container style={{ width: '100%' }}>
            <Row>
              <Col className="texto_quemsomos">
                <h1 className="titulo_quemsomos">
                  Quem somos?
                </h1>
                <p>Somos uma equipe de estudantes incentivados pelo instituto Proa a criar uma solução em web com foco no crescimento social e na comunidade.</p>
              </Col>
              <Col className="simbolo_proa">
                <img src={Simboloproa} className="proa" alt="" />
              </Col>
            </Row>
            <Row className="linha_ficafrio">
              <Col className="simbolo_ficafrio">
                <img src={Ficafrioicone} className="proa" alt="" />
              </Col>
              <Col className="texto_quemsomos">
                <p className="texto2_sobrenos">Diante desse objetivo, surge o projeto Fica Fri.io, com a meta de ajudar diversas pessoas com sua gestão de tempo, organização e saúde mental.</p>
              </Col>
            </Row>

          </Container>
        </section>
        <section className="nossa_missao" >
            <Row >
              <Col className="texto_nossamissao">
                <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                  Nossa Missão
                </h1>
                <p>Visamos facilitar o acesso à gestão e organização de tarefas por meio de sistemas simples e intuitivos que aliviam o estresse em relação a aspectos organizacionais e na realização de seus objetivos.</p>
              </Col>
            </Row>
        </section>
        <section>
          <Row style={{ margin: '0' }}>
            <Col className="valores_sobrenos">
              <h1 style={{ color: '#41748d', marginBottom: '20px', fontWeight: 'bold' }}>
                Valores
              </h1>
              <p>
                Para realizar nossa missão, temos uma série de valores que influenciam nossa trajetória:
              </p>
            </Col>         
          </Row>
          <Row className="row_cards_sobrenos">
            <Col className="coluna_cards_sobrenos" md="6">
              <Card className="cards_conteudo_sobrenos">
                <Card.Body className="conteudo_card_sobrenos">
                  <Card.Title className="titulo_cards_sobrenos">Trabalho em equipe</Card.Title>
                  <Card.Text className="texto_cards_sobrenos">
                  O que seria de nossa solução se não fosse pelo trabalho em equipe? Sendo a base do nosso projeto, a colaboração, dedicação e proatividade desenvolvida em conjunto é o que possibilita sua construção e evolução.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos justify-content-end">
            <Col className="coluna_cards_sobrenos" md="6">
              <Card className="cards_conteudo_sobrenos">
                <Card.Body className="conteudo_card_sobrenos">
                  <Card.Title className="titulo_cards_sobrenos">Inclusão</Card.Title>
                  <Card.Text className="texto_cards_sobrenos">
                  No Fica Fri.io, acreditamos que apenas a inclusão e diversidade pode nos ajudar a entender a dor de quem procuramos ajudar. Estamos sempre abertos para novas perspectivas, sugestões e opiniões de diversos contextos e indivíduos, a fim de melhorar o projeto e a nós mesmos.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos">
            <Col className="coluna_cards_sobrenos" md="6"> 
              <Card className="cards_conteudo_sobrenos">
                <Card.Body className="conteudo_card_sobrenos">
                  <Card.Title className="titulo_cards_sobrenos">Inteligência emocional</Card.Title>
                  <Card.Text className="texto_cards_sobrenos">
                  A inteligência emocional nos permite ter a capacidade de gerenciar nossos sentimentos e expressar nossa empatia - habilidade essencial para entender nosso público. Essa aptidão também auxilia na nossa comunicação, visto que é essencial entender nossos sentimentos para administrar nossas mensagens e como elas são recebidas por aqueles que interagem com o projeto, sejam eles parte da equipe, clientes ou parceiros.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos justify-content-end">
            <Col className="coluna_cards_sobrenos" md="6">
              <Card className="cards_conteudo_sobrenos">
                <Card.Body className="conteudo_card_sobrenos">
                  <Card.Title className="titulo_cards_sobrenos">Gestão de tempo</Card.Title>
                  <Card.Text className="texto_cards_sobrenos">
                  Por fim, mas não menos importante, a habilidade chave do nosso projeto: A gestão de tempo.
                  Acreditamos fielmente que ela ajuda na sua produtividade e é o caminho para uma vida responsável e sem sobrecargas. Ao saber quando e onde designar nossa atenção, atingimos uma maior flexibilidade sobre nossa rotina e temos a oportunidade de também dedicar nosso tempo ao lazer, aprendizado, descanso, entre outras atividades que façam bem para nossa mente e corpo.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        <section className="nossa_visao" >
            <Row>
              <Col className="texto_nossamissao">
                <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                  Visão
                </h1>
                <p>
                  Não paramos por aí! Temos o sonho de crescer e nos tornamos uma das maiores, senão a maior, plataforma de gestão de tempo do mercado, ajudando o maior número de pessoas possíveis e prevenindo o burnout.
                </p>
              </Col>
            </Row>
        </section>
        <section>

        <Row style={{ margin: '0' }}>
            <Col className="valores_sobrenos">
              <h1 style={{ color: '#41748d', marginBottom: '20px', fontWeight: 'bold' }}>
                Conheça a nossa equipe
              </h1>
            </Col>         
          </Row>
          <Row className="row_cards_sobrenos justify-content-end">
          <Col className="coluna_cards_equipe_sobrenos" md="6">
          <a className="equipe_link" href="https://www.linkedin.com/in/alan-nogueira-3a4976206/"><Card className="cards_equipe_sobrenos">
                <Card.Body className="conteudo_card_equipe_sobrenos">
                  <Row>
                    <Col className="conteudo_equipe_sobrenos" md="7">
                      <Card.Title className="titulo_cards_equipe_sobrenos">Alan Nogueira</Card.Title>
                      <Card.Text className="texto_cards_equipe_sobrenos">
                        Banco de Dados
                      </Card.Text>
                    </Col>
                    <Col md="4">
                      <Card.Img src={AlanNogueira} className="imagem_equipe_sobrenos" alt="" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card></a>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos">
            <Col className="coluna_cards_equipe_sobrenos" md="6">
            <a className="equipe_link" href="https://www.linkedin.com/in/andrew-morial-5825a1157/"><Card className="cards_equipe_sobrenos">
                <Card.Body className="conteudo_card_equipe_sobrenos">
                  <Row>
                    <Col md="4">
                      <Card.Img src={AndrewMorial} className="imagem_equipe_sobrenos2" alt="" />
                    </Col>
                    <Col md="8">
                      <Card.Title className="titulo_cards_equipe_sobrenos2">Andrew Morial</Card.Title>
                      <Card.Text className="texto_cards_equipe_sobrenos2">
                        UI/UX Designer e Full-stack
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card></a>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos justify-content-end">
          <Col className="coluna_cards_equipe_sobrenos" md="6">
          <a className="equipe_link" href="https://www.linkedin.com/in/felipe-ortiz-dev/"><Card className="cards_equipe_sobrenos">
                <Card.Body className="conteudo_card_equipe_sobrenos">
                  <Row>
                    <Col className="conteudo_equipe_sobrenos" md="7">
                      <Card.Title className="titulo_cards_equipe_sobrenos">Felipe Ortiz</Card.Title>
                      <Card.Text className="texto_cards_equipe_sobrenos">
                        Scrum Master e Full-stack
                      </Card.Text>
                    </Col>
                    <Col md="4">
                      <Card.Img src={FelipeOrtiz} className="imagem_equipe_sobrenos" alt="" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card></a>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos">
            <Col className="coluna_cards_equipe_sobrenos" md="6">
            <a className="equipe_link" href="https://www.linkedin.com/in/gustavo-angelo-giordano/"><Card className="cards_equipe_sobrenos">
                <Card.Body className="conteudo_card_equipe_sobrenos">
                  <Row>
                    <Col md="4">
                      <Card.Img src={GustavoAngelo} className="imagem_equipe_sobrenos2" alt="" />
                    </Col>
                    <Col md="8">
                      <Card.Title className="titulo_cards_equipe_sobrenos2">Gustavo Angelo</Card.Title>
                      <Card.Text className="texto_cards_equipe_sobrenos2">
                        UI/UX Designer e Front-end
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card></a>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos justify-content-end">
            <Col className="coluna_cards_equipe_sobrenos" md="6">
            <a className="equipe_link" href="https://www.linkedin.com/in/larissa-pires-dos-santos-02058b1b9/"><Card className="cards_equipe_sobrenos">
                <Card.Body className="conteudo_card_equipe_sobrenos">
                  <Row>
                    <Col className="conteudo_equipe_sobrenos" md="7">
                      <Card.Title className="titulo_cards_equipe_sobrenos">Larissa Pires</Card.Title>
                      <Card.Text className="texto_cards_equipe_sobrenos">
                      Product Owner e Full-stack
                      </Card.Text>
                    </Col>
                    <Col md="4">
                      <Card.Img src={LarissaPires} className="imagem_equipe_sobrenos" alt="" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card></a>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos">
            <Col className="coluna_cards_equipe_sobrenos" md="6">
            <a className="equipe_link" href="https://www.linkedin.com/in/lívia-freitas-de-lima-39a813289/"><Card className="cards_equipe_sobrenos">
                <Card.Body className="conteudo_card_equipe_sobrenos">
                  <Row>
                    <Col md="4">
                      <Card.Img src={LiviaFreitas} className="imagem_equipe_sobrenos2" alt="" />
                    </Col>
                    <Col md="8">
                      <Card.Title className="titulo_cards_equipe_sobrenos2">Lívia Freitas</Card.Title>
                      <Card.Text className="texto_cards_equipe_sobrenos2">
                      Product Owner, UI/UX Designer e Front-end
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card></a>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos justify-content-end">
            <Col className="coluna_cards_equipe_sobrenos" md="6">
            <a className="equipe_link" href="https://www.linkedin.com/in/rodrigo-lima-de-oliveira/"><Card className="cards_equipe_sobrenos">
                <Card.Body className="conteudo_card_equipe_sobrenos">
                  <Row>
                    <Col className="conteudo_equipe_sobrenos" md="7">
                      <Card.Title className="titulo_cards_equipe_sobrenos">Rodrigo Lima</Card.Title>
                      <Card.Text className="texto_cards_equipe_sobrenos">
                      Financeiro e Full-stack
                      </Card.Text>
                    </Col>
                    <Col md="4">
                      <Card.Img src={RodrigoLima} className="imagem_equipe_sobrenos" alt="" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card></a>
            </Col>
          </Row>
          <Row className="row_cards_sobrenos">
            <Col className="coluna_cards_equipe_sobrenos" md="6">
            <a className="equipe_link" href="https://www.linkedin.com/in/victor-melo-4833a324a/"><Card className="cards_equipe_sobrenos">
                <Card.Body className="conteudo_card_equipe_sobrenos">
                  <Row>
                    <Col md="4">
                      <Card.Img src={VictorHomem} className="imagem_equipe_sobrenos2" alt="" />
                    </Col>
                    <Col md="8">
                      <Card.Title className="titulo_cards_equipe_sobrenos2">Victor Homem</Card.Title>
                      <Card.Text className="texto_cards_equipe_sobrenos2">
                        Back-end
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card></a>
            </Col>
          </Row>
          
          
          
        </section>
        <section>
          <RedesFria/>
        </section>
      </section>


    </>
  );
}


export default SobreNos;