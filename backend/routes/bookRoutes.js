import express from "express";
import {Book} from "../models/bookModels.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({message: "Enter all required fields"});
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

// Route to get all books from database

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

// Route to get one book by ID

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const book = await Book.findById(id);

    if (!book) {
      res.status(500).send({message: "No book found with that id"});
    }

    return res.status(200).json({
      BOOK: book,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

// Route to upadate a book
router.put("/:id", async (req, response) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const {id} = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return response.status(404).json({message: "Book not found"});
    }

    return response.status(200).send({message: "Book updated successfully"});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// Delete a book from mongoDB

router.delete("/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const result = await Book.findByIdAndDelete(id);
    return res.status(200).send({data: result});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

export default router;
