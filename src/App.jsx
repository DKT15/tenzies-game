import React from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  // Initialising allNewDice in useState, so it displays when the app loads.
  // adding a function before allNewDice, stops it from being rerun when the component is re-rendered.
  const [dice, setDice] = React.useState(() => generateNewDice());

  // ref is needed to target the DomNode. We use it in the useEffect.
  const buttonRef = React.useRef(null);

  // the game will be won once every dice is held (i.e. true) and
  // every die value is equal to the first die value.
  // e.g. every dice has the same number.
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  // this focuses the button to the new game button once the game has been won.
  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  });

  // the Array constructor is used to return 10 numbers. .fill is used to fill every item in the array that we want
  // It then maps through the array and fills it and gives it 10 numbers between 1 and 6,
  // applying a isHeld and id property to each of those numbers.
  // value gets a random number between 1 and 6.
  // isHeld is automatically set to false. When the user clicks it will turn green and true.
  // random id is created for each element and is set to the key of the die.
  function generateNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  // // loops 10 times through numbers 1 to 6 and pushes the results to the newDice array and pushes generateNewDice when the game starts.
  // function allNewDice() {
  //   const newDice = [];
  //   for (let i = 0; i < 10; i++) {
  //     newDice.push(generateNewDice());
  //   }
  //   return newDice;
  // }

  // when rollDice is clicked, it looks through the existing roll. If the die is being held,
  // it is kept in the array (keep the current die) but if it is not held then a new value of a die will be generated from 1 to 6.
  // spread oprator is used to bring in all the die's current values.
  // the dice is only rolled if the user hasn't won the game yet.
  // If they have won the game the game setDice to allNewDice() to get new dice, to start a new game.
  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateNewDice());
    }
  }

  // when clicked, flips the isHeld property based on the id.
  // If it is the same die with the id property that was passed into the function, the object will be updated and if not die will be returned. Which is keeping the same object that was there before.
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die; //if the id's are equal. I take all of the properties from the original die and set the isHeld to be the opposite of die.isHeld because it is defaulted to false.
      })
    );
  }

  // map through each die and setting it an id, value (passes down the value to props in Die.jsx)
  // isHeld property which is defaulted as false.
  // when a dice is clicked holdDice will give it its own unique id.
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  // adding each diceElement to the container.
  // If gameWon is true, confetti will be rendered to the screen and the button text will change to "New Game"
  // Aria-live will announce a change in the content. When the game is won the para will be read out to the user.
  // sr-only will indicate that the content is for screenreaders. It is hidden from users on the screen via the CSS but will be read out still.
  // buttonRef applied to the button that will switch to new game was the game has been won.
  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
