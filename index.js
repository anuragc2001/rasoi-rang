const express = require('express');
require('dotenv').config();
require('./app/db/conn');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('body-parser');

// const mongodbStore = require('connect-mongodb-session')(session);
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

// const userRoute = require('./routes/user.route');
// const complaintRoute = require('./routes/complaint.route');
// const adminRoute = require('./routes/admin.route');
// const policeRoute = require('./routes/police.route');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const views_path = path.join(__dirname, "/app/views");
const static_path = path.join(__dirname, "/app/static");

// const store = new mongodbStore({
//     uri: process.env.MONGO_URI,
//     collection: 'sessions'
// })

app.use(cors({
    origin: '*'
}));

// app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false, store: store, cookie: {maxAge: 12 * 60 * 60 * 1000}}))

app.use("/static", express.static(static_path));
app.use(express.json());
app.use(urlencoded({ extended: true }));
// app.use(cookieParser(process.env.SECRET_KEY));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.set("views", views_path);

app.get('/', function(req, res){
    // res.send('Hello World');
    res.render('index');
});

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
})