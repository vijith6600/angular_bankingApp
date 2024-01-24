//import jsonwebtoken
const jwt = require("jsonwebtoken")


//import mongodb users db
const db = require('./db')

//data base
userDetails = {
    1000: { acno: 1000, userName: 'max', password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, userName: 'anu', password: 1001, balance: 7000, transaction: [] },
    1002: { acno: 1002, userName: 'athul', password: 1002, balance: 6000, transaction: [] },

}



//register
const register = (acno, password, userName) => {
    return db.User.findOne({ acno })
        .then(user => {
            if (user) {
                return {
                    statusCode: 401,
                    status: false,
                    message: "user alredy exist"
                }
            }
            else {
                const newUser = new db.User({
                    acno,
                    userName,
                    password,
                    balance: 0,
                    transaction: []
                })
                newUser.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: "Register sucessfully"
                }
            }
        })
}




const login = (acno, pass) => {
    return db.User.findOne({
        acno,
        password: pass
    })
        .then(user => {
            if (user) {
                cusername = user.userName
                cacno = acno



                //Token generation using jwt
                const token = jwt.sign({
                    cacno: acno
                }, "key321")


                return {
                    statusCode: 201,
                    status: true,
                    message: "login sucessfully",
                    token,
                    cacno,
                    cusername
                }
            }

            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "incorect username or password"
                }
            }

        })
}




// deposit function
const deposit = (acno, pass, amound) => {
    return db.User.findOne({
        acno,
        password: pass
    })
        .then(user => {
            if (user) {
                user.balance += Number(amound)
                user['transaction'].push({
                    type: 'Credit',
                    amound
                })
                user.save()
                return {
                    statusCode: 201,
                    status: true,
                    message: `${amound} credited. New balance is ${user.balance}`
                }
            }


            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "incorrect username or password"
                }
            }

        })
}



//withdrow function
const withdrow = (acno2,pass2, amound2) => {
    var amound2 = parseInt(amound2)
    return db.User.findOne({
        acno: acno2,
        password: pass2
    })
        .then(user => {
            if (user) {
                if (user.balance >= amound2) {

                    user.balance -= amound2
                    user['transaction'].push({
                        type: 'debit',
                        amound2
                    })
                    user.save()
                    console.log(user);
                    return {
                        statusCode: 201,
                        status: true,
                        message: `${amound2} debitted sucessfully blalance amound is ${user.balance}`
                    }
                }
                else {
                    return {
                        statusCode: 401,
                        status: false,
                        message: "Insufficient balance"
                    }
                }

            }

            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "incorrect username or password"
                }
            }

        })
}



// tansaction
const transaction = (acno) => {
    return db.User.findOne({ acno })
        .then(user => {
            if (user) {
                return {
                    statusCode: 200,
                    status: true,
                    transaction: user['transaction']
                }
                console.log(user['transaction']);
            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: "incorrect username or password"
                }
            }

        })

}



// to Export
module.exports = {
    register, login, deposit, withdrow, transaction
}
