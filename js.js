function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title}, ${author}, ${pages} pages, ${read}`
    }
}

let lotr = new Book('Lord of the Rings', 'Tolkien', 370, 'read');

const myModal = document.getElementById('myModal');
