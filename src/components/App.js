
import React, { useEffect, useState } from 'react';
import "./App.scss";

import Hero from './Hero/Hero';
import FilterBox from './FilterBox/FilterBox';
import ResultCard from './ResultCard/ResultCard';
import Footer from './Footer/Footer';
import catalogueData from '../static/data';


export default function App() {

  const [catalogue, setCatalogue] = useState(catalogueData);
  const [filteredCatalogue, setFilteredCatalogue] = useState(catalogueData);


  const searchByTitle = e => {
    let value = e.target.value.toLowerCase();
    let filteredCatalogue = catalogue.filter(obj => obj.GameTitle.toLowerCase().includes(value))
    setFilteredCatalogue(filteredCatalogue)
  };


  const filterCatalogue = (e) => {

    let inputValues = {
      Group: [],
      Level: []
    };

    if (e.target.nodeName === 'INPUT') {

      // CLEAR SERACH FIELD OF NOT EMPTY
      document.querySelector('header input').value = '';

      [...document.querySelectorAll('.filter-box input')].forEach(input => {
        let parentId = input.parentElement.id;

        if (input.checked) {
          inputValues[parentId].push(input.value);
        }
      }
      );

      let filteredCatalogue = [];

      Object.entries(inputValues).forEach(([key, value]) => {

        value.forEach(value => {

          // TAKE CATALOUGUE AND PERFORM LOOP OBJECTS TO CHECK AN OBJ CONTAINS value
          catalogue.forEach(obj => {

            if (obj[key].includes(value)) {

              filteredCatalogue.includes(obj) ? console.log('object exist already') : filteredCatalogue.push(obj)
            }

          })
        })

      });


      if (filteredCatalogue.length) {
        setFilteredCatalogue(filteredCatalogue)
      } else {
        setFilteredCatalogue(catalogue)
      }

    }
  };


  return (

    <>
      <Hero searchByTitle={searchByTitle} />

      <section className='main'>
        <h2>9ijakids Games catalogue</h2>

        <div className='results-box'>
          <div className='left'>
            <FilterBox filterCatalogue={filterCatalogue} />
          </div>

          <div className='right'>
            {filteredCatalogue.length ?
              filteredCatalogue.map(obj => <ResultCard {...obj} />) :
              <h3 style={{ gridColumn: '1/-1' }}>No Such Game Catalogue Found</h3>}
          </div>
        </div>
      </section>
      <Footer />
    </>

  );
}

