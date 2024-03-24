const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

const upload = multer({ dest: 'uploads/' }); // Files saved to 'uploads' directory

app.use(cors()); // Enable CORS

app.post('/upload', upload.single('file'), (req, res) => {
    console.log('Uploaded file:', req.file);
    res.json({ message: 'File uploaded successfully', fileName: req.file.filename });
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where files should be stored
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const PORT = 3000; // Ensure this matches the port in your fetch URL
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));