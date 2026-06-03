const Borrow = require("../models/Borrow")
const Book = require("../models/Book")

exports.borrowBook = async (req, res) => {
  try {
    let userID = req.user.userID;
    let bookId = req.body.bookId;
    const existingBook = await Borrow.findOne({
      user : userID,
      book : bookId , 
      status : "borrowed"
    })
    if(existingBook ){
      return res.status(400).json({success : false , message : "You have already Borrowed this Book"})
    }else{
    const bookToBorrow = await Book.findById(bookId)
    if (!bookToBorrow) {
      return res.status(400).json({ success: false, message: "No Book found" })
    }
    else {
      if (bookToBorrow.availableCopies === 0) {
        return res.status(400).json({ success: false, message: " Sorry No Copy of selected Book  is Avialable" })

      } else {
const bookRecord = await Borrow.create({
  user : userID,
  book : bookId,
  status : "borrowed",
 
})
bookToBorrow.availableCopies -= 1;
await bookToBorrow.save();

return res.status(200).json({success : true , message : " you have borrowed the book"})

      }
    }}
  }
  catch (error) {
    return res.status(500).json({ success: false , message: error.message })
  }
}

exports.returnBook = async (req, res) => {
try{
  let bookId = req.body.bookId
  let userID = req.user.userID
const borrowRecord = await Borrow.findOne({
  user : userID,
  book : bookId,
  status : "borrowed"
})
if(borrowRecord){
  const book = await Book.findById(bookId)
  borrowRecord.returnDate = Date.now()
  try{

    const returnDate = Date.now()
    const dueDate = borrowRecord.dueDate
    if(returnDate > dueDate){
      const diffTime = Math.abs(returnDate - dueDate)
      const daysLate  =Math.ceil(diffTime / (1000*60*60*24))
      const fine = daysLate * 15
       borrowRecord.fineAmount = fine 
      await borrowRecord.save()
    }
      }
      catch(error){
        res.status(500).json({success : false , message : error.message})
      }
  borrowRecord.status = "returned"
  await borrowRecord.save()
  book.availableCopies += 1
  await book.save() 
//  await borrowRecord.save()
return res.status(200).json({success : true , message : "Book returned Sucessfully"})
}
else{
  return res .status(404).json({success : false , message : "Book not found"})
}
}
catch(error){
  return res.status(500).json({success : false , message : error.message})
}
}

exports.borrowDetails = async (req, res) => {
  
try{
  const userID = req.user.userID
  const getMyBorrow = await Borrow.find({
    user : userID,
    status : 'borrowed'
  }).populate("book")
  const validBorrows = getMyBorrow.filter(record => record.book !== null);
  return res.status(200).json({success : true , borrows : validBorrows ,message : " Here is your Borrow Details"})
}
catch(error){
  return res.status(500).json({success : false ,  message : error.message})
}
}
 
//day7 session 10


















