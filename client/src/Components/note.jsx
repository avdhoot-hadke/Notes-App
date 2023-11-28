import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Note() {
  const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/notes`;
  const [data, setData] = useState([]);
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
        setData(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data, please try again");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="notes">
          <li className="add-note-button">
            <Link to={`/add-note`}>+</Link>
          </li>

          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/note/${item._id}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Note;
