import React from "react";
import "../styles/Die.css";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white", //if true, it will be green, if false it will be white.
  };
  return (
    <div className="die-face" style={styles}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Die;
