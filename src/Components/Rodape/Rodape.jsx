import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Logo from '../../assets/Logo.png'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { faXTwitter, faLinkedin, faSquareFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import './Rodape.scss'




function Rodape() {



    return (
        <>

             <div className='rodape'>
                <Row style={{margin: '0'}}>
                    <Col className='rodape_col' md={5}>
                        <ul className='LogoTipo'>
                            <Link  to='/' ><img src={Logo} alt="LogoTipo" /></Link>
                            <hr className='linhadivisoria'/>
                            <h1>Redes socias:</h1>
                        </ul>
                        <div className='social-links'>
                            <Link><FontAwesomeIcon icon={faSquareFacebook}  size='3x' className='icon'/></Link>
                            <Link><FontAwesomeIcon icon={faXTwitter} size='3x' className='icon'/></Link>
                            <Link><FontAwesomeIcon icon={faInstagram} size='3x' className='icon' /></Link>
                            <Link><FontAwesomeIcon icon={faLinkedin}  size='3x' className='icon'/></Link>
                        </div>
                    </Col>
                    <Col className='rodape_LinksUteis' md={4}>
                        <h1>Links Uteis</h1>
                        <ul>
                            <li>Soluções</li>
                            <li>Recursos</li>
                            <li>Planos</li>
                            <li>Sobre Nós</li>
                            <li>Fale Conosco</li>
                        </ul>
                    </Col>
                    <Col className='rodape_BoletimNoticias' md={3}>
                        <h1>Boletim de Notícias</h1>
                        <p>Acompanhe o projeto e receba dicas de organização</p>
                        <Form className='Formulario'>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Row>
                                    <Col className='Email' sm="5">
                                        <Form.Control type="email" placeholder="Insira seu Email" />
                                    </Col>
                                    <Col className='Botao'>
                                        <Button as="input" type="submit" value="Inscreva-se" />{''}
                                    </Col>
                                </Row>
                            </Form.Group>
                            {['checkbox'].map((type) => (
                                <div div key={`default-${type}`} className="mb-3">
                                    <Form.Check className='CheckBoxNoticias' // prettier-ignore
                                        type={type}
                                        id={`default-${type}`}
                                        label={`Concordo em receber noticias da equipe Frio`}
                                    />
                                </div>
                            ))}
                        </Form>
                    </Col>
                </Row>

                <div className='direitos-reservados'>
                    <h1>@2023 Fica Fri.io - Todos direitos reservados</h1>
                </div>
            </div>

            {/* <section className='rodape'>
                <Container className='rodape_row' >
                    <Row >
                        <Col sm={4}>

                            <ul className='LogoTipo'>
                                <Link to='/' ><img src={Logo} alt="LogoTipo" /></Link>
                                <hr className='linhadivisoria' />
                                <h1>Redes socias:</h1>
                            </ul>
                            <div className='social-links'>
                                <Link><FontAwesomeIcon icon={faSquareFacebook} size='3x' className='icon' /></Link>
                                <Link><FontAwesomeIcon icon={faXTwitter} size='3x' className='icon' /></Link>
                                <Link><FontAwesomeIcon icon={faInstagram} size='3x' className='icon' /></Link>
                                <Link><FontAwesomeIcon icon={faLinkedin} size='3x' className='icon' /></Link>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <h1>Links Uteis</h1>
                            <ul>
                                <li>Soluções</li>
                                <li>Recursos</li>
                                <li>Planos</li>
                                <li>Sobre Nós</li>
                                <li>Fale Conosco</li>
                            </ul>
                        </Col>
                        <Col sm={4}>

                            <h1>Boletim de Notícias</h1>
                            <p>Acompanhe o projeto e receba dicas de organização</p>
                            <Form className='Formulario'>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Row>
                                        <Col className='Email' sm="5">
                                            <Form.Control type="email" placeholder="Insira seu Email" />
                                        </Col>
                                        <Col className='Botao'>
                                            <Button as="input" type="submit" value="Inscreva-se" />{''}
                                        </Col>
                                    </Row>
                                </Form.Group>
                                {['checkbox'].map((type) => (
                                    <div div key={`default-${type}`} className="mb-3">
                                        <Form.Check className='CheckBoxNoticias' // prettier-ignore
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Concordo em receber noticias da equipe Frio`}
                                        />
                                    </div>
                                ))}
                            </Form>

                        </Col>

                    </Row>
                </Container>
            </section> */}

        </>
    )
}

export default Rodape