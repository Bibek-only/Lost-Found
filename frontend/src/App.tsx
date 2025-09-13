import { API_ENDPOINT_DEV} from "./ApiEndPoint";
const App = () => {
  return (
    <div className='text-white bg-black text-xl'>
      <h1>Hello lets test the authentication</h1>
      <button onClick={()=>{
        //open the google login sreen
        window.location.href = `${API_ENDPOINT_DEV}/user/auth/google`;
      }}>click me to google login</button>
      
    </div>
  )
}

export default App
