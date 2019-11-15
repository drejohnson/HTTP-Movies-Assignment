import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialState = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = () => {
  const [movie, setMovie] = useState(initialState);
  const { id } = useParams();
  const history = useHistory();
  const handleChange = e => {
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        setMovie(res.data);
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  const handleStars = event => {
    setMovie({
      ...movie,
      stars: [event.target.value]
    });
  };

  if (movie.length === 0) {
    return <h2>Loading data...</h2>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="director">Director:</label>
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="metascore">Meta-Score:</label>
        <input
          type="text"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="stars">Stars:</label>
        <input
          type="text"
          name="stars"
          value={movie.stars}
          onChange={handleStars}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateMovie;
