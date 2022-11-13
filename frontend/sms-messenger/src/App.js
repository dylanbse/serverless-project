import { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';


function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testToggle, setTestToggle] = useState(false)


  const apiUrl = 
    "https://34h7846bja.execute-api.eu-west-1.amazonaws.com/publish"

//   const request = {
//     "payload": {
//         "phoneNumber": "+447932857640",
//         "message": "You smell"
//     }
// }

//  const res = await postData(api, request)
//   .then((data) => {
//     console.log(data); // JSON data parsed by `data.json()` call
//   });

  useEffect(() => {
    const postData = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 
          JSON.stringify({
          "payload": {
              "phoneNumber": "+447932857640",
              "message": "You smell"
          }
      })
    };
      try {
        const response = await 
          fetch(apiUrl, requestOptions)

        
          console.log(response)
        
        if(!response.ok) {
          throw new 
            Error(`HTTP response error, the status code is: ${response.status}`)
        }

        const data = await response.json()
        setData(data)
        setError(null)
        console.log(data)

      }
      catch(e) {
        setError(e.message)
        setData(null)
        console.log(`Error: ${e.message}`)
      }
    }

    postData()
  }, [testToggle])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          className="App-link"
          onClick={() => setTestToggle(!testToggle)}
        >
          Click here to send notification
        </button>

      </header>

    </div>
  );
}
export default App;
