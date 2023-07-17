const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const vacancyRoutes = require('./routes/vacancyRoutes')
const companyRoutes = require('./routes/companyRoutes');
const messageRoutes  = require('./routes/messageRoutes');
const cors = require('cors')
const { Server } = require("socket.io");
const socket = require("./modules/socket");
const http = require('http');

const { requireAuth, checkUser } = require('./middlewares/authMiddlewares');

const app = express(); 
const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://unisearchapp.netlify.app', 'https://checkinguni.netlify.app'],
        credentials: true,
      },
});



app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://unisearchapp.netlify.app', 'https://checkinguni.netlify.app'], // Add the origins you want to allow
       credentials: true, // Allow credentials (e.g., cookies, HTTP authentication)
   }))

app.use(authRoutes);
app.use(companyRoutes);
app.use(vacancyRoutes)
app.use(messageRoutes)

const PORT = 8830;
const dbURI = "mongodb+srv://isa:77ruIwO0WFRsdQ7J@cluster0.fhtwa.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((result) => {
    console.log('DB is connected...')
})
.catch((err) => {
    console.log(err);
}) 


socket(io);

server.listen(PORT, () => {
    console.log(`Server starts on ${PORT}...`);
}); 



app.get('*', checkUser );

app.get('/test', requireAuth, (req, res) => {
    res.send({message: "next page"})
})