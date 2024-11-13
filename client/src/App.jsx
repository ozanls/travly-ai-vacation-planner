import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Generation from "./components/Generation";
import useDocumentTitle from "./components/useDocumentTitle";

function App() {
  useDocumentTitle("Home");

  return (
    <>
      <Nav />
      <Generation />
    </>
  );
}

export default App;
