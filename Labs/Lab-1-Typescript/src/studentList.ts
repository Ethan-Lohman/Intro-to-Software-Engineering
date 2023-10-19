import { SimpleDB } from "./simpledb";

type Student = {
    sid: string,
    name: string,
    gpa: number
}

export let setupStudentList = (
        studDiv: HTMLDivElement, 
        sidInput: HTMLInputElement,
        nameInput: HTMLInputElement,
        gpaInput: HTMLInputElement,
        errMessageDiv: HTMLDivElement,
        addButton: HTMLButtonElement
        ) => {

    const sdb = new SimpleDB<Student>()

    const updateList = ( studentList: Student[], badInput:string = '') => {
        if (studentList.length == 0) {
            studDiv.innerHTML = "<p> Waiting for data...</p>"
        } else {
            let result: string[] = []
            for (let aStudent of studentList) {
                result.push(`<p> sid: ${aStudent.sid}, name: ${aStudent.name}, gpa: ${aStudent.gpa} </p>`)
            }
            studDiv.innerHTML = result.join('\n')
        }
        if (badInput.length > 0) {
            errMessageDiv.innerHTML = `<p>Yikes! That's not right: ${badInput}</p>`
        } else {
            errMessageDiv.innerHTML = ""
        }
    }

    const handleClick = () => {
        const sid = sidInput.value
        const name = nameInput.value
        const gpa = parseFloat(gpaInput.value)
        let errMessage = ""

        if (Number.isNaN(gpa)) {
            errMessage = `Cannot parse: "${gpaInput.value}" as a number.`
        } else {
            sdb.setItem(sid, {sid:sid, name:name, gpa:gpa})
            sidInput.value = ""
            nameInput.value = ""
            gpaInput.value = ""
        }

        updateList(sdb.allItems(), errMessage)
    }

    addButton.addEventListener('click', () => handleClick())
    updateList([],"")
}
