import React, { useState } from "react";
function Create(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setNote((prev) => {
      if (name === "title") {
        return { title: value, content: prev.content };
      } else {
        return { content: value, title: prev.title };
      }
    });
  }
  function handleClick(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
  }
  return (
    <div className="create-note">
      <form className="note-form">
        <input onChange={handleChange} name="title" placeholder="Title" value={note.title} />
        <textarea onChange={handleChange} name="content" placeholder="Take a note..." rows="3" value={note.content} />
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}
export default Create;
