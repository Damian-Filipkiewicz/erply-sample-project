export const TextInput = ({ inputName, ...props }) => {
  return <input {...props} onInput={(event) => props.onInput(event.target.value, inputName || null)}/>
}
