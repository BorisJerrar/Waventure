const db = require('../../db/database')
const Helper = require('../Helper')
const { uuid } = require('uuidv4');

const getAccount = (request, response) => {
  db.query('SELECT * FROM account ORDER BY account_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAccountById = (request, response) => {
  const account_id = parseInt(request.params.account_id)
  db.query('SELECT * FROM account WHERE account_id = $1', [account_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createAccount = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ 'message': 'Some values are missing' });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).json('Please enter a valid email address');
  }
  const hashPassword = Helper.hashPassword(req.body.password);

  const createQuery = `INSERT INTO
      account(account_id, username, first_name, last_name, email, birth_date, password)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
  const values = [
    uuid(),
    req.body.username,
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.birth_date,
    hashPassword,
  ];

  const rows = db.query(createQuery, values, (error, results) => {
    if (error) {
      return res.status(400).send(error);
    }
    const token = Helper.generateToken(results.rows[0].account_id)
    return res.status(201).send({ token })
  })
}

const loginAccount = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('message Some values are missing');
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).send({ error: 'message Please enter a valid email address' });
  }
  const text = 'SELECT * FROM account WHERE email = $1';

  const rows = db.query(text, [req.body.email], (error, results) => {
    if (!results.rows[0]) {
      return res.status(400).send({ 'message': 'Pas d\'utilisateur enregistrer avec cette adresse email' })
    }
    if (error) {
      return res.status(400).send(error);
    }
    if (!Helper.comparePassword(results.rows[0].password, req.body.password)) {
      return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
    }
    console.log(results.rows)
    const token = Helper.generateToken(results.rows[0].account_id);
    return res.status(200).send({ token });
  });
}

const updateAccount = (request, response) => {
  const account_id = parseInt(request.params.account_id)
  const { username, first_name, last_name, email, birth_date, password } = request.body

  db.query(
    'UPDATE account SET username = $1, first_name = $2, last_name = $3, email = $4, birth_date = $5, password = $6 WHERE account_id = $7', [username, first_name, last_name, email, birth_date, password, account_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`account modified with ID: ${account_id}`)
    }
  )
}

const deleteAccount = (request, response) => {
  const account_id = parseInt(request.params.account_id)

  db.query('DELETE FROM account WHERE account_id = $1', [account_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`account deleted with ID: ${account_id}`)
  })
}
module.exports = {
  getAccount,
  getAccountById,
  createAccount,
  loginAccount,
  updateAccount,
  deleteAccount
}
