const sql = require("mssql")
const router = require("express").Router()

router.get("/allUserData", (req, res) => {
  req.app.locals.db.query(`SELECT * from User_Table`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).json(recordset.recordset)
  })
})

router.get("/allTransactions", (req, res) => {
  req.app.locals.db.query(`SELECT * from Transaction_Table`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).json(recordset.recordset)
  })
})

router.post("/addTransactionsTest", (req, res) => {
  const { Sender_Address, Receiver_Address, Amount, Transaction_Status } = req.body

  req.app.locals.db.query(`insert into Transaction_Table(Sender_Address,Receiver_Address, Amount, Transaction_Status, Transaction_Date) values('${Sender_Address}','${Receiver_Address}', ${Amount},${Transaction_Status},GETDATE())`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    else {
      req.app.locals.db.query(`UPDATE User_Table SET Account_Balance = (select Account_Balance FROM User_Table where Account_Address = '${Sender_Address}') - ${Amount} Where Account_Address = '${Sender_Address}'`, function (err, recordset) {
        if (err) {
          console.error(err)
          res.status(500).send('Transaction Update')
          return
        }
        res.status(200).json(recordset.recordset)
      })
    }
    res.status(200).send('Transaction Completed')
  })
})


router.post("/addBalance", (req, res) => {
  const { Account_Address, Account_Balance } = req.body
  req.app.locals.db.query(`SELECT * from User_Table where Account_Address = '${Account_Address}'`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    else if (Object.keys(recordset.recordset).length !== 0) {
      req.app.locals.db.query(`update User_Table set Account_Balance = ${Account_Balance} where Account_Address = '${Account_Address}' `, function (err, recordset) {
        if (err) {
          console.error(err)
          res.status(500).send('SERVER ERROR')
          return
        }
      })
      res.status(200).send('Update Account')
      // res.status(200).json(recordset.recordset)
    }
    else {
      req.app.locals.db.query(`INSERT INTO User_Table(Account_Address,Account_Balance) VALUES('${Account_Address}',${Account_Balance})'`, function (err, recordset) {
        if (err) {
          console.error(err)
          res.status(500).send('SERVER ERROR')
          return
        }
      })
      res.status(200).send('Add Account')
      // res.status(200).json(recordset.recordset)
    }
    res.status(200).send('Transaction Completed')
  })
})

// req.app.locals.db.query(`UPDATE User_Table SET Account_Balance = (select Account_Balance FROM User_Table where Account_Address = '${Sender_Address}') - ${Amount} Where Account_Address = '${Sender_Address}'`, function (err, recordset) {
//   if (err) {
//     console.error(err)
//     res.status(500).send('Transaction Update')
//     return
//   }
//   res.status(200).json(recordset.recordset)
// })





router.post("/addTransaction", (req, res) => {
  const { Sender_Address, Receiver_Address, Amount, Transaction_Status } = req.body
  // const values = `insert into Transaction_Table(Sender_Address,Receiver_Address, Amount, Transaction_Status, Transaction_Date) values(${Sender_Address},${Receiver_Address}, ${Amount},${Transaction_Status},GETDATE())`
  // console.log("🚀 ~ file: sqlRoutes.js ~ line 29 ~ router.post ~ values", values)
  req.app.locals.db.query(`insert into Transaction_Table(Sender_Address,Receiver_Address, Amount, Transaction_Status, Transaction_Date) values('${Sender_Address}','${Receiver_Address}', ${Amount},${Transaction_Status},GETDATE())`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR1')
      return
    }
    else {
      req.app.locals.db.query(`SELECT * from User_Table where Account_Address = ${Receiver_Address}`, function (err, recordset) {
        if (err) {
          console.error(err)
          res.status(500).send('SERVER ERROR2')
          return
        }
        else if (Object.keys(recordset.recordset).length !== 0) {
          req.app.locals.db.query(`UPDATE User_Table SET Account_Balance = (select Account_Balance FROM User_Table where Account_Address = '${Receiver_Address}') + 100 Where Account_Address = '${Receiver_Address}'`, function (err, recordset) {
            if (err) {
              console.error(err)
              res.status(500).send('SERVER ERROR3')
              return
            }
            res.status(200).json(recordset.recordset)
          })
        }
        else {
          req.app.locals.db.query(`INSERT INTO User_Table VALUES('${Receiver_Address}',100)'`, function (err, recordset) {
            if (err) {
              console.error(err)
              res.status(500).send('SERVER ERROR4')
              return
            }
            res.status(200).json(recordset.recordset)
          })
        }
        res.status(200).json(recordset.recordset)
      })
    }
    res.status(200).send('done')
  })
})


module.exports = router