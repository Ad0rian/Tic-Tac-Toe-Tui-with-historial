function Square(props) {
  return /*#__PURE__*/(
    React.createElement("button", {
      className: props.class
      //insertar dato
      , onClick: props.insertdata },
    props.value));



}
//Genera el tablero
class Board extends React.Component {
  renderSquare(i) {

    return /*#__PURE__*/(

      React.createElement(Square, {
        class: this.props.squaresclass[i],
        value: this.props.squares[i]
        //donde estoy clicando
        , insertdata: () => this.props.insertdata(i) }));



  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "board-row" },
      this.renderSquare(0),
      this.renderSquare(1),
      this.renderSquare(2),
      this.renderSquare(3)), /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderSquare(4),
      this.renderSquare(5),
      this.renderSquare(6),
      this.renderSquare(7)), /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderSquare(8),
      this.renderSquare(9),
      this.renderSquare(10),
      this.renderSquare(11)), /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderSquare(12),
      this.renderSquare(13),
      this.renderSquare(14),
      this.renderSquare(15))));



  }}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      history: [{
        squaresclass: Array(16).fill("squarenull"),
        squares: Array(16).fill(null) }],

      stepNumber: 0,
      xIsNext: true };

  }
  clickIsMade(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const squaresclass = current.squaresclass.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squaresclass[i] = this.state.xIsNext ? "squareX" : "squareO";
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squaresclass: squaresclass,
        squares: squares }]),

      stepNumber: history.length,
      xIsNext: !this.state.xIsNext });

    if (this.state.xIsNext === true) {
      this.adversary(history, squares, squaresclass);
    }
  }


  adversary(history, squares, squaresclass) {

    var chooseAdversary = Math.floor(Math.random() * (16 - 0));
    while (squares[chooseAdversary] === 'X' || squares[chooseAdversary] === 'O') {
      chooseAdversary = Math.floor(Math.random() * (16 - 0));

    }
    squaresclass[chooseAdversary] = this.state.xIsNext ? "squareO" : "squareX";
    squares[chooseAdversary] = this.state.xIsNext ? 'O' : 'X';
    this.setState({
      history: history.concat([{
        squaresclass: squaresclass,
        squares: squares }]),

      xIsNext: true });

  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 1 === 0 });

  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return /*#__PURE__*/(
        React.createElement("li", { key: move }, /*#__PURE__*/
        React.createElement("button", { className: "ButtonMovement", onClick: () => this.jumpTo(move) }, desc)));


    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return /*#__PURE__*/(
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "game-board" }, /*#__PURE__*/
      React.createElement(Board, {
        squaresclass: current.squaresclass,
        squares: current.squares,
        insertdata: i => this.clickIsMade(i) })), /*#__PURE__*/


      React.createElement("div", { className: "game-info" }, /*#__PURE__*/
      React.createElement("div", null, status), /*#__PURE__*/
      React.createElement("ol", null, moves))));



  }}


// ========================================

ReactDOM.render( /*#__PURE__*/
React.createElement(Game, null),
document.getElementById('root'));


function calculateWinner(squares) {
  const lines = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[b] === squares[d]) {
      return squares[a];
    }
  }
  return null;
}