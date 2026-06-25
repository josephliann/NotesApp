import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Notes from "./Notes.jsx";
import Create from "./Create.jsx";

function NotesApp() {
  const [notes, setNotes] = useState([]);

  const userId = localStorage.getItem("userId");


  useEffect(() => {
    if (!userId) return;

    async function fetchNotes() {
      try {
        const res = await axios.get(`http://localhost:3000/notes/${userId}`);
        setNotes(res.data.notes);
      } catch (err) {
        console.log(err);
      }
    }

    fetchNotes();
  }, [userId]);

  async function handleAddNotes(note) {
    try {
      const res = await axios.post("http://localhost:3000/add-note", {
        userId,
        title: note.title,
        content: note.content,
      });

      setNotes((prev) => {
        return [...prev, res.data.note];
      });
    } catch (err) {
      console.log(err);
    }
  }


  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/delete-note/${id}`);

      setNotes((prev) => {
        return prev.filter((item) => {
          return item._id.toString() !== id;
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Header />
      <Create onAdd={handleAddNotes} />

      {notes.map((noteItem) => {
        return <Notes key={noteItem._id} id={noteItem._id} title={noteItem.title} content={noteItem.content} onDelete={handleDelete} />;
      })}

      <Footer />
    </div>
  );
}

export default NotesApp;
