import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card.jsx'

function App() {
  const endpoint = `${import.meta.env.VITE_API_URL}posts/`;
  const [recipeData, setRecipeData] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [steps, setSteps] = useState(null);

  const createImage = (e) => {
    setFile(e.target.files[0]);
  };

  const getRecipes = () => {
    async function fetchData() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result)
        setRecipeData(result);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    }
    fetchData();
  };

  const renderRecipes = ()=> {
    return (
      recipeData.map(x => (
        <Card
          imgSrc = {x.image}
          title = {x.title}
          body = {x.body}
        />
      ))

    )
  }

  const addRecipe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(file)
    formData.append('title', name);
    formData.append('body', steps);
    formData.append('image', file);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Post created successfully:', response.data);
        getRecipes()
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
      
    <div className='button-container'>
        <button className='custom-button' onClick={getRecipes}> Get Recipe</button>
        <button className='custom-button' onClick={addRecipe}> Add Recipe</button>
      </div>
      <input type='file' accept='image/*' id='imageInput' onChange={createImage} />
      <input type='text' className='title-input' placeholder='Enter recipe name' onChange={(e) => {setName(e.target.value)}}/>
      <input type='text' className='text-input' placeholder='Enter steps' onChange={(e) => {setSteps(e.target.value)}}/>
      {/* <Card></Card> */}
      <div className='recipe-grid'>
        {renderRecipes()}
      </div>
      </div>
    </>
  );
}

export default App;
