import Card from "./Components/Card";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function App() {
  let rollRefenrence = useRef(null);

  let [cards, setsCards] = useState(getAllNewCardValues());

  let cardsElements = cards.map((data) => (
    <Card
      value={data.value}
      key={data.id}
      isHeld={data.isHeld}
      onHold={() => {
        hold(data.id);
      }}
    />
  ));
  let gameWon = cards.every(
    (card) => card.isHeld && card.value === cards[0].value,
  );
  useEffect(() => {
    rollRefenrence.current.focus();
  }, [gameWon]);
  function hold(id) {
    setsCards((oldCards) => {
      return oldCards.map((card) => {
        if (card.id === id) {
          return { ...card, isHeld: !card.isHeld };
        }
        return card;
      });
    });
  }
  function getAllNewCardValues() {
    return new Array(10).fill(0).map((n) => {
      return {
        value: Math.floor(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });
  }
  function handleRoll() {
    if (!gameWon)
      setsCards((oldCards) => {
        return oldCards.map((card) => {
          if (card.isHeld) return card;
          else return { ...card, value: Math.floor(Math.random() * 6) };
        });
      });
    else {
      setsCards(getAllNewCardValues());
    }
  }

  return (
    <main className="grid items-center">
      {gameWon && <Confetti />}
      <h1 className="text-4xl font-bold text-center py-4">Tenzies</h1>
      <p className="text-center">
        Roll until all the dice are the same Click each dice to freeze it at
        it's current value betwen rolls
      </p>
      <div className="grid grid-cols-5 place-content-center w-fit mx-auto">
        {...cardsElements}
      </div>
      <button
        className="mx-auto bg-blue-700 text-white px-8 py-2 rounded-xl cursor-pointer"
        onClick={handleRoll}
        ref={rollRefenrence}
      >
        {gameWon ? "New Game" : "RollDice"}
      </button>
    </main>
  );
}

export default App;
