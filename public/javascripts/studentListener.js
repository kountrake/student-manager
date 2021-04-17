import {
    retrieveCreateFormData,
    retrieveUpdateFormData,
    generateNewStudentLineInTable,
    setupUpdate,
    cancelUpdate,
    displayMessage
} from './utils.js'

const setupListeners =
    () => {
        const form = document.getElementById("submit");
            form.addEventListener('click', () => createStudent())
        const submitButton = document.getElementById("update_student");
            submitButton.addEventListener('click', () => updateStudent())
        const updates = document.getElementsByClassName("put");
        Array.from(updates)
            .forEach( button => button.addEventListener('click', () => setupUpdate(JSON.parse(button.dataset.student))));

        const deletes = document.getElementsByClassName("delete");
        Array.from(deletes)
            .forEach( button => button.addEventListener('click', () => deleteStudent(button.dataset.studentid)));
    }

window.addEventListener('DOMContentLoaded', setupListeners);

// PUT
const updateStudent =
    async () => {
        const data = retrieveUpdateFormData()
        if ( data === null) {
            displayMessage({
                'type' : 'error',
                'message' : 'Le champs Nom doit être renseigné'
            });
            return ;
        }
        let requestOptions = {
            method :'PUT',
            headers : { "Content-Type": "application/json" },
            body : data
        };
        const response = await fetch(`http://127.0.0.1:3000/etudiants/`, requestOptions);
        const res = await response.json()
        const student = res.student
        const tr = document.getElementById(student._id)
        tr.children[0].innerText = student.lastname
        tr.children[1].innerText = student.firstnames
        cancelUpdate()
        displayMessage(res.message)
    }

// DELETE
const deleteStudent =
    async (studentId) => {
        const requestOptions = {
            method :'DELETE'
        };
        await fetch(`http://127.0.0.1:3000/etudiants/${studentId}`, requestOptions);
        displayMessage(
            {
                'type' : 'success',
                'message' : "L'étudiant a bien été supprimé de la base de donnée."
            }
        )
        let elem = document.getElementById(studentId);
        elem.remove();
        cancelUpdate();
    }

// POST
const createStudent =
    async () => {
        const data = retrieveCreateFormData();
        if ( data === 'lastname') {
            displayMessage({
                'type' : 'error',
                'message' : 'Le champs Nom doit être renseigné'
            });
            return;
        }
        if ( data === 'number') {
            displayMessage({
                'type' : 'error',
                'message' : 'Le champs N° Étudiant doit être renseigné'
            });
            return;
        }
        let requestOptions = {
            method :'POST',
            headers : { "Content-Type": "application/json" },
            body : data
        };
        const response = await fetch(`http://127.0.0.1:3000/etudiants/`, requestOptions);
        const res = await response.json()
        const student = res.student
        console.log(student)
        if (student === null){
            displayMessage(res.message)
        } else {
            generateNewStudentLineInTable(student);
            setupListeners()
            displayMessage(res.message)
        }
}
