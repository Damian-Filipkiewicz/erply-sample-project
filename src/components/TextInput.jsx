export const TextInput = ({ inputName, ...props }) => {
  return <input {...props} onInput={(event) => props.onInput(event.target.value, inputName || null)}/>
}

export const TextFilterInput = ({ inputName, filterType, filterSetFunction, ...props }) => {
  return <input {...props} onInput={(event) => props.onInput(event.target.value, inputName || null, filterType, filterSetFunction)}/>
}
