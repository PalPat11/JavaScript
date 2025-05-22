import * as db from './util/database.js';
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const db = new sqlite3.Database('database.db', (err) => {
    if (err) return console.error(err.message);
    console.log('✅ Kapcsolódva az SQLite adatbázishoz.');
  });


app.get('/api/blogs', (req, res) => {
    try{
        const blogs = db.getAllBlogs();
        res.status(200).json(blogs);
    }
    catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    try {
        const blog = db.getBlogById(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/api/blogs', (req, res) => {
    const { author, title, category, content } = req.body;
    try {
        const newBlog = db.createBlog(author, title, category, content);
        res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.put('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    const { author, title, category, content } = req.body;
    try {
        const updatedBlog = db.updateBlog(id, author, title, category, content);
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.delete('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = db.deleteBlog(id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(deletedBlog);
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});