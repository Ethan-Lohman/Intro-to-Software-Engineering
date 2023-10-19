import './style.css'
import { setupStudentList } from "./studentList.ts"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Exercise SimpleDB</h1>
    <div id="student_list">
    </div>
    <div id="errMessage" style="color:#F00;"></div>
    <p> SID: <input id="sidInput" type="text" size="10"> </p>
    <p> Name: <input id="nameInput" type="text" size="10"> </p>
    <p> GPA: <input id="gpaInput" type="text" size="10"> </p>
    <p> <button id="addButton">Add</button> </p>
  </div>
`

const studDiv = document.querySelector<HTMLDivElement>('#student_list')
const sidInput = document.querySelector<HTMLInputElement>('#sidInput')
const nameInput = document.querySelector<HTMLInputElement>('#nameInput')
const gpaInput = document.querySelector<HTMLInputElement>('#gpaInput')
const errMessageDiv = document.querySelector<HTMLDivElement>('#errMessage') 
const addButton = document.querySelector<HTMLButtonElement>('#addButton') 

setupStudentList(studDiv!, sidInput!, nameInput!, gpaInput!, errMessageDiv!, addButton!)
