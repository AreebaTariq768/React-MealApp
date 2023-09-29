import React from 'react'

import {useGlobalContext} from '../context';

const Meals = () => {
  const context = useGlobalContext()
  return <h1>Meals Component</h1>
}

export default Meals

