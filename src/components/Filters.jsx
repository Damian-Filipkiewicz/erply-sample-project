import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from "./TextInput";
import useDebounce from "../hooks/useDebounce";

export const Filters = ({setFilters}) => {

  const [filterName, setFilterName] = useState([])
  const debouncedValue = useDebounce(filterName, 500)
  const didMountRef = useRef(false)

  const handleFilterInput = (value, filter_name) => {
    if (!value) return setFilterName([])
    setFilterName([[ filter_name, "contains", value ]])
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
    } else {
      setFilters(prev => ({...prev, filter: filterName}))
    }
  }, [debouncedValue])

  return (
    <div className="filters">
      <TextInput placeholder="Search for product" className="filters__input" inputName={'name.en'} onInput={handleFilterInput} />
    </div>
  )
}