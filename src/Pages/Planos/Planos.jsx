import React from 'react'
import { useState, useEffect } from "react";
import './Planos.scss'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Planos = () => {
  const [planoAnual, setPlanoAnual] = useState(false);
  const [textoAnimated, setTextoAnimated] = useState(false);

  const handleAnualClick = () => {
    var btn = document.getElementById("btn"); //faz a animação de mensal para anual
    btn.style.left = "0";//fim animação
    setPlanoAnual(true); // Atualiza o estado para indicar que o plano anual foi selecionado
    setTextoAnimated(true);
  };

  const handleMensalClick = () => {
    var btn = document.getElementById("btn");//faz a animação de anual para mensal
    btn.style.left = "50%";//fim animação
    setPlanoAnual(false); // Atualiza o estado para indicar que o plano mensal foi selecionado
    setTextoAnimated(true);
  };
  
 useEffect(() => {
   // Após 0.5 segundos, redefine a classe de animação para reiniciar a transição
   const timeout = setTimeout(() => {
     setTextoAnimated(false);
   }, 350);

   return () => clearTimeout(timeout); // Limpa o timeout ao desmontar o componente
 }, [planoAnual]);
  
return (
  <div className="planos">
    <div className="container_plano">
      {/* titulo do container */}
      <h2 className="h2_plano">Nossos Planos - Pensados para você</h2>
      {/* container dos botões */}
      <div className="grupo-btn">
        <div id="btn"></div>
        <button className="botao" onClick={handleAnualClick}>
          Anual
        </button>
        <button className="botao" onClick={handleMensalClick}>
          Mensal
        </button>
      </div>
      {/* container dos cards */}
      <div className="grupo-cards">
        <div className="card-amarelo">
            
          <div className="card-content">
            <div className="content-info">
              <h2>Inicial</h2>
              <img
                src="src\assets\imgs planos\person.svg"
                className="icone"
              ></img>
              <h3 className="texto-content">Gratuito</h3>
            </div>

            <ul>
              <li>
                <img src="src\assets\imgs planos\Ellipse 1.png" /> Auxilio do
                assistente IA
              </li>
              <li>
                <img src="src\assets\imgs planos\Ellipse 1.png" /> Calendário e
                Listas Individuais
              </li>
              <li>
                <img src="src\assets\imgs planos\Ellipse 17.png" /> Mais opções
                de organização
              </li>
              <li>
                <img src="src\assets\imgs planos\Ellipse 17.png" /> Maior
                customização
              </li>
            </ul>
            <Button className="botao-amarelo" as={Link} to='/cadastro'> Acessar</Button>
          </div>
        </div>

        <div className="card-azul">
            
          <div className="card-content">
            <div className="content-info">
              <h2>Premium</h2>
              <img
                src="src\assets\imgs planos\star.svg"
                className="icone"
              ></img>
              <h3
                className={textoAnimated ? "texto-animated" : "texto-content"}
              >
                {planoAnual ? "R$250,00 por ano" : "R$25,00 por mês"}
              </h3>
            </div>

            <ul>
              <li>
                <img src="src\assets\imgs planos\Ellipse 1.png" /> Auxilio do
                assistente IA
              </li>
              <li>
                <img src="src\assets\imgs planos\Ellipse 1.png" /> Calendário e
                Listas Individuais
              </li>
              <li>
                <img src="src\assets\imgs planos\Ellipse 1.png" /> Mais opções
                de organização
              </li>
              <li>
                <img src="src\assets\imgs planos\Ellipse 1.png" /> Maior
                customização
              </li>
            </ul>
            <Button className="botao-azul"> Atualizar</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Planos