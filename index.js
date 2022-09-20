const express = require('express');
const http = require('http');
const path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const server = http.createServer(app);
const port = 3001;
const courseRoutes = require('./routes/course');
app.use(courseRoutes);
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
  

server.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})