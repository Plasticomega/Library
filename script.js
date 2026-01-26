const myLibrary = [];


function Book(name, author, pages, read) {
	this.id = crypto.randomUUID()
	this.name = name;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
	const newBook = new Book(name, author, pages, read);

	myLibrary.unshift(newBook)
}
addBookToLibrary("how to", "mr john", 294, true)
addBookToLibrary("boom", "mr electric", 230, false)
addBookToLibrary("cool", "john cool", 400, true)
addBookToLibrary("sigma", "steve sigma", 69, true)


function displayBook() {
	document.querySelector('.cards').innerHTML = "";
	myLibrary.forEach(element => {
		const newBook = document.createElement('div')
		newBook.classList.add('bonba')

		const name = document.createElement('div')
		name.textContent = `Name: ${element.name}`

		const author = document.createElement('div')
		author.textContent = `Author: ${element.author}`

		const pages = document.createElement('div')
		pages.textContent = `No. of pages: ${element.pages}`

		const read = document.createElement('div')
		read.classList.add("readStatus")
		checkRead()
		read.addEventListener("click", () => {
			element.read = !element.read;
			checkRead()
		})
		newBook.appendChild(name)
		newBook.appendChild(author)
		newBook.appendChild(pages)
		newBook.appendChild(read)
		document.querySelector('.cards').appendChild(newBook)
	});
}

let dialog = document.querySelector("#bookDialog")

const addbook = document.querySelector("#openDialog")

addbook.addEventListener('click', () => {
	dialog.showModal()
	console.log("no")
})



const submitBtn = document.querySelector("#submitBtn")
const bookname = document.querySelector("#bookname")
const bookpages = document.querySelector("#bookpages")
const bookread = document.querySelector("#bookread")
const bookauthor = document.querySelector("#bookauthor")

function resetInput() {
	bookread.value = null;
	bookname.value = "";
	bookpages.value = "";
	bookauthor.value = "";
}

let form = document.querySelector('.form')

submitBtn.addEventListener('click', function(e) {
	e.preventDefault()

	if (form.checkValidity()) {
		addBookToLibrary(bookname.value, bookauthor.value, bookpages.value, bookread.checked)
		dialog.close()
		resetInput()
		displayBook()
	} else {
		form.reportValidity()
	}


})

displayBook()
