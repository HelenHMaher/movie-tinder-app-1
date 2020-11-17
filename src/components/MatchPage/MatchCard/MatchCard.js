import React, { useState, useEffect, useRef } from 'react';
import { Flip } from '../../styleElements/icons';
import './MatchCard.css';

//Dummy Data can be removed when backend route has been built
import { dummyData } from './dummyData';

export const MatchCard = ({ decision, reset }) => {
  const [currentFilm, setCurrentFilm] = useState({
    id: '',
    rank: '',
    title: '',
    fullTitle: '',
    year: '',
    image: '',
    crew: '',
    imDbRating: '',
    imDbRatingCount: '',
  });
  const [filmArray, setFilmArray] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  //show movie info or show movie poster (default is show poster)
  const toggleInfo = () => setShowInfo(!showInfo);

  //isMounted makes sure that the setCurrentFilm only runs after
  //the filmArray has loaded (and not on mount)
  const isMounted = useRef(false);

  //should be replaced with an axios call to the backend
  const getFilms = () => {
    const films = [];
    for (let i = 0; i < 5; i++) {
      films.push(dummyData[Math.floor(Math.random() * dummyData.length)]);
    }
    return films;
  };

  //concates the newArray to end of the filmArray when the filmArray is < 5
  useEffect(() => {
    if (filmArray.length < 5) {
      const newArray = getFilms();
      setFilmArray([...filmArray, ...newArray]);
    }
  }, [filmArray]);

  //sets the currentFilm to be the first film in the filmArray
  useEffect(() => {
    if (isMounted.current) {
      setCurrentFilm(filmArray[0]);
    } else {
      isMounted.current = true;
    }
  }, [filmArray]);

  //when a decision is made
  useEffect(() => {
    if (decision === 'like') {
      console.log('enter like: ' + filmArray[0]['title']);
      setFilmArray(filmArray.slice(1));
      setShowInfo(false);
      reset();
    }
    if (decision === 'dislike') {
      console.log('enter dislike: ' + filmArray[0]['title']);
      setFilmArray(filmArray.slice(1));
      setShowInfo(false);
      reset();
    }
  }, [decision, reset, filmArray]);

  return (
    <div className="matchCard">
      <div
        className="matchCard__current"
        style={
          showInfo ? null : { backgroundImage: `url(${currentFilm['image']})` }
        }
      >
        <div className="matchCard__button" onClick={toggleInfo}>
          <Flip />
        </div>
        <div
          className="matchCard__info"
          style={showInfo ? null : { display: `none` }}
        >
          <div className="matchCard__title">{currentFilm['title']}</div>
          <div className="matchCard__details">
            <p>Release year</p>
            <div>{currentFilm['year']}</div>

            <p>Crew</p>
            <div>{currentFilm['crew']}</div>

            <p>imDb Rating</p>
            <div>{currentFilm['imDbRating']}</div>
          </div>
        </div>
      </div>
      <div className="matchCard__bg1"></div>
      <div className="matchCard__bg2"></div>
    </div>
  );
};
