import React, { useState } from 'react';
import { Button, Col, Row, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Friatranquilo from '../../assets/Friatranquila.png'
import peguin from '../../assets/peguin.png'
import ImgTempoeDinheiro from '../../assets/ImgTempoeDinheiro.png'
import ImgPostItAzul from '../../assets/ImgPostItAzul.png'
import ImgBurnOut from '../../assets/ImgBurnOut.png'
import './LandinPage.css'


const LandinPage = ({ onLoginClick }) => {
  return (
    <>
      <div className='landin_page'>
        <section className='banner'>
          <div className='frase_banner'>
            <Row className='banner_ajuste'>
              <Col sm={1} >
              <img className='penguin_landing' src={peguin} alt="" />
              </Col>
              <Col className='landing_page_banner_completo' sm={1} style={{ width: '34%' }}>
                <div className='texto_banner_landing'>
                  <p className='paragrafo_banner_landing1' style={{ color: '#FFC658' }}>
                    Bem vindo ao Fica Fri.io!
                  </p>
                  <h1 className='titulo_banner_landing' style={{ marginBottom: '22px' }}>
                    <h1 style={{ color: '#5C9FB4' }}>Resfriando</h1>sua rotina desde 2023.
                  </h1>
                  <p className='paragrafo_banner_landing2' style={{ marginBottom: '22px', color: '#FFC658' }}>
                    A <span style={{ color: '#FF6A13' }}>agenda</span> que equilibra seu tempo com sua <span style={{ color: '#FFF6A9' }}>saúde mental.</span>
                  </p>
                </div>
                <div >
                  <Button className='btn-primary botao_landin' onClick={onLoginClick} as={Link} to='cadastro'>Comece agora</Button>
                </div>

              </Col>
            </Row>

          </div>
        </section>
        <section className="bloco_cartaz">
          <Container  >
            <Row className='cartaz1' >
              <Col className='texto_cartaz'  >
                <h1 className='text-center texto_titulo_friatranquilo' >
                  O que é o Fica Fri.io?
                </h1>
                <p className='text_friatranquilo'>
                  Cuide da sua saúde mental de forma prática e eficaz com a nossa agenda simples e intuitiva. Priorize o seu bem-estar, encontre equilíbrio e viva uma vida mais saudável e balanceada.
                  Com o Fica Fri.io, você tem sua rotina na palma da sua mão.
                </p>
              </Col>
              <Col className='img_cartaz1' >
                <div className='img_landin'>
                  <img className='img_friatranquila' src={Friatranquilo} alt="" />
                </div>
              </Col>
            </Row>
          </Container>

          {/* seção dos cards*/}

          <Container style={{ marginTop: '2.5%' }}>
            <Row className='cartaz_cards_pequenos'>
              <Col className='colunas_cards_pequenos1' xs={4}>
                <Card className='economize'>
                  <Card.Img src={ImgTempoeDinheiro} className='img_ted' alt="" />
                  <Card.Body>
                    <Card.Title className='titulo_cards_pequenos1'>Economize seu tempo e dinheiro!</Card.Title> 
                    <Card.Text className='texto_cards_pequenos1'>
                      Nossa agenda é a solução mais econômica e viável para você. Fornecemos uma ferramenta com o intuito de ser acessível e eficiente.
                      Descubra nossos planos e veja como somos a solução mais inteligente e eficaz para o seu negócio!
                    </Card.Text>
                    
                    <Button className='botao_saibamais_cards_pequeno1'>Vamos lá!</Button>
                  </Card.Body>
                </Card>                
              </Col>
              <Col className='colunas_cards_pequenos2' xs={4}>
                <Card className='porque_nos'>
                  <Card.Img src={ImgPostItAzul} className='img_ted' alt="" />
                  <Card.Body>
                    <Card.Title className='titulo_cards_pequenos2'>Mas por que o Fica Fri.io?</Card.Title> 
                    <Card.Text className='texto_cards_pequenos2'>
                      Fica Fri.io é uma escolha óbvia para quem busca qualidade, foco e intuitividade no cuidado em gestão de tempo.
                      Nossos objetivos são claros: proporcionar uma boa experiência, ajudá-lo a manter o foco, melhorar sua produtividade e auxiliar na organização do seu bem-estar.
                      Escolha Fica Fri.io transforme seu autocuidado.
                    </Card.Text>
                    <Button className='botao_saibamais_cards_pequeno2'>Vamos lá!</Button>
                  </Card.Body>
                </Card>                
              </Col>
              <Col className='colunas_cards_pequenos3' xs={4}>
                <Card className='estresse'>
                  <Card.Img src={ImgBurnOut} className='img_ted' alt="" />
                  <Card.Body>
                    <Card.Title className='titulo_cards_pequenos3'>O que é o Bourn-out?</Card.Title> 
                    <Card.Text className='texto_cards_pequenos3'>
                      Muitas pessoas sofrem com a Síndrome de  Burnout, um distúrbio com sintomas de estresse emocional e físico ocasionado por situações de trabalho desgastantes.
                      Com o Fica Fri.io, você a previne com estratégias que diminuem o estresse e a pressão no trabalho, resultando em organização eficiente para suas tarefas.
                    </Card.Text>
                    <Button className='botao_saibamais_cards_pequeno3'>Vamos lá!</Button>
                  </Card.Body>
                </Card>                
              </Col>
            </Row>
          </Container>
         
        </section>

      </div>


    </>
  )
}

export default LandinPage