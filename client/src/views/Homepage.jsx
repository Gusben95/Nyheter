import { useSelector, useDispatch } from 'react-redux'

export default function Homepage() {
  const stateMessage = useSelector(state => state.Message)

  return (
    <div className="homepage">
      <p>{stateMessage ? stateMessage : "Loading..."}</p>
    </div>
  )
}