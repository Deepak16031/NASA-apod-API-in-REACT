import {useEffect, useState} from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"

function App() {

  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchApiData() {
      console.log("hello world")

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`

      if (localStorage.getItem(localKey)) {
        const localData = JSON.parse(localStorage.getItem(localKey))
        setData(localData)
        console.log("Fetched data from cache")
        return
      }
      localStorage.clear()

      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`
      try {
        const response = await fetch(url)
        const apiData = await response.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log("Fetched data from API")
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchApiData()
  }, []);
  function handleToggleModal() {
    setShowModal(!showModal)
  }
  return (
    <>
      {data ? (<Main data={data}/>) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && <Sidebar data={data} handleToggleModal={handleToggleModal} />}
      {data && (<Footer data={data} handleToggleModal={handleToggleModal} />)}
    </>
  )
}

export default App
