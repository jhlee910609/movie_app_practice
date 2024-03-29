import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  state = {}

  componentDidMount() {
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      return <Movie
        title={movie.title_english}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis} />
    })
    return movies;
  }

  // 비동기 코드
  _getMovies = async () => {
    // await : this._callApi() 가 끝날 때까지 동작 x
    const movies = await this._callApi()
    this.setState({
      movies

    })

  }

  _callApi = () => {
    return fetch("https://yts.am/api/v2/list_movies.json?sort_by=download_count")
      .then(response => response.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err))

    // // 과거
    // fetch("https://yts.am/api/v2/list_movies.json?sort_by=rating")
    // .then()
    // .catch(function(err){
    //   console.log(err)
    // })
  }

  render() {
    const {movies} = this.state
    return (
      // jsx : Simpel HTML 
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
