const libraryDiv = document.querySelector('.library');
const newBookBtn = document.querySelector('.newBookBtn');

const form = document.querySelector('.form');
const submitNewBookForm = document.getElementById('submitNewBookForm');
const newBookSubmit = document.querySelector('#newBookSubmit');

const library = [];
let newBook;

const overlay = document.querySelector('.overlay');

class Book {
    constructor(title, author, numPages, haveRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.haveRead = haveRead;
    }
}

newBookBtn.addEventListener("click", e => {
    e.preventDefault();
    form.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
})

newBookSubmit.addEventListener("click", addBookToLibrary);

function addBookToLibrary(e) {
    e.preventDefault();
    if(submitNewBookForm.checkValidity()) {
        newBook = new Book(title, author, numPages, haveRead);
        library.push(newBook);
        renderBooks();
    } else {
        return false;
    }
}

function renderBooks() {
    // Clear books first to avoid duplicates
    while(libraryDiv.firstChild) {
        libraryDiv.removeChild(libraryDiv.lastChild);
    }
    for(let i = 0; i < library.length; i++) {
        createBook(library[i]);
    }
}


function createBook(i) {
    const bookDiv = document.createElement('section');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const numPagesDiv = document.createElement('div');
    const haveReadDiv = document.createElement('div');
    const removeBookBtn = document.createElement('span');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('data-book_id', library.indexOf(i));

    titleDiv.classList.add('title');
    titleDiv.textContent = i.title.value;
    bookDiv.appendChild(titleDiv);

    authorDiv.classList.add('author');
    authorDiv.textContent = i.author.value;
    bookDiv.appendChild(authorDiv);

    numPagesDiv.classList.add('numPages');
    numPagesDiv.textContent = i.numPages.value;
    bookDiv.appendChild(numPagesDiv);

    haveReadDiv.classList.add('haveRead');
    bookDiv.appendChild(haveReadDiv);
    if(!i.haveRead.checked) {
        haveReadDiv.textContent = 'Not read';
    } else {
        haveReadDiv.textContent = 'Read';
    }

    removeBookBtn.classList.add('.removeBookBtn');
    bookDiv.appendChild(removeBookBtn);

    libraryDiv.appendChild(bookDiv);
}