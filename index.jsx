export function App(props){

  const [state, setState] = useState();

  const onUpdate = (event) => {
    setState(event.target.value);
  }
  return (
    <div>
      <h1>Hello my name is {props.name}</h1>
    </div>
  )
}
