import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Friatranquilo from '../../assets/Friatranquila.png'
import { faXTwitter, faLinkedin,faSquareFacebook,faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import './RedesFria.scss'
const RedesFria = () => {
    return (
        <>
            <div>
                <section style={{ marginTop: '5%', }}>
                    <Container  >
                        <Row className='cartaz_redefria' >
                            <Col className='texto_cartaz_redefria'  >
                                <h1 className='text-center texto_titulo_redefria' >
                                    Se interessou pelo projeto? Nos siga nas redes sociais!
                                </h1>
                                <div className='icones_redes'>
                                    <Link><FontAwesomeIcon icon={faSquareFacebook} size='3x' className='icon_fria' /></Link>
                                    <Link><FontAwesomeIcon icon={faXTwitter} size='3x' className='icon_fria' /></Link>
                                    <Link><FontAwesomeIcon icon={faInstagram} size='3x' className='icon_fria' /></Link>
                                    <Link><FontAwesomeIcon icon={faLinkedin} size='3x' className='icon_fria' /></Link>
                                </div>
                            </Col>
                            <Col className='img_cartaz1' >
                                <div className='img_landin'>
                                    <img className='img_friatranquila' src={Friatranquilo} alt="" />
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default RedesFria