import React, { useState } from 'react';

// Apollo Client

import { gql } from '@apollo/client';

// Materialize

import './css/App.css'
import './css/materialize.min.css'
import 'materialize-css'

// Components

import Cards from './components/cards/cards'
import Searcher from './components/search/search'
import Filters from './components/filters/filters'
import Footer from './components/footer/footer'

function App() {

  // Array de queries. Se utiliza el query en base al index seleccionado del filters.component

  const queries = [
    gql`
     query ($name: FilterCharacter, $page: Int) {
       characters(filter: $name, page: $page) {
         results {
           id
           name
           type
           gender
           species
           image
         }
         info {
          pages
          next
          prev
        }
       }
     }`,
    gql`
     query ($name: FilterLocation, $page: Int) {
       locations(filter: $name, page: $page) {
         results {
           id
           name
           type
           dimension
           residents {
             name
             image
             id
           }
         }
         info {
          pages
          next
          prev
        }
       }
     }
     `,
    gql`
     query ($name: FilterEpisode, $page: Int) {
       episodes(filter: $name, page: $page) {
         results {
           id
           name
           air_date
           episode
           characters {
             name
             image
             id
           }
         }
         info {
          pages
          next
          prev
        }
       }
     }
     `
  ];

  // States: name es el value del input del search, page la pagina que se modifica desde el paginator
  // component y queryIndex ese index para seleccionar uno de los query del array de arriba.

  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [queryIndex, setQueryIndex] = useState(0);

  return (
    <>
      <div className='container'>

        <Searcher name={name} setName={setName} />

        <div className="row">

          <div className="col s12 m2 filters">
            <Filters
              setQueryIndex={setQueryIndex}
              setPage={setPage}
              queries={queries}
              queryIndex={queryIndex} />
          </div>

          <div className={name.length > 2 ?
            'col s12 m9 l10 cards-border' :
            'col s12 m9 l10 cards-border-h'}>
            <Cards
              queryIndex={queryIndex}
              queries={queries}
              name={name}
              page={page}
              setPage={setPage} />
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;