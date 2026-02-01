const myLibrary = [];

const submitBtn = document.querySelector("#submitBtn")
const bookname = document.querySelector("#bookname")
const bookpages = document.querySelector("#bookpages")
const bookread = document.querySelector("#bookread")
const bookauthor = document.querySelector("#bookauthor")

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

function removeBookFromLibrary(uuid) {
	const index = myLibrary.findIndex(book => book.id === uuid)
	if (index > -1) (
		myLibrary.splice(index, 1)
	)
	displayBook()
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
		name.textContent = `"${element.name}"`

		const author = document.createElement('div')
		author.textContent = `${element.author}`

		const pages = document.createElement('div')
		pages.textContent = `${element.pages}`

		const read = document.createElement('div')
		read.classList.add("readStatus")
		read.style.borderRadius = "5px"
		function checkRead() {
			if (element.read === true) { read.textContent = `Read`; read.style.backgroundColor = "#b8bb26" } else { read.textContent = `Not Read`; read.style.backgroundColor = "#fb4934" }
		}
		checkRead()
		read.addEventListener("click", () => {
			element.read = !element.read;
			checkRead()
		})
		const remove = document.createElement('div')
		remove.textContent = "Remove"
		remove.style.borderRadius = "5px"
		remove.style.backgroundColor = "#fabd2f"
		remove.addEventListener("mouseover", () => remove.style.cursor = "pointer")
		remove.addEventListener("click", () => { removeBookFromLibrary(element.id) })

		newBook.appendChild(name)
		newBook.appendChild(author)
		newBook.appendChild(pages)
		newBook.appendChild(read)
		newBook.appendChild(remove)
		document.querySelector('.cards').appendChild(newBook)
	});
}

let dialog = document.querySelector("#bookDialog")

const addbook = document.querySelector("#openDialog")
const doofGif = document.querySelector("#doofGif")
const overlay = document.querySelector(".overlay")

addbook.addEventListener('click', () => {
	dialog.showModal()
	doofGif.hidden = false
	overlay.hidden = false;
})

dialog.addEventListener("close", () => {
	doofGif.hidden = true;
	overlay.hidden = true;
})


function resetInput() {
	bookread.checked = false;
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
		displayBook()
		resetInput()
		doofGif.hidden = true
		overlay.hidden = true
	} else {
		form.reportValidity()
	}


})

document.addEventListener('click', function(event) {
	let clickoutsideform = !form.contains(event.target)
	let clickoutsidebtn = !addbook.contains(event.target)
	if (dialog.open) {
		if (clickoutsidebtn && clickoutsideform) {
			dialog.close()
			doofGif.hidden = true;
			overlay.hidden = true;
			console.log("hello");
		}
	}
});



displayBook()
