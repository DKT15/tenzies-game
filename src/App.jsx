import React from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";

function App() {
  //
  const [dice, setDice] = React.useState(allNewDice());
  // loops 10 times throught numbers 1 to 6 and pushes the results to the newDice array.
  // isHeld is automatically set to false. When the user clicks it will turn green and true.
  // random id is created for each element and is set to the key of the die.
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  // clicking the RollDice button will get a new set of ten numbers and set the dice set to the new array.
  function rollDice() {
    setDice(allNewDice());
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
