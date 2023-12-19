import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, } from 'react-router-dom';
import FicaFrioLogo from '../../assets/Logo.png';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import calendarioicone from '../../assets/calendarioicone.png'
import agendaicone from '../../assets/agendaicone.png'
import muralicone from '../../assets/muralicone.png'
import Ampulheta from '../../assets/Ampulheta.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faStop, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Context/AuthContext';
import './Nave.css'


const Nave = () => {

    const { isLoggedIn, logout } = useContext(AuthContext);
    const location = useLocation();
    const [stylerColor, setstylerColor] = useState("cont")
    const [workMinutes, setWorkMinutes] = useState(25);
    const [restMinutes, setRestMinutes] = useState(5);
    const [timerSeconds, setTimerSeconds] = useState(workMinutes * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('Trabalho');

    useEffect(() => {
        let interval = null;

        if (isActive && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds(timerSeconds - 1);
            }, 1000);
        } else if (!isActive && timerSeconds !== 0) {
            clearInterval(interval);
        }

        if (timerSeconds === 0) {
            if (mode === 'Trabalho') {
                setMode('Descanso');
                setTimerSeconds(restMinutes * 60);
            } else {
                setMode('Trabalho');
                setTimerSeconds(workMinutes * 60);
            }
        }

        return () => clearInterval(interval);
    }, [isActive, timerSeconds, workMinutes, restMinutes, mode]);

    function toggleActive() {
        setIsActive(!isActive);
    }

    function resetTimer() {
        setIsActive(false);
        setMode('Trabalho');
        setTimerSeconds(workMinutes * 60);
    }

    function handleWorkMinutesChange(event) {
        const newWorkMinutes = Math.max(1, event.target.value);
        setWorkMinutes(newWorkMinutes);
        setRestMinutes(newWorkMinutes / 4);
        resetTimer();
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    if (location.pathname === '/login' || location.pathname === '/cadastro') {
        return null;
    }



    const NavbarVisitante = () => {

        return (<>
            {/* navbar visitante */}
            <Navbar expand='lg' className="navbar ">
                <Container style={{ maxWidth: '100%' }} className='botoes_navbar' >
                    <Navbar.Brand as={Link} to="/" replace><img src={FicaFrioLogo} alt="FicaFrio Logo" width={100} /></Navbar.Brand>
                    <Nav className="me-auto links_navbar">
                        <Nav.Link className='paginas_nav' as={Link} to='planos' replace >Planos</Nav.Link>
                        <Nav.Link className='paginas_nav' as={Link} to='sobrenos' replace>Sobre Nós</Nav.Link>




                    </Nav>

                    <div className='button ' >
                        <Button className='btn-primary botao_nav' as={Link} to='/login' > Entrar</Button>
                        <Button className='btn-primary botao_cadastrar' as={Link} to='/cadastro'  > Cadastre-se</Button>

                    </div>

                    <NavDropdown title="MENU" id="basic-nav-dropdown">

                        <div className="menu-links">
                            <NavDropdown.Item href="pg-nav-dropdown">
                                <Nav.Link className='paginas_nav' as={Link} to='planos' replace >Planos</Nav.Link>
                            </NavDropdown.Item>

                            <NavDropdown.Item href="pg-nav-dropdown">
                                <Nav.Link className='paginas_nav' as={Link} to='sobrenos' replace>Sobre Nós</Nav.Link>
                            </NavDropdown.Item>


                            <NavDropdown.Item href="menu-buttons" className='menu-buttons'>
                                <Button className='btn-primary botao_nav_menu' as={Link} to='/login'  > Entrar</Button>
                            </NavDropdown.Item>

                            <NavDropdown.Item href="menu-buttons" className='menu-buttons'>
                                <Button className='btn-primary botao_cadastrar_menu' as={Link} to='/cadastro' > Cadastre-se</Button>
                            </NavDropdown.Item>

                        </div>

                    </NavDropdown>


                </Container>
            </Navbar></>);
    }


    const NavbarLogado = () => {
        return (
          <>
            {/* navbar logado */}
            <Navbar expand="lg" className="navbar ">
              <Container style={{ maxWidth: "100%" }} className="botoes_navbar">
                <Navbar.Brand as={Link} to="/agenda">
                  <img src={FicaFrioLogo} alt="FicaFrio Logo" width={100} />
                </Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link
                    className="paginas_nav"
                    as={Link}
                    to="planos"
                    replace
                  >
                    Planos
                  </Nav.Link>
                  <Nav.Link
                    className="paginas_nav"
                    as={Link}
                    to="sobrenos"
                    replace
                  >
                    Sobre Nós
                  </Nav.Link>
                </Nav>

                <div className="button ">
                  <Button
                    className="btn-primary botao_nav"
                    as={Link}
                    to="/"
                    onClick={logout}
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} alt='Botão sair'/>
                  </Button>
                </div>

                <NavDropdown title="MENU" id="dropdown-nav-logado">
                  <div className="menu-links">
                    <NavDropdown.Item href="pg-nav-dropdown">
                      <Nav.Link
                        className="paginas_nav"
                        as={Link}
                        to="planos"
                        replace
                      >
                        Planos
                      </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="pg-nav-dropdown">
                      <Nav.Link
                        className="paginas_nav"
                        as={Link}
                        to="sobrenos"
                        replace
                      >
                        Sobre Nós
                      </Nav.Link>
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
              </Container>
            </Navbar>{" "}
          </>
        );
    }

    const TaskBar = () => {

        return (
            <>

                {/* Taskbar*/}
                <section className='navbar2'>
                    <Navbar>
                        <Container style={{}}  >
                            <div className='icone_navbar2'>
                                <Navbar.Brand as={Link} to="/calendario" replace><img src={calendarioicone} alt="FicaFrio Logo" width={100} /></Navbar.Brand>
                                <Nav.Link as={Link} to="/calendario" replace className='text-center'>Calendario</Nav.Link>
                            </div>

                            <div className='icone_navbar2'>
                                <Navbar.Brand as={Link} to='/agenda' replace ><img src={agendaicone} alt="FicaFrio Logo" width={100} /></Navbar.Brand>
                                <Nav.Link as={Link} to='/agenda' replace className='text-center'>Agenda</Nav.Link>
                            </div>

                            <div className='icone_navbar2'>
                                <Navbar.Brand as={Link} to="/mural" replace><img src={muralicone} alt="FicaFrio Logo" width={100} /></Navbar.Brand>
                                <Nav.Link as={Link} to="/mural" replace className='text-center'>Mural</Nav.Link>
                            </div>

                            <div className="temporizador_navbar2 ">
                                <img src={Ampulheta} className='ampulheta' alt="" />
                                <div className='pomodoro'>
                                    <div className="tempo_trabalho">
                                        <div className='bloco_cronograma'>
                                            <h3>{mode}: {formatTime(timerSeconds)}</h3>

                                            <Button variant="success" style={{ marginRight: '25px' }} onClick={toggleActive}>
                                                {isActive ? <FontAwesomeIcon className='icone_temporizador' icon={faPause} /> : <FontAwesomeIcon className="icone_temporizador" icon={faPlay} />}
                                            </Button>
                                            <Button variant="success" onClick={resetTimer}><FontAwesomeIcon className='icone_temporizador' icon={faStop} /></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>

                    </Navbar>

                </section>

            </>)

    };

    const TrocaNav = () => {
        
        const isOnProtectedRoute =
            location.pathname === '/agenda' ||
            location.pathname === '/mural' ||
            location.pathname === '/calendario';

        if (isOnProtectedRoute || isLoggedIn) {
            
            return (
                <>
                    <NavbarLogado />
                    <TaskBar />
                </>
            );
        } else {
            
            return <NavbarVisitante />;
        }
    };


    return (
        <>
            <section id='nav-bar '>
                <TrocaNav />
            </section>
        </>
    )
}

export default Nave;


