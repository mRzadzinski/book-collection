const bookCollection = [];
let counter = 0;

function Book(title, author, pages, finished) {
    this.title = title
    this.author = author
    this.pages = pages
    this.finished = finished
    this.info = function() {
        return `${title}, ${author}, ${pages} pages, ${finished}`
    }
}

function addBookToCollection(book) {
    bookCollection.push(book);
}

function removeBookFromCollection(bookIndex) {
    bookCollection.splice(bookIndex, 1);
}

let dontMakeMeThink = new Book('Don\'t Make Me Think', 'Steve Krug', 216, 'NO');
let holdMeTight = new Book('Hold Me Tight', 'Sue Johnson', 320, 'YES');
let meditations = new Book('Meditations', 'Marcus Aurelius', 88, 'NO');
let taoTeChing = new Book('Tao Te Ching', 'Lao Tzu', 107, 'YES');

addBookToCollection(dontMakeMeThink);
addBookToCollection(holdMeTight);
addBookToCollection(meditations);
addBookToCollection(taoTeChing);

const tableBody = document.querySelector('tbody');
const rowTemplate = document.getElementById('row-template');
const clone = rowTemplate.cloneNode(true);
clone.removeAttribute('class');
clone.removeAttribute('id');
clone.classList.add('collection-element');

renewBookCollection();
function renewBookCollection() {
    removeOldCollection();
    displayCollection(bookCollection);
}

function removeOldCollection() {
    let oldCollection = document.querySelectorAll('.collection-element');
    oldCollection.forEach(element => element.remove());
    counter = 0;
}

function displayCollection(collection) {
    collection.forEach(book => {
        // Create new row for each book
        let newClone = clone.cloneNode(true);
        tableBody.appendChild(newClone);
        let row = tableBody.lastChild.querySelectorAll('.align-middle');
        
        // Iterate through rows and add book data
        for (let i = 0; i < row.length - 1; i++) {
            if (i === 0) {
                counter++;
                row[i].innerHTML = counter;
                continue;
            } else if (i === 4) {
                row[i].children[0].innerHTML = Object.values(book)[i - 1];
                if (Object.values(book)[i - 1] === 'YES') {
                    row[i].children[0].classList.remove('btn-outline-secondary');
                    row[i].children[0].classList.add('btn-outline-success');
                }
                continue;
            }
            row[i].innerHTML = Object.values(book)[i - 1];
        }
    });
}

setButtonsListeners();
function setButtonsListeners() {
    // Status YES/NO buttons
    let statusButtons = document.querySelectorAll('#status-button');
    statusButtons.forEach(button => button.addEventListener('click', () => {
        if (button.innerHTML === 'NO') {
            button.innerHTML = 'YES';
            button.classList.remove('btn-outline-secondary');
            button.classList.add('btn-outline-success');
        } else if (button.innerHTML === 'YES') {
            button.innerHTML = 'NO';
            button.classList.add('btn-outline-secondary');
            button.classList.remove('btn-outline-success');
        }
    }));

    //Remove position buttons
    let removeButtons = document.querySelectorAll('#remove-button');
    removeButtons.forEach(button => button.addEventListener('click', () => {
    // Find index of book to remove
    let row = button.parentNode.parentNode;
    let bookIndex = row.children[0].innerHTML;

    removeBookFromCollection(bookIndex - 1);
    row.remove();
    renewBookCollection();
    setButtonsListeners();
}));
}

let titleInput = document.querySelector('#title-input');
let authorInput = document.querySelector('#author-input');
let pagesInput = document.querySelector('#pages-input');
let finishedCheck = document.querySelector('#finished-check');
let modalAddButton = document.querySelector('#modal-add-button');
let form = document.querySelector('form');
let submitButton = document.querySelector('#submit-button');

// Create new book from modal form
modalAddButton.onclick = (e) => {
    // If any of the inputs is empty, run browser form validation check through hidden submit button
    if (!titleInput.value || !authorInput.value || !pagesInput.value) {
        submitButton.click();
    
    } else if (titleInput.value && authorInput.value && pagesInput.value) {
        let finishedStatus;
        if (finishedCheck.checked === true) {
            finishedStatus = 'YES';
        } else {
            finishedStatus = 'NO';
        }

        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, finishedStatus);
        addBookToCollection(newBook);
        renewBookCollection();
        setButtonsListeners();

        $('#myModal').modal('hide')
    }

};