import { useState } from 'react'
import './App.css'
// import { Sidebar } from "./components";
import Sidebar from './components/sidebar'

function App() {
    function handleClick(){
      console.log("We are in the process1")
      // window.location.href = "http://localhost:8000/"
      fetch("http://localhost:8000/testing/", {
        method : 'GET',
        headers : {
          'Content-Type':'application/json',
        }
      }).then(response => {
        console.log(response.headers.get('Access-Control-Allow-Origin'));
        console.log(response.json);
        return response.json();
      })
      console.log("We are in the process2")
    }
  
    return (
      // <TextEditor/>
      <>
      <Sidebar/>
      {/* <button onClick={() => handleClick()}>
        Yo nigga
      </button>
  
      <box value={1}>
  
      </box> */}
      </>
    );
  }
  
  export default App;