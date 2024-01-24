// Server Creation


// import Express
const express = require('express')
const dataservice = require('./service/dataservice')


//import jsonwebtoken
const jwt = require("jsonwebtoken")


//import cors
const cors = require("cors")



// Create Server app
const app = express()


// tO parse JSON
app.use(express.json())


//To use cors to share data with other
app.use(cors({
    origin:"http://localhost:4200"
}))



// Http request resolve

// GET Requesr - to read data
app.get('/', (req, res) => {
    res.send('Get Method')
})

//POST Request - to create data
app.post('/', (req, res) => {
    res.send('post method')
})

//PUT Request - To Upadate data Completly
app.put('/', (req, res) => {
    res.send('put method')
})

//PATCH Request - To Update Data partially
app.patch('/', (req, res) => {
    res.send('patch method')
})

//DELETE Request - To Update Data partially
app.delete('/', (req, res) => {
    res.send('delete method')
})


//Application specific Middleware
const appmiddleware = (req, res, nex) => {
    // console.log("Application specific Middleware");
    nex()
}
app.use(appmiddleware)


//Router specific Middleware
const Jwtmiddleware = (req, res, nex) => {
    try {
        console.log("Router specific Middleware");
        const token = req.headers["acess"]
        const data = jwt.verify(token, "key321")
        console.log(data);
        nex()
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: "please log in"
        })

    }
}






// Bank app Request solving

// register api
app.post('/register', (req, res) => {
    console.log(req.body);
    dataservice.register(req.body.acno, req.body.pass, req.body.uname)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})

// Login api api
app.post('/login', (req, res) => {
    console.log(req.body);
    dataservice.login(req.body.acno, req.body.pass)
        //    console.log(result)

        .then(result => {
            res.status(result.statusCode).json(result)
        })
})




// Deposit api
app.post('/deposit',Jwtmiddleware, (req, res) => {
    console.log(req.body);
    const result = dataservice.deposit(req.body.acno, req.body.pass, req.body.amound)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})


// withdrow api
app.post('/withdrow',Jwtmiddleware, (req, res) => {
    console.log(req.body);
    dataservice.withdrow(req.body.acno2, req.body.pass2, req.body.amound2)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})


// transaction api
app.post('/transaction',Jwtmiddleware, (req, res) => {
    try {
        console.log(req.body);
        const result = dataservice.transaction(req.body.acno)
            .then(result => {
                res.status(result.statusCode).json(result)
            })
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: "no transaction"
        })

    }
})


// set up a Port number
app.listen(3000, () => {
    console.log('server started at port 3000');
})