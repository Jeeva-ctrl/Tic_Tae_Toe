import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

function Square({ value, onClick, id }) {
  return (
    <button className="sqrbtn" id={id} onClick={(e) => onClick(e.target.id)}>
      {value}
    </button>
  );
}
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      show={props.show}
      size="lg"
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Match Completed
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.text}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.reset}>
          Reset
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function GameBoard({ squares, onClick }) {
  return (
    <div className="board_container">
      <div>
        <div>{<Square value={squares[0]} id={0} onClick={onClick} />}</div>
        <div>{<Square value={squares[1]} id={1} onClick={onClick} />}</div>
        <div>{<Square value={squares[2]} id={2} onClick={onClick} />}</div>
      </div>
      <div>
        <div>{<Square value={squares[3]} id={3} onClick={onClick} />}</div>
        <div>{<Square value={squares[4]} id={4} onClick={onClick} />}</div>
        <div>{<Square value={squares[5]} id={5} onClick={onClick} />}</div>
      </div>
      <div>
        <div>{<Square value={squares[6]} id={6} onClick={onClick} />}</div>
        <div>{<Square value={squares[7]} id={7} onClick={onClick} />}</div>
        <div>{<Square value={squares[8]} id={8} onClick={onClick} />}</div>
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(8).fill(null),
      xIsNext: true,
      showPopUp: true,
    };
  }
  onHide = () => {
    this.setState({ showPopUp: false });
  };
  reset = () => {
    this.setState({
      squares: Array(8).fill(null),
      xIsNext: true,
      showPopUp: true,
    });
  };
  handleClick = (i) => {
    var squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "🧔" : "👮";
    let winner = CalculateWinner(this.state.squares);
    if (winner) {
      return;
    }
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  };

  render() {
    let winner = CalculateWinner(this.state.squares);
    return (
      <div  className="container">
        <h2>Tic🧔Tac👮Toe</h2>
        <p>Player 1 : 🧔</p>
        <p>Player 2 : 👮</p>
        <Button  variant="danger" className="rstbtn" onClick={this.reset}>Reset</Button>
        <GameBoard squares={this.state.squares} onClick={this.handleClick} />
        {this.state.squares.includes(null) ? (
          ""
        ) : (
          <MyVerticallyCenteredModal
            reset={this.reset}
            onHide={() => this.onHide()}
            show={this.state.showPopUp}
            text={"Match Drawn"}
          />
        )}
        <div>
          {winner && this.state.showPopUp ? (
            <MyVerticallyCenteredModal
              reset={this.reset}
              onHide={() => this.onHide()}
              show={winner && this.state.showPopUp}
              text={"The winner is  " + winner}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Game />
    </div>
  );
}

export default App;
