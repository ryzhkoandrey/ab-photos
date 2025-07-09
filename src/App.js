import React from 'react';
import './index.scss';
import Collection from './Collection';

const cats = [
   { name: 'Все' },
   { name: 'Море' },
   { name: 'Горы' },
   { name: 'Архитектура' },
   { name: 'Города' },
];

function App() {
   const [categoryId, setCategoryId] = React.useState(0);
   const [isLoading, setIsLoading] = React.useState(true);
   const [searchValue, setSearchValue] = React.useState('');
   const [collections, setCollections] = React.useState([]);

   React.useEffect(() => {
      setIsLoading(true);
      fetch(
         `https://686d7addc9090c4953866e5a.mockapi.io/photo_collections${
            categoryId ? `?category=${categoryId}` : ''
         }`
      )
         .then((res) => res.json())
         .then((json) => setCollections(json))
         .catch((err) => {
            console.warn(err);
            alert('Ошибка при получении данных');
         })
         .finally(() => setIsLoading(false));
   }, [categoryId]);

   return (
      <div className="App">
         <h1>Моя коллекция фотографий</h1>

         <div className="top">
            {/* categories */}
            <ul className="tags">
               {cats.map((cat, index) => (
                  <li
                     onClick={() => setCategoryId(index)}
                     className={categoryId === index ? 'active' : null}
                     key={index}
                  >
                     {cat.name}
                  </li>
               ))}
            </ul>

            {/* search */}
            <input
               onChange={(e) => setSearchValue(e.target.value)}
               value={searchValue}
               className="search-input"
               placeholder="Поиск по названию"
            />
         </div>

         {/* collections */}
         <div className="content">
            {isLoading ? (
               <h2>Идет загрузка...</h2>
            ) : (
               collections
                  .filter((collection) =>
                     collection.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                  )
                  .map((collection, index) => (
                     <Collection
                        key={index}
                        name={collection?.name}
                        images={collection?.photos}
                     />
                  ))
            )}
         </div>

         {/* pagination */}
         {isLoading ? null : (
            <ul className="pagination">
               <li>1</li>
               <li className="active">2</li>
               <li>3</li>
            </ul>
         )}
      </div>
   );
}

export default App;
