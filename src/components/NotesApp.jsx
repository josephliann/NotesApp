import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Notes from "./Notes.jsx";
import Create from "./Create.jsx";
import { useNavigate } from "react-router-dom";

function NotesApp() {
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const API = "https://your-backend-url.onrender.com";

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchNotes() {
      try {
        const res = await axios.get(`${API}/notes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(res.data.notes);
      } catch (err) {
        console.log(err);
      }
    }

    fetchNotes();
  }, [token, navigate]);

  async function handleAddNotes(note) {
    try {
      const res = await axios.post(
        `${API}/add-note`,
        {
          title: note.title,
          content: note.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prev) => [...prev, res.data.note]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${API}/delete-note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prev) =>
        prev.filter((item) => item._id.toString() !== id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Header />
      <Create onAdd={handleAddNotes} />

      {notes.map((noteItem) => (
        <Notes
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={handleDelete}
        />
      ))}

      <Footer />
    </div>
  );
}

export default NotesApp;
