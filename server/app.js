require('dotenv').config();
const express = require('express')
const { sequelize, Author, Book } = require('./models')
const { Op } = require('sequelize');
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}));

///ROUTES

///ADD authors
app.post('/addauthors', async (req, res) => {
    const { name, dob, age } = req.body;

    try {
        const author = await Author.create({ name, dob, age });
        res.json(author);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

})

///GET authors
app.get('/authors', async (req, res) => {
    try {
        const authors = await Author.findAll({ include: 'books' });
        res.json(authors);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

/// Get author by name
app.get('/authors/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const authors = await Author.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: 'books'
        });
        if (authors) {
            res.json(authors);
        } else {
            res.status(404).json({ message: 'Authors not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

///GET ONE AUTHOR BY UUID
app.get('/author/:uuid', async (req, res) => {
    const { uuid } = req.params;
    try {
        const author = await Author.findOne({ where: { uuid }, include: 'books' });

        if (author) {
            res.json(author);
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


///EDIT AUTHOR
app.put('/author/:uuid', async (req, res) => {
    try {
        const uuid = req.params.uuid;
        const { name, dob, age } = req.body;

        const author = await Author.findOne({ where: { uuid } });


        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        author.name = name;
        author.dob = dob;
        author.age = age;

        await author.save();

        return res.json({ message: "Author updated", author });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

///DELETE AUTHOR
app.delete('/author/:uuid', async (req, res) => {
    try {
        const uuid = req.params.uuid;
        const author = await Author.findOne({ where: { uuid } });

        if (!author) {
            return res.status(404).json({ message: 'No author found' });
        }

        await author.destroy();

        return res.json({ message: 'Author deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



/// ADD Book
app.post('/addbook', async (req, res) => {
    const { authorName, bookName, selfNumber, genre } = req.body

    try {
        const author = await Author.findOne({ where: { name: authorName } })

        const book = await Book.create({ bookName, selfNumber, genre, authorId: author.id })

        res.json(book)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

///GET BOOKS
app.get('/books', async (req, res) => {
    try {
        const books = await Book.findAll({ include: 'author' })

        res.json(books)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

///GET BOOKs by name
app.get('/books/:bookName', async (req, res) => {
    const { bookName } = req.params;
    try {
        const book = await Book.findAll({
            where: { bookName: { [Op.iLike]: `%${bookName}%` } },
            include: 'author'
        });
        if (book) {
            res.json(book);
        }
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

///GET ONE BOOK BY UUID
app.get('/book/:uuid', async (req, res) => {
    const { uuid } = req.params;
    try {
        const book = await Book.findOne({ where: { uuid }, include: 'author' });

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

///EDIT BOOK
app.put('/book/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const { bookName, authorName, selfNumber, genre } = req.body;
    try {
        const book = await Book.findOne({ where: { uuid } });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        book.bookName = bookName;
        book.authorName = authorName;
        book.selfNumber = selfNumber;
        book.genre = genre;
        await book.save();
        return res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


///DELETE BOOKS
app.delete('/books/:uuid', async (req, res) => {
    try {
        const uuid = req.params.uuid;
        const book = await Book.findOne({ where: { uuid } });

        if (!book) {
            return res.status(404).json({ message: 'No book found' });
        }

        await book.destroy();

        return res.json({ message: 'Book deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000');
    await sequelize.authenticate()
    console.log('Database Connected!');
})


