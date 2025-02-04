import React from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  // Initialising allNewDice in useState, so it displays when the app loads.
  const [dice, setDice] = React.useState(allNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  // Helper function that is used in appropriate places in the code.
  // value gets a random number between 1 and 6.
  // isHeld is automatically set to false. When the user clicks it will turn green and true.
  // random id is created for each element and is set to the key of the die.
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // loops 10 times throught numbers 1 to 6 and pushes the results to the newDice array and pushes generateNewDice when the game starts.
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // when rollDice is clicked, it looks through the existing roll. If the die is being held,
  // it is kept in the array but if it is not held then a new dice is generated to be added to the array.
  // the dice is only rolled if the user doesn't have tenzies.
  // If they do, setTenzies is set to false to reset and setDice to allNewDice() to get new dice.
  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
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
  // If tenzies is true, confetti will be rendered to the screen and the button text will change to "New Game"
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
