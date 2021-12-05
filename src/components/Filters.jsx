import React, { useState } from 'react';
import { Button } from './Button';
import { TextFilterInput } from "./TextInput";

export const Filters = ({setFilters}) => {

  const [filterNameProduct, setFilterNameProduct] = useState([])
  const [filterPriceFrom, setFilterPriceFrom] = useState([])
  const [filterPriceTo, setFilterPriceTo] = useState([])
  const [filterCostFrom, setFilterCostFrom] = useState([])
  const [filterCostTo, setFilterCostTo] = useState([])


  const handleFilterInput = (value, filter_name, option, setFunction) => {
    setFunction([filter_name, option, value])
  }

  const handleSearch = () => {
    const filterArray = []
    if (filterNameProduct.length && filterNameProduct[2]) filterArray.push(filterNameProduct)
    if (filterPriceFrom.length && filterPriceFrom[2]) filterArray.push(filterPriceFrom)
    if (filterPriceTo.length && filterPriceTo[2]) filterArray.push(filterPriceTo)
    if (filterCostFrom.length && filterCostFrom[2]) filterArray.push(filterCostFrom)
    if (filterCostTo.length && filterCostTo[2]) filterArray.push(filterCostTo)

    for (let i = filterArray.length -1; i >= 1; i--){
      filterArray.splice(i, 0, "and")
    }
    setFilters(prev => ({...prev, filter: filterArray}))
  }

  const handleClear = () => {
    setFilters({ sort: {}, filter: [] })
  }

  return (
    <div className="filters">
      <TextFilterInput placeholder="Search for product" className="filters__input" inputName={'name.en'} filterType={'contains'} filterSetFunction={setFilterNameProduct} onInput={handleFilterInput} />
      <TextFilterInput type="number" placeholder="Price from" className="filters__input" inputName={'price'} filterType={'>='} filterSetFunction={setFilterPriceFrom} onInput={handleFilterInput} />
      <TextFilterInput type="number" placeholder="Price to" className="filters__input" inputName={'price'} filterType={'<='} filterSetFunction={setFilterPriceTo} onInput={handleFilterInput} />
      <TextFilterInput type="number" placeholder="Cost from" className="filters__input" inputName={'cost'} filterType={'>='} filterSetFunction={setFilterCostFrom} onInput={handleFilterInput} />
      <TextFilterInput type="number" placeholder="Cost to" className="filters__input" inputName={'cost'} filterType={'<='} filterSetFunction={setFilterCostTo} onInput={handleFilterInput} />
      <Button onClick={handleClear} label="Clear"/>
      <Button onClick={handleSearch} label="Search"/>
    </div>
  )
}
