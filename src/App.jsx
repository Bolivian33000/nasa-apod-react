import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {

  //Now, since we have fetched all of the data we need from the APOD API, we are going to define a new state
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false) // sets the sidebard to false; we are trying to make it modal. 
  
  //Below we incorporate some JavaScript logic to ask: if showModal, when we render the SideBar
  // Conditionally rendered
  
  // Only when showmodal is true do we render the sideBar
  
  
  function handleToggleModal() {
    
    setShowModal(!showModal)  // handles a new state (using the setter function). This assings a new state to the variable showModal
    
    
  }
  
  
  // In order to fetch data from an API, we use a useEffect hook:
  
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + 
      `?api_key=${NASA_KEY}`


      const today = (new Date()).toDateString() // creates a unique identifier for today's date 
      const localKey = `NASA-${today}` // creates key with today's date
      if (localStorage.getItem(localKey)) { // checks if today's key, localKey, exists in local storage
      // We are instantiating the date class
        const apiData = JSON.parse(localStorage.getItem
        (localKey)) // if localKey exists, this retrieves and parses data from storage
        setData(apiData) // updates React state "data" with apiData
        console.log('Fetched from cache today')
        return 
      }

      localStorage.clear() // clears local storage if today's localKey does not exists


      try {
        const res = await fetch(url)
        const apiData = await res.json()
        //once we've found the API data, we want to set localStorage to the parsed JSON data in localKey:
        localStorage.setItem(localKey, JSON.stringify
          (apiData)) // saves fetched api to localStorage
        setData(apiData) // updates our with the information from the API
        console.log('Fetched from API today')      
      } catch(err) {
      console.log(err.message)
      }
    }

    // now, we need to call the fetchAPIData function that we just created
    fetchAPIData()

  }, []) // The blank [] dependency array indicates that we want to run our function within useEffect whenever our page loads



  return (
    <>
      {data ? (<Main data={data}/>): ( // ? us a conditional operator
        <div className = "loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>

      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal}>askldf</SideBar> //data from our stateful variable can be passed in as a prop to everything -- SideBar and Footer
      )}
      {data && ( 
        <Footer data={data} handleToggleModal={handleToggleModal}/>  )}
    </>
  )
}
// ^ showModal is a prop above -- an attribute to the component

export default App




// Great progress! I am learning more about stateful variablesn




// At 1:23:06 on the Smoljames video. I am trying to figure out how to make the modal dissappear when clikcing the bgOverlay 
// from the SideBar.jsx component


// Made it to about 1:37:11 on the Smoljames video titled: React.JS Full Course - Build 4 Projects in 5 Hours | Zero to Hero



// Need to figure out why there is no image attribute in my data from the API