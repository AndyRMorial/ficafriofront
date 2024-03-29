import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import getStroke from "perfect-freehand";
import "./Mural.scss";

const generator = rough.generator();

const createElement = (id, x1, y1, x2, y2, type) => {
  switch (type) {
    case "line":
    case "rectangle":
      const roughElement =
        type === "line"
          ? generator.line(x1, y1, x2, y2)
          : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
      return { id, x1, y1, x2, y2, type, roughElement };
    case "pencil":
      return { id, type, points: [{ x: x1, y: y1 }] };
    case "text":
      return { id, type, x1, y1, x2, y2, text: "" };
    default:
      throw new Error(`Tipo não reconhecido: ${type}`);
  }
};

const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = distance(a, b) - (distance(a, c) + distance(b, c));
  return Math.abs(offset) < maxDistance ? "inside" : null;
};

const positionWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  switch (type) {
    case "line":
      const on = onLine(x1, y1, x2, y2, x, y);
      const start = nearPoint(x, y, x1, y1, "start");
      const end = nearPoint(x, y, x2, y2, "end");
      return start || end || on;
    case "rectangle":
      const topLeft = nearPoint(x, y, x1, y1, "tl");
      const topRight = nearPoint(x, y, x2, y1, "tr");
      const bottomLeft = nearPoint(x, y, x1, y2, "bl");
      const bottomRight = nearPoint(x, y, x2, y2, "br");
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
      return topLeft || topRight || bottomLeft || bottomRight || inside;
    case "pencil":
      const betweenAnyPoint = element.points.some((point, index) => {
        const nextPoint = element.points[index + 1];
        if (!nextPoint) return false;
        return (
          onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null
        );
      });
      return betweenAnyPoint ? "inside" : null;
    case "text":
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};

const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};

const adjustElementCoordinates = (element) => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
};

const cursorForPosition = (position) => {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null; //should not really get here...
  }
};

const useHistory = (initialState) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (action, overwrite = false) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex((prevState) => prevState + 1);
    }
  };

  const undo = () => index > 0 && setIndex((prevState) => prevState - 1);
  const redo = () =>
    index < history.length - 1 && setIndex((prevState) => prevState + 1);

  return [history[index], setState, undo, redo];
};

const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

const drawElement = (roughCanvas, context, element) => {
  switch (element.type) {
    case "line":
    case "rectangle":
      roughCanvas.draw(element.roughElement);
      break;
    case "pencil":
      const stroke = getSvgPathFromStroke(getStroke(element.points));
      context.fill(new Path2D(stroke));
      break;
    case "text":
      context.textBaseline = "top";
      context.font = "24px Nunito";
      context.fillText(element.text, element.x1, element.y1);
      break;
    default:
      throw new Error(`Type not recognised: ${element.type}`);
  }
};

const adjustmentRequired = (type) => ["line", "rectangle"].includes(type);

const Mural = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("rectangle");
  const [selectedElement, setSelectedElement] = useState(null);
  const textAreaRef = useRef();

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const parent = document.getElementById("parent");
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const context = canvas.getContext("2d");
    const roughCanvas = rough.canvas(canvas);

    context.clearRect(0, 0, canvas.width, canvas.height); //faz o undo

    elements.forEach((element) => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element);
    });
  }, [elements, action, selectedElement]);

  useEffect(() => {
    const undoRedoFunction = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing") {
      setTimeout(() => {
        textArea.focus();
        textArea.value = selectedElement.text;
      }, 0);
    }
  }, [action, selectedElement]);

  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements];

    switch (type) {
      case "line":
      case "rectangle":
        elementsCopy[id] = createElement(id, x1, y1, x2, y2, type);
        break;
      case "pencil":
        elementsCopy[id].points = [
          ...elementsCopy[id].points,
          { x: x2, y: y2 },
        ];
        break;
      case "text":
        const textWidth = document
          .getElementById("canvas")
          .getContext("2d")
          .measureText(options.text).width;
        const textHeight = 24;
        elementsCopy[id] = {
          ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type),
          text: options.text,
        };
        break;
      default:
        throw new Error(`Tipo não reconhecido: ${type}`);
    }

    setElements(elementsCopy, true);
  };

  const handleMouseDown = (event) => {
    if (action === "writing") return;
    const { clientX, clientY } = event;
    const canvas = document.getElementById("canvas");
    const canvasRect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - canvasRect.left;
    const offsetY = event.clientY - canvasRect.top;

    if (tool === "selection") {
      const element = getElementAtPosition(offsetX, offsetY, elements);
      if (element) {
        if (element.type === "pencil") {
          const xOffsets = element.points.map((point) => offsetX - point.x);
          const yOffsets = element.points.map((point) => offsetY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements((prevState) => prevState);

        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        offsetX,
        offsetY,
        offsetX,
        offsetY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);

      setAction(tool === "text" ? "writing" : "drawing");
    }
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const canvas = document.getElementById("canvas");
    const canvasRect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - canvasRect.left;
    const offsetY = event.clientY - canvasRect.top;

    if (tool === "selection") {
      const element = getElementAtPosition(offsetX, offsetY, elements);
      event.target.style.cursor = element
        ? cursorForPosition(element.position)
        : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, offsetX, offsetY, tool);
    } else if (action === "moving") {
      if (selectedElement.type === "pencil") {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: offsetX - selectedElement.xOffsets[index],
          y: offsetY - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        const options = type === "text" ? { text: selectedElement.text } : {};
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          type,
          options
        );
      }
    } else if (action === "resizing") {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        offsetX,
        offsetY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  const handleMouseUp = (event) => {
    const canvas = document.getElementById("canvas");
    const canvasRect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - canvasRect.left;
    const offsetY = event.clientY - canvasRect.top;

    if (selectedElement) {
      if (
        selectedElement.type === "text" &&
        offsetX - selectedElement.offsetX === selectedElement.x1 &&
        offsetY - selectedElement.offsetY === selectedElement.y1
      ) {
        setAction("writing");
        return;
      }

      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (
        (action === "drawing" || action === "resizing") &&
        adjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type);
      }
    }

    if (action === "writing") return;

    setAction("none");
    setSelectedElement(null);
  };

  const handleBlur = (event) => {
    const { id, x1, y1, type } = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, x1, y1, null, null, type, { text: event.target.value });
  };

  const handleClearCanvas = () => {
    setElements([]); // Limpa todos os elementos
  };

  const handleSaveImage = () => {
    const canvas = document.getElementById("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "Seu_Mural.png";
    link.click();
  };

 /*  const [alerted, setAlerted] = useState(false);

  useEffect(() => {
    if (!alerted) {
      const showAlert = () => {
        alert(
          "Bem-vindo(a) ao Mural! Antes de começar, saiba que não salvamos suas alterações. Verifique se suas imagens estão baixadas antes de sair!"
        );
      };
      showAlert();
      setAlerted(true);
    }
  }, [alerted]); */

  const handleToolClick = (selectedTool) => {
    setTool(selectedTool); // Atualiza a ferramenta ativa
  };

  return (
    <div className="contain_mural">
      <div className="titulo-mural">
        <h1>Mural</h1>
      </div>
      <div className="container_quadro">
        <section className="caixa-opts">
          <h2>Ferramentas</h2>
          <div style={{ zIndex: 2 }} className="acao-re">
            <button onClick={undo}>
              <img
                src="src\assets\imgs mural\arrow-undo.svg"
                alt="Icone de uma seta para esquerda, representando a opção 'desfazer'"
              />
              Desfazer
            </button>
            <button onClick={redo}>
              {" "}
              <img
                src="src\assets\imgs mural\arrow-redo.svg"
                alt="Icone de uma seta para direita, representando a opção 'refazer'"
              />
              Refazer
            </button>
          </div>
          <div style={{ zIndex: 2 }} className="opcoes">
            <div
              className={`opcao ${
                tool === "selection" ? "opcao-selected" : ""
              }`}
              onClick={() => handleToolClick("selection")}
            >
              <input
                type="checkbox"
                id="selection"
                checked={tool === "selection"}
                onChange={() => setTool("selection")}
              />
              <label htmlFor="selection">
                <img
                  src="src\assets\imgs mural\move.svg"
                  alt="Imagem de 4 setas interligadas apontando para sentidos diferentes (cima,baixo,direita e esquerda), representando a função 'Selecionar'"
                />
                Selecionar
              </label>
            </div>
            <div
              className={`opcao ${tool === "line" ? "opcao-selected" : ""}`}
              onClick={() => handleToolClick("line")}
            >
              <input
                type="checkbox"
                id="line"
                checked={tool === "line"}
                onChange={() => setTool("line")}
              />
              <label htmlFor="line">
                <img
                  src="src\assets\imgs mural\analytics.svg"
                  alt="Imagem de uma linha com multiplos pontos, representando a função 'linha'"
                />
                Linha
              </label>
            </div>
            <div
              className={`opcao ${
                tool === "rectangle" ? "opcao-selected" : ""
              }`}
              onClick={() => handleToolClick("rectangle")}
            >
              <input
                type="checkbox"
                id="rectangle"
                checked={tool === "rectangle"}
                onChange={() => setTool("rectangle")}
              />
              <label htmlFor="rectangle">
                <img
                  src="src\assets\imgs mural\square.svg"
                  alt="Imagem de um retângulo, representando a função 'retângulo'"
                />
                Retângulo
              </label>
            </div>
            <div
              className={`opcao ${tool === "pencil" ? "opcao-selected" : ""}`}
              onClick={() => handleToolClick("pencil")}
            >
              <input
                type="checkbox"
                id="pencil"
                checked={tool === "pencil"}
                onChange={() => setTool("pencil")}
              />
              <label htmlFor="pencil">
                <img
                  src="src\assets\imgs mural\pencil.svg"
                  alt="Imagem de um lápis, representando a função 'lapis'"
                />
                Lápis
              </label>
            </div>
            <div
              className={`opcao ${tool === "text" ? "opcao-selected" : ""}`}
              onClick={() => handleToolClick("text")}
            >
              <input
                type="checkbox"
                id="text"
                checked={tool === "text"}
                onChange={() => setTool("text")}
              />
              <label htmlFor="text">
                <img
                  src="src\assets\imgs mural\text.svg"
                  alt="Imagem de um 'A' em maiusculo e minusculo, representando a função 'texto'"
                />
                Texto
              </label>
            </div>
          </div>

          <div className="acao-quadro">
            <button id="limpar" onClick={handleClearCanvas}>
              Limpar quadro
            </button>{" "}
            <button id="salvar" onClick={handleSaveImage}>
              Salvar Imagem
            </button>{" "}
          </div>
        </section>
        <section className="drawing-board" id="parent">
          {action === "writing" ? (
            <textarea
              ref={textAreaRef}
              onBlur={handleBlur}
              style={{
                position: "absolute",
                top: selectedElement.y1 - 2,
                left: selectedElement.x1,
                font: "24px nunito",
                margin: 0,
                padding: 0,
                border: 0,
                outline: 0,
                resize: "auto",
                overflow: "hidden",
                whiteSpace: "pre",
                background: "transparent",
                zIndex: 2,
              }}
            />
          ) : null}

          <canvas
            id="canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ zIndex: 1, borderRadius: "3vh" }}
          >
            Desculpe! Algum erro aconteceu. <br />
            Por favor, verifique a versão do seu navegador e atualize sua
            página.
          </canvas>
        </section>
      </div>
    </div>
  );
};

export default Mural;
