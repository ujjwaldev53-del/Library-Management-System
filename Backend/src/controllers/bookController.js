const Book = require("../models/Book")

exports.createBook = async (req, res) => {
    try {

        const { title, author, isbn, totalCopies, genre, publishedYear } = req.body
        const newBook = await Book.create({ title, author, isbn, totalCopies, genre, publishedYear })
        return res.status(201).json({ success: true, book: newBook, message: "Book is Created Sucessfully" })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
        return res.status(200).json({ success: true, books })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

exports.updateBook = async (req, res) => {
    const bookToUpdate = req.params.id
    const { title, author, isbn, totalCopies, genre, publishedYear } = req.body
    try {

        const updatedData = {}

        if (title) {
            updatedData.title = title
        }
        if (author) {
            updatedData.author = author
        }
        if (isbn) {
            updatedData.isbn = isbn
        }
        if (totalCopies !== undefined) {
            updatedData.totalCopies = totalCopies
        }
        if (genre) {
            updatedData.genre = genre
        }
        if (publishedYear) {
            updatedData.publishedYear = publishedYear
        }


        const currentBookForUpdate = await Book.findById(bookToUpdate)
        if (!currentBookForUpdate) {
            return res.status(404).json({ success: false, message: "resource not found" })
        }
        else {
            const oldTotal = currentBookForUpdate.totalCopies
            const oldAvailable = currentBookForUpdate.availableCopies
            let newTotal
            let newAvailable
            if (totalCopies !== undefined) {
                newTotal = totalCopies
                newAvailable = oldAvailable + (newTotal - oldTotal)
                if (newAvailable < 0) {
                    newAvailable = 0
                    updatedData.availableCopies = newAvailable
                }
                else if (newAvailable > newTotal) {
                    newAvailable = newTotal
                    updatedData.availableCopies = newAvailable
                }
                else {
                    updatedData.availableCopies = newAvailable
                }

                if (newTotal !== undefined) {
                    updatedData.totalCopies = newTotal
                }

            }

        }




        const availableBooks = await Book.findByIdAndUpdate(bookToUpdate, updatedData, {
            returnDocument: 'after', runValidators: true
        })
        res.status(200).json({ success: true, book: availableBooks, message: "book updated succesfully" })

    }

    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

exports.deleteBook = async (req, res) => {
    const bookId = req.params.id
    try {
        const bookForDelete = await Book.findByIdAndDelete(bookId)
        if (!bookForDelete) {
            return res.status(404).json({ success: false, message: "Resource not Found" })
        }
        else {
            return res.status(200).json({ success: true, message: "Book deleted Succesfully" })
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

