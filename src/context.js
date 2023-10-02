import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppContext = React.createContext();


const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState("false");
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null)

  const [favorites, setFavorites] = useState([]);


  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }

    }
    catch (e) {
      console.log(e.response)
    }

    setLoading(false)
  }

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavorites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)
  }
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites)
  }


  useEffect(() => {
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])


  return (
    <AppContext.Provider
    value={{ loading, meals, setSearchTerm ,showModal,selectMeal, selectedMeal ,closeModal ,favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </AppContext.Provider>

  )
}



export const useGlobalContext = () => {
  return useContext(AppContext)
}


export { AppContext, AppProvider }