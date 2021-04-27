import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';
//https://github.com/toandriottibertoni/react-netflix-clone-ui

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeatureData] = useState(null);
    useEffect(() => {
        const loadAll = async () => {
          //Pegando a Lista Total
            let list = await Tmdb.getHomeList();
            //console.log(list);
            setMovieList(list);


          //Pegando o Featured
            let originals = list.filter(i=>i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeatureData(chosenInfo);
        }
        loadAll();
    }, []);

    return (
        <div className="page">

        <Header />


        {featuredData && 
          <FeatureMovie item={featuredData}/>
        }


          <section className="lists">
            {movieList.map((item, key)=>(
              <MovieRow key={key} title={item.title} items={item.items} />
            ))}
          </section>
        </div>
    );
}