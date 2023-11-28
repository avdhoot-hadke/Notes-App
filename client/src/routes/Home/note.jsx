import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/notes/${id}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch Data");
        }
        const data = await response.json();
        console.log(data);

        setTitle(data.title);
        setDescription(data.description);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data, please try again");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="breadcrump-nav">
        <Link to="/" className="back-button">
          ⬅Back
        </Link>

        <button onClick={removeNote} className="delete">
          🗑️Remove
        </button>
      </div>

      <form onSubmit={updateNote}>
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

export default UpdateNote;
