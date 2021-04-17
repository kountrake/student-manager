import {
    displayMessage,
    setSelectedGroupNumber,
    generateTable
} from './utils.js'

const setupListeners =
    () => {
        const addToGroup = document.getElementsByClassName("groupe_add");
        Array.from(addToGroup)
            .forEach( student => student.addEventListener('click', () => updateGroup(student.dataset.groupid, student.dataset.studentid)));

        const removeFromGroup = document.getElementsByClassName("groupe_remove");
        Array.from(removeFromGroup)
            .forEach( student => student.addEventListener('click', () => updateGroup(0, student.dataset.studentid)));

        const groupes = document.getElementsByClassName("groupe");
        Array.from(groupes)
            .forEach( groupe => groupe.addEventListener('click', () => getGroup(groupe.dataset.groupe)));

        const updates = document.getElementsByClassName("update");
        Array.from(updates)
            .forEach( update => update.addEventListener('click', () => updateGroup(update.dataset.groupe, update.dataset.studentId)));
    }

window.addEventListener('DOMContentLoaded', setupListeners);

// GET
const getGroup =
    async (groupNb) => {
        let requestOptions = {
            method :'GET'
        };
        const response = await fetch(`http://127.0.0.1:3000/groupes/${groupNb}`, requestOptions);
        const group = await response.json()
        setSelectedGroupNumber(group.groupNb)
        generateTable(group.students, group.groupNb)
        setupListeners()
    }

// PUT
const updateGroup =
    async (group, studentId) => {
        const dataset = {
            'group' : group,
            'student': studentId,
        }
        const data = JSON.stringify(dataset);
        let requestOptions = {
            method :'PUT',
            headers : { "Content-Type": "application/json" },
            body : data
        };
        const response = await fetch(`http://127.0.0.1:3000/groupes/`, requestOptions);
        const res = await response.json()
        if (res.message.type !== 'error') {

            const student = document.getElementById(studentId)
            student.remove()
        }
        displayMessage(res.message)
}
