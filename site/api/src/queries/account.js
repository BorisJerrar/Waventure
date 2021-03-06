const db = require('../../db/database')
const Helper = require('../controllers/Helper')
const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer')

/**
 * use to request account by decoded token
 * @param {headers} token 
 * @returns {object} account 
 */
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

/**
 * use to request account by account_id
 * @param {params} account_id 
 * @returns {object} account 
 */
const getAccountById = (request, response) => {
  const account_id = parseInt(request.params.account_id)
  db.query('SELECT * FROM account WHERE account_id = $1', [account_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/**
 * Create account returning token
 * @param {body} request 
 * @returns {string} token
 */
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

/**
 * Login account returning token 
 * @param {body} email
 * @param {body} password 
 * @returns {String} token 
 */
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
  const getAccount = 'SELECT * FROM account WHERE email = $1';
  db.query(getAccount, [req.body.email], (error, results) => {
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

    /**
   * Remove account token 
   * @param {headers} token 
   */
const logoutAccount = (req, res) => {
  const token = req.headers['x-access-token']
  const decoded = jwt.verify(token, process.env.SECRET)
    db.query("UPDATE account SET token = '' WHERE account_id = $1 RETURNING account_id, username, token",
    [decoded.account_id], (error, results) => {
      if (error) {
        return res.status(400).send(error);
      }
      return res.status(200).send({message: 'Deconnexion'})
    })
}


/**
 * Request email for updating account password 
 * @param {body} email 
 * @returns {string} link + token in email 
 */
const SendEmailresetPassword = (req, res) => {
  if (!req.body.email === '') {
    res.status(400).send({ error:'adresse email nécessaire'});
  }
  const getAccount = 'SELECT * FROM account WHERE email = $1'
  db.query(getAccount, [req.body.email], (error, results) => {
    if (!results.rows[0]) {
      return res.status(403).send({error: 'Adresse email inconnu'});
    } else {
      const token = Helper.generateTokenSmallDuration(results.rows[0].account_id);

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
      transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
          return res.status(400).send({error: 'Une erreur est survenue'})
        } else {
          return res.status(200).send({message: 'Un email de réinitialisation à été envoyé'})
        }
      })
    }
  })
}

/**
 * Reset password by decoded token 
 * @param {body} password 
 * @param {headers} token
 * @returns {string} response
 */
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
        res.status(200).send({message: 'Mot de passe modifier avec success'})
      }
    }
  )
}

/**
 * use to update account by id
 * @param {params} account_id 
 * @param {body} body
 * @returns {string} response
 */
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

/**
 * 
 * @param {params} account_id
 * @returns {string} response 
 */
const deleteAccount = (request, response) => {
  const token = request.headers['x-access-token'];    
    const decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded);
    
  db.query('DELETE FROM account WHERE account_id = $1', [decoded.account_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`account deleted with ID: ${decoded.account_id}`)
  })
}

module.exports = {
  getAccount,
  getAccountById,
  createAccount,
  loginAccount,
  logoutAccount,
  SendEmailresetPassword,
  resetPasswordByEmail,
  updateAccount,
  deleteAccount
}
