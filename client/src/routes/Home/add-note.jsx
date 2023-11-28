import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AddNote() {
  const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/notes`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link to="/" className="back-button">
        ⬅Back
      </Link>

      <form onSubmit={addNote}>
        <div className="single-note">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
              className="title"
            ></input>
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              rows="4"
              cols="10"
              className="description"
              placeholder="Description"
            ></textarea>
          </div>
        </div>
        <input
          type="submit"
          value={submitted ? "Saving Note..." : " 💾 Save Note"}
          disabled={submitted}
        />
        <p className="text-center">
          {submitted && (
            <div className="success-message">Note has been added</div>
          )}
        </p>
      </form>
    </>
  );
}

export default AddNote;
