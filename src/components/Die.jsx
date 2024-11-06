import React from "react";
import "../styles/Die.css";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white", //if true, it will be green, if false it will be white.
  };
  //adding the styling to each dice face. The styling will be green if true and white if false.
  // props.value links up to the die value within App.jsx.
  // holdDice assigns an id to each dice when it is clicked. Props is passing it down from the App.jsx.
  return (
    <div className="die-face" onClick={props.holdDice} style={styles}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Die;
