import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Favorites from './components/Favorites'
import { useGlobalContext } from './context'
import './App.css'
export default function App() {

  return (
    <main>
       <Search />  
      {/* <Favorites/>*/}  
      <Meals />
      {/*  <Modal /> */}  
    </main>
  )
}