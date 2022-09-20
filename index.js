const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const cors = require('cors');
require("dotenv").config();


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// express.static('public');
const server = http.createServer(app);
const port = process.env.PORT;
const courseRoutes = require('./routes/course');
app.use(courseRoutes);
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
  

server.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})