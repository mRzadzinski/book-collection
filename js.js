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

function removeBookFromCollection() {

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


function displayCollection(collection) {
    collection.forEach(book => {
        // Create new row for each book
        let newClone = clone.cloneNode(true);
        tableBody.appendChild(newClone);
        let row = tableBody.lastChild.querySelectorAll('.align-middle');
        
        Object.values(book)[0];
        
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
