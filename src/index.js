import React from "react";
import ReactDOM from "react-dom";
import { TrelloCard } from "./TrelloCard";

const App = () => {
  return <TrelloCard />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
