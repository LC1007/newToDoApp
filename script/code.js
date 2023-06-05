// placing the form innto formApp
let formApp = document.querySelector('#form')
// placing the input into inputField
let inputField = document.querySelector('#todo-input')
// placing the ul into ulList
let ulList = document.querySelector('.todo-list')
// let subBtn = document.querySelector('#submit')

let todoArr = []

formApp.addEventListener('click', function(e){
    e.preventDefault();
    addTodoItem(inputField.value)
})

function addTodoItem(item){
    if(item !== ''){
        let todoObject = {
            id: Date.now(),
            name: item,
            completed: false
        }

        todoArr.push(todoObject)
        addItemsToLocal(todoArr)

        inputField.value = ''
    }
}

function appendItems(todoArr){
    ulList.innerHTML = ''

    todoArr.forEach(function(item){
        let checked = item.completed ? 'checked' : null

        let li = document.createElement('li')
        li.setAttribute('class', 'item')
        li.setAttribute('data-key', item.id)

        if(item.completed === true){
            li.classList.add('done')
        }

        li.innerHTML = 
        `
        <input class="checkbox" type="checkbox" ${checked}>${item.name}
        <i class="bi bi-trash3 del-btn"></i>
        `
        ulList.append(li)
    })
}

function addItemsToLocal(){
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
    appendItems(todoArr)
}

function getItemsFromLocal(){
    let reference = localStorage.getItem('todoArr')

    if(reference){
        todoArr = JSON.parse(reference)
        appendItems(todoArr)
    }
}

getItemsFromLocal()

ulList.addEventListener('click', function(e){
    if(e.target.type === 'checkbox'){
        toggle(e.target.parentElement.getAttribute('data-key'))
    }

    if(e.target.classList.contains('del-btn')){
        delItem(e.target.parentElement.getAttribute('data-key'))
    }
})

function toggle(id){
    todoArr.forEach(function(item){
        if(item.id == id){
            item.completed = !item.completed
        }
    })
addItemsToLocal(todoArr)
}

function delItem(id){
    todoArr = todoArr.filter(function(item){
        return item.id != id
    })

    addItemsToLocal(todoArr)
}


