import { useState, useRef } from "react";
export default function Card(props: any) {


 

  return (
    <button
      className={`${props.isHeld ? "bg-green-500" : "bg-white"} h-16 aspect-square  shadow-2xl rounded-sm m-2 flex items-center place-content-center text-4xl font-bold cursor-pointer`}
    onClick={props.onHold}
    >
      {props.value}
    </button>
  );
}
