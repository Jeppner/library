const libraryDiv = document.querySelector('.library');
const newBookBtn = document.querySelector('.newBookBtn');

const form = document.querySelector('.form');
const submitNewBookForm = document.getElementById('submitNewBookForm');
const newBookSubmit = document.querySelector('#newBookSubmit');

const library = [];
let newBook;

const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');

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
    overlay.classList.toggle('active');
})

newBookSubmit.addEventListener("click", addBookToLibrary);

function addBookToLibrary(e) {
    e.preventDefault();
    if(submitNewBookForm.checkValidity()) {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const numPages = document.getElementById('numPages').value;
        const haveRead = document.getElementById('haveRead').checked;
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

const toggleButtons = document.querySelectorAll('.switch input[type="checkbox"]');
    toggleButtons.forEach(button => {
        button.addEventListener('change', (e) => {
            const bookId = e.target.closest('.book').getAttribute('data-book_id');
            library[bookId].haveRead = e.target.checked;
        });
    });

function createBook(book) {
    const bookDiv = document.createElement('section');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const numPagesDiv = document.createElement('div');
    const haveReadDiv = document.createElement('div');
    const readToggleLabel = document.createElement('label');
    var readToggleInput = document.createElement('input');
    const readToggleSlider = document.createElement('span');
    const removeBookBtn = document.createElement('button');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('data-book_id', library.indexOf(book));

    titleDiv.classList.add('title');
    titleDiv.textContent = book.title;
    bookDiv.appendChild(titleDiv);

    authorDiv.classList.add('author');
    authorDiv.textContent = book.author;
    bookDiv.appendChild(authorDiv);

    numPagesDiv.textContent = book.numPages + (book.numPages == 1 ? ' page' : ' pages');
    bookDiv.appendChild(numPagesDiv);

    haveReadDiv.classList.add('haveRead');
    bookDiv.appendChild(haveReadDiv);
    haveReadDiv.textContent = book.haveRead == true ? 'Read' : 'Not read';

    readToggleLabel.classList.add('switch');
    readToggleLabel.appendChild(readToggleInput);
    readToggleLabel.appendChild(readToggleSlider);
    readToggleSlider.classList.add('slider');

    readToggleInput.type = 'checkbox';
    readToggleInput.checked = book.haveRead;
    readToggleInput.addEventListener('change', e => {
        book.haveRead = e.target.checked;
        haveReadDiv.textContent = book.haveRead == true ? 'Read' : 'Not read';
    })
    haveReadDiv.appendChild(readToggleLabel);

    removeBookBtn.classList.add('removeBookBtn');
    removeBookBtn.textContent = 'Delete';
    bookDiv.appendChild(removeBookBtn);

    libraryDiv.appendChild(bookDiv);
}

closeBtn.addEventListener("click", closeForm);
overlay.addEventListener("click", closeForm);

function closeForm(e) {
    e.preventDefault();
    overlay.classList.add('hidden');
    overlay.classList.remove('active');
    form.classList.add('hidden');
    form.classList.remove('active');
}