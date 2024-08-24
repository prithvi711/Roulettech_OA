import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card.jsx';
import Modal from './components/modal.jsx';

function App() {
  const endpoint = `${import.meta.env.VITE_API_URL}posts/`;
  const [recipeData, setRecipeData] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [steps, setSteps] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const createImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCardClick = (data) => {
    setModalData(data); 
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getRecipes = () => {
    async function fetchData() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setRecipeData(result);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    }
    fetchData();
  };

  const addRecipe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', name);
    formData.append('body', steps);
    formData.append('image', file);

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Post created successfully:', response.data);
        getRecipes();
      } else {
        console.error('Error creating post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <div className='app'>
        <Modal trigger={showModal}onClose={handleCloseModal} data={modalData}
        />
        <div className='button-container'>
          <button className='custom-button' onClick={getRecipes}>Get Recipe</button>
          <button className='custom-button' onClick={addRecipe}>Add Recipe</button>
        </div>
        <input type='file' accept='image/*' id='imageInput' onChange={createImage} />
        <input type='text' className='title-input' placeholder='Enter recipe name' onChange={(e) => { setName(e.target.value) }} />
        <input type='text' className='text-input' placeholder='Enter steps' onChange={(e) => { setSteps(e.target.value) }} />
        <div className='recipe-grid'>
          {recipeData.map(x => (
            <Card
            key={x.id}
            imgSrc={x.image}
            title={x.title}
            body={x.body}
            recID={x.id}
            onClick={() => handleCardClick(x)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
