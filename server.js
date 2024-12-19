const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to handle JSON and serve static files
app.use(express.json());
app.use(express.static('public'));

// Path to data storage
const DATA_FILE = 'data.json';

// Load data from JSON
const loadData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return { likes: 13000, views: 23000, comments: [] };
    }
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Save data to JSON
const saveData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// API: Get current video data
app.get('/api/video', (req, res) => {
    const data = loadData();
    res.json(data);
});

// API: Increment likes
app.post('/api/like', (req, res) => {
    const data = loadData();
    data.likes += 1; // Increment likes
    saveData(data);
    res.json({ likes: data.likes });
});

// API: Increment views
app.post('/api/view', (req, res) => {
    const data = loadData();
    data.views += 1; // Increment views
    saveData(data);
    res.json({ views: data.views });
});

// API: Add a comment
app.post('/api/comment', (req, res) => {
    const { comment } = req.body;
    const data = loadData();
    if (comment) {
        data.comments.push(comment);
        saveData(data);
        res.json({ message: 'Comment added successfully!', comments: data.comments });
    } else {
        res.status(400).json({ message: 'Comment cannot be empty' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
