import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
import Axios from 'axios';
import axios from 'axios';
import base64 from 'base-64';


function App() {
  let objImg = {img : null};
  const addStudent = (e) => {
    e.preventDefault();
    let data = new FormData(document.getElementById("input-form"))
    axios({
        method : 'POST',
        url : 'http://localhost:8111/api/file/upload',
        data : data
    })
    .then((res) => {console.log(res)})
    .catch((err) => {throw err})

  }
  
  useEffect(() => {
    Axios.get("http://localhost:8111/api/file/info")
    .then(res => {
      let student = res.data;
      console.log(student[0].data.data);
      
      objImg.img = student[0].data.data;

    })
    .catch(err => {console.log(err)});
  })


  return (
  <div className="App">
      <div className = "post-form"> 
        <form id = "input-form" encType="multipart/form-data">
        <h1>Attendance Details</h1>
        <input type="text" name="name1" class="formStyle" placeholder="Name (required)" required />
        <input type="text" name="roll" class="formStyle" placeholder="Roll Number (required)" required />
    
        <input type="file" name='file' placeholder="Select file"/>
        <input onClick = {addStudent} type="submit" class="formButton" value="Upload"/>
        </form>
    </div>
    <div className = "image">
      {objImg.img =  btoa(String.fromCharCode(...new Uint8Array(objImg.img)))}
        <img src = {`data:image/png;base64, ${objImg.img}`}/>
    </div>
  </div>
  );
}

export default App;
