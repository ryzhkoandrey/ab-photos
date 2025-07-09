import React from 'react';
import './index.scss';
import Collection from './Collection';

function App() {
   const [collections, setCollections] = React.useState([]);

   React.useEffect(() => {
      fetch('https://686d7addc9090c4953866e5a.mockapi.io/photo_collections')
         .then((res) => res.json())
         .then((json) => setCollections(json))
         .catch((err) => {
            console.warn(err);
            alert('Ошибка при получении данных');
         });
   }, []);

   return (
      <div className="App">
         <h1>Моя коллекция фотографий</h1>

         <div className="top">
            <ul className="tags">
               <li className="active">Все</li>
               <li>Горы</li>
               <li>Море</li>
               <li>Архитектура</li>
               <li>Города</li>
            </ul>
            <input className="search-input" placeholder="Поиск по названию" />
         </div>

         <div className="content">
            {collections.map((collection, index) => (
               <Collection
                  key={index}
                  name={collection?.name}
                  images={collection?.photos}
               />
            ))}
         </div>

         <ul className="pagination">
            <li>1</li>
            <li className="active">2</li>
            <li>3</li>
         </ul>
      </div>
   );
}

export default App;
