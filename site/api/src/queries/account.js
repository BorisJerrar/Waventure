const db = require('../../db/database')
const Helper = require('../controllers/Helper')
const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer')

const getAccount = (request, response) => {
  const token = request.headers['x-access-token'];
  const decoded = jwt.verify(token, process.env.SECRET)
  db.query('SELECT * FROM account WHERE account_id = $1', [decoded.account_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAccountById = (request, response) => {

  const account_id = parseInt(request.params.account_id)
  req.account = { account_id: decoded.account_id };
  db.query('SELECT * FROM account WHERE account_id = $1', [account_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createAccount = (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.last_name || !req.body.birth_date) {
    return res.status(400).send({ error: 'Formulaire incomplet' });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).send({ error: 'Adresse email invalide' });
  }
  if (!req.body.password) {
    return res.status(400).send({ error: 'Veuillez saisir votre mot de passe' });
  }
  const checkEmail = 'SELECT * FROM account WHERE email = $1';
  db.query(checkEmail, [req.body.email], (error, results) => {
    if (results.rows[0]) {
      return res.status(400).send({ error: 'Adresse e-mail déjà utilisée' })
    }
    if (error) {
      console.log(error)
      return res.status(400).send(error);
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      account(account_id, username, first_name, last_name, email, birth_date, avatar_id, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      uuid(),
      req.body.username,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.birth_date,
      req.body.avatar_id,
      hashPassword
    ];

    db.query(createQuery, values, (error, results) => {
      if (error) {
        return res.status(400).send(error);
      }
      const token = Helper.generateToken(results.rows[0].account_id)
      return res.status(201).send({ token })
    })
  });

}

const loginAccount = (req, res) => {
  if (!req.body.password && !req.body.email) {
     return res.status(400).send({error :'Veuillez saisir votre adresse email ainsi que votre mot de passe'});   
  }
  if (!req.body.password) {
    return res.status(400).send({error :'Veuillez saisir votre mot de passe'});
  }
  if (!req.body.email) {
    return res.status(400).send({error :'Veuillez saisir une adresse électronique'})
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).send({ error: 'Adresse email invalide' });
  }
  const text = 'SELECT * FROM account WHERE email = $1';

  const rows = db.query(text, [req.body.email], (error, results) => {
    if (!results.rows[0]) {
      return res.status(400).send({ error: 'Pas d\'utilisateur enregistrer pour cette adresse email' })
    }
    if (error) {
      return res.status(400).send(error);
    }
    if (!Helper.comparePassword(results.rows[0].password, req.body.password)) {
      return res.status(400).send({ error: 'Mot de passe incorrect' });
    }
    const token = Helper.generateToken(results.rows[0].account_id);
    return res.status(200).send({ token });
  });
}

const resetPassword = (req, res) => {
  if (!req.body.email === '') {
    res.status(400).send('email required');
  }

  const getUser = 'SELECT * FROM account WHERE email = $1'
  const rows = db.query(getUser, [req.body.email], (error, results) => {
    if (!results.rows[0]) {
      console.log('email not in database')
      return res.status(403).send('email not in db');
    } else {
      console.log('result.rows:', results.rows)
      const token = Helper.generateToken(results.rows[0].account_id);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: 'valencedeveloppement@gmail.co',
        to: `${results.rows[0].email}`,
        subject: 'Lien de réinitialisation',
        text:
          `Bonjour ${results.rows[0].username}\n\n`
          + 'Vous avez demandé à changer le mot de passe de votre compte waventure. Pour créer un nouveau mot de passe, cliquez sur le lien ci-dessous :'
          + `http://localhost:3000/reset/${token}\n\n`
          + 'L\'équipe de waventure' 
      };
      console.log('sending mail');

      transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log('there was an error: ', error);
        } else {
          console.log('here is the res :', response);
          res.status(200).json('recovery email send')
        }
      })
    }
  })
}

const resetPasswordByEmail = (req, res) => {
  if (!req.body.password === '') {
    res.status(400).send('password required');
  }
  const token = req.headers['x-access-token'];
  const decoded = jwt.verify(token, process.env.SECRET)
  const hashPassword = Helper.hashPassword(req.body.password);

  db.query(
    'UPDATE account SET password = $1 WHERE account_id = $2', [hashPassword, decoded.account_id],
    (err, response) => {
      if (err) {
        throw error
      } else {
        res.status(200).send(`account modified`)
      }
    }
  )
}

const updateAccount = (request, response) => {
  const account_id = request.params.account_id
  const { username, first_name, last_name, email, avatar_id, password } = request.body
  
  db.query(
    'UPDATE account SET username = $1, first_name = $2, last_name = $3, email = $4, avatar_id = $5, password= $6 WHERE account_id = $7', [username, first_name, last_name, email, avatar_id, password, account_id,],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`account modified with ID: ${account_id}`)
    }
  )
}

const deleteAccount = (request, response) => {
  const account_id = request.params.account_id

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
  resetPassword,
  resetPasswordByEmail,
  updateAccount,
  deleteAccount
}
