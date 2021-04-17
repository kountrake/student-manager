const retrieveCreateFormData = () => {
    const lastname = document.getElementById('lastname_create');
    const number = document.getElementById('number_create');
    if (lastname.value ==='') {
        return 'lastname';
    }
    if (number.value === '') {
        return 'number';
    }
    const firstnames = document.getElementById('firstnames_create');
    let firstnamesValue = shapingFirstnames(firstnames)
    const student = {
        'lastname': lastname.value,
        'firstnames': firstnamesValue,
        'number': number.value
    }
    lastname.value ='';
    firstnames.value ='';
    number.value ='';
    return JSON.stringify(student);
}

const retrieveUpdateFormData = () => {
    const lastname = document.getElementById('lastname_update');
    if (lastname.value ==='') {
        return null;
    }
    const firstnames = document.getElementById('firstnames_update');
    const id = document.getElementById('update_student_id');
    const firstnamesValue = shapingFirstnames(firstnames);
    const student = {
        'id' : id.value,
        'lastname': lastname.value,
        'firstnames': firstnamesValue,
    }
    return JSON.stringify(student);
}

const generateNewStudentLineInTable = (student) => {
    const tbody = document.querySelector('tbody')
    const tr = generateStudentTr(student)
    let buttons = document.createElement('td')
    let modifier = document.createElement('button')
    modifier.setAttribute('data-studentid', student._id)
    modifier.setAttribute('data-student', JSON.stringify(student))
    modifier.classList.add('put', 'mr-3', 'focus:outline-none', 'text-white', 'text-sm', 'py-1.5', 'px-2', 'rounded-md', 'bg-yellow-500', 'hover:bg-yellow-600', 'hover:shadow-lg')
    modifier.innerText = 'Modifier'
    let supprimer = document.createElement('button')
    supprimer.classList.add('delete', 'focus:outline-none', 'text-white', 'text-sm', 'py-1.5', 'px-2', 'rounded-md', 'bg-red-500', 'hover:bg-red-600', 'hover:shadow-lg')
    supprimer.innerText = 'Supprimer'
    supprimer.setAttribute('data-studentid', student._id)
    buttons.appendChild(modifier)
    buttons.appendChild(supprimer)
    tr.appendChild(buttons)
    tbody.appendChild(tr)
}

const buildElement = (tag, content='', ...cssClass) => {
    const element = document.createElement(tag);
    if (cssClass.length !== 0)
        element.className = cssClass.join(',');
    element.textContent = content;
    return element;
}

function fillUpdateForm(student) {
    const idInput = document.getElementById('update_student_id')
    const lastnameInput = document.getElementById('lastname_update');
    const firstnamesInput = document.getElementById('firstnames_update');
    const numberInput = document.getElementById('number_update');
    idInput.value = student._id
    lastnameInput.value = student.lastname
    firstnamesInput.value = student.firstnames
    numberInput.value = student.number
}

const setupUpdate = (student) => {
    fillUpdateForm(student);
    const createForm = document.getElementById('create_form')
    const updateForm = document.getElementById('update_form')
    createForm.style = 'display:none;'
    updateForm.style = ''
}

const cancelUpdate = () => {
    const createForm = document.getElementById('create_form')
    const updateForm = document.getElementById('update_form')
    createForm.style =  ''
    updateForm.style = 'display:none;'
}

function shapingFirstnames(firstnames) {
    let firstnamesValue = firstnames.value
    let tab = firstnamesValue.split(',')
    for (let i in tab) {
        tab[i] = tab[i].trim();
        tab[i] = tab[i].charAt(0).toUpperCase() + tab[i].slice(1);
    }
    return tab.join(',');
}

const displayMessage = (message) => {
    const divMessage = document.getElementById('message')
    divMessage.style = '';
    if (message.type === 'error') {
        const p = document.getElementById('error')
        p.innerText = message.message
        p.style = '';
    } else {
        const p = document.getElementById('success')
        p.innerText = message.message
        p.style = '';
    }
    setTimeout(() => {
        document.getElementById('message').style = 'display:none;';
        document.getElementById('error').style = 'display:none;';
        document.getElementById('success').style = 'display:none;';
    }, 3000)
}

const setSelectedGroupNumber = (groupNb) => {
    const span = document.getElementById('span')
    if (groupNb === '0') {
        span.innerText = ' aucun groupe'
    } else {
        span.innerText = groupNb
    }

}

const generateTable = (students, groupNb) => {
    const table = document.getElementById('students_in_group')
    const old = document.getElementById('tbody')
    old !== null ? old.remove() : null
    const tbody = buildElement(
        'tbody',
        '',
        "bg-white"
    )
    tbody.setAttribute('id', 'tbody')
    Array.from(students).forEach(student => {
        const line = generateGroupTableLine(student, groupNb)
        tbody.appendChild(line)
    })
    table.appendChild(tbody)
}

function generateStudentTr(student) {
    const tr = document.createElement('tr')
    tr.id = student._id
    tr.appendChild(buildElement(
        'td',
        student.lastname,
        "lastname px-6 py-4 whitespace-no-wrap border-b border-gray-500"
    ))
    tr.appendChild(buildElement(
        'td',
        student.firstnames,
        "firstnames px-6 py-4 whitespace-no-wrap border-b border-gray-500"
    ))
    tr.appendChild(buildElement(
        'td',
        student.number,
        "number px-6 py-4 whitespace-no-wrap border-b border-gray-500"
    ))
    return tr;
}

const generateGroupTableLine = (student, groupNb) => {
    const tr = generateStudentTr(student);
    let action = generateActions(student, groupNb);
    tr.appendChild(action)
    return tr;
}

function generateActions(student, groupNb) {
    let action = document.createElement('td')
    if (groupNb === '0') {
        for (let i = 1; i <= 6; i++) {
            let gr = document.createElement('button')
            gr.setAttribute('class', 'groupe_add p-2 border border-blue-600 rounded-full mx-1')
            gr.setAttribute('data-groupId', i)
            gr.setAttribute('data-studentId', student._id)
            gr.innerText = i
            action.appendChild(gr)
        }
    } else {
        let remove = document.createElement('button')
        remove.setAttribute('data-studentid', student._id)
        remove.classList.add('groupe_remove', 'mr-3', 'focus:outline-none', 'text-white', 'text-sm', 'py-1.5', 'px-2', 'rounded-md', 'bg-yellow-500', 'hover:bg-yellow-600', 'hover:shadow-lg')
        remove.innerText = 'Enlever'
        action.appendChild(remove)
    }
    return action;
}

export {
    retrieveCreateFormData,
    retrieveUpdateFormData,
    generateNewStudentLineInTable,
    setupUpdate,
    cancelUpdate,
    displayMessage,
    setSelectedGroupNumber,
    generateTable
};
