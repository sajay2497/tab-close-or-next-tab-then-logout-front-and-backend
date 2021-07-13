const express = require('express')
const app = express()
const port = 3000
const user = require('./modals/user');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/session_test';
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    //poolSize: 10
})

let connection = mongoose.connection
connection.on('err', () => {
    console.log('Error in Database Connection...')
})

connection.on('connected', () => {
    console.log('Database Connection Success...')
})
app.use(express.json());
var cors = require('cors')
app.use(cors())



app.post('/login', async (req, res) => {
    //   res.send('Hello World!'/)
    try {
        let emailu = req.body.email;
        let passwordu = req.body.password;
        // let emailu = 'ajay@gmail.com';
        // let passwordu = '123456';
        const resdata = await user.findOne({ email: emailu, password: passwordu });
        // console.log(resdata);
        if (resdata) {
            res.status(200).json({
                status: 1,
                res: resdata
            })
        } else {
            res.status(200).json({
                status: 2,
            })
        }
        // res.status(200).json({
        //     res: resdata
        // })
    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error
        })
    }
})

mongoose.set('debug', true);
mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})