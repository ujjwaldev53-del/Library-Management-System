const Book = require("../models/Book")

exports.createBook = async (req,res) =>
{
    try{
 
     const {title, author,isbn, totalCopies , genre , publishedYear} =    req.body
const newBook = await Book.create({ title, author,isbn, totalCopies  , genre , publishedYear})
return res.status(201).json({success : true , book: newBook , message : "Book is Created Sucessfully"})
}
catch(error){
    return res.status(500).json({success: false , message : error.message })

}
}

exports.getAllBooks = async (req,res) =>{
    try{
        const books = await Book.find()
        return res.status(200).json({success : true , books })
    }
    catch(error){
        return res.status(500).json({success : false , message: error.message})
    }
}

exports.updateBook = async (req,res) =>{
    const bookToUpdate = req.params.id
    const {title, author, isbn, totalCopies, genre, publishedYear} = req.body
   try{
    const availableBooks = await Book.findByIdAndUpdate(bookToUpdate)
    const updatedData = {
        title  : title,
        author : author,
        isbn : isbn,
         totalCopies :  totalCopies,
          genre :   genre,
           publishedYear : publishedYear
    }
    return res.status(200).json({success: true , message : "Here is the book"})

}

catch(error){
    return res.status(400).json({success  :false , message : error.message})
}
}


