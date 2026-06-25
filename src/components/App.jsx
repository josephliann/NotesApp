import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotesApp from "./NotesApp.jsx";
import Welcome from "./Welcome.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/notes" element={<NotesApp />} />
    </Routes>
  );
}
export default App;
