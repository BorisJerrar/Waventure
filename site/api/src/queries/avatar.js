const db = require('../../db/database')
const jwt = require('jsonwebtoken')

const getAvatar = (request, response) => {
    db.query('SELECT * FROM avatar ORDER BY avatar_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const getAvatarByUser = (request, response) => {

  const token = request.headers['x-access-token'];
  const decoded = jwt.verify(token, process.env.SECRET)
    db.query(`SELECT
    avatar.avatar_path
    FROM account 
    INNER JOIN avatar ON account.avatar_id = avatar.avatar_id
    WHERE account_id = $1`, [decoded.account_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getAvatar,
    getAvatarByUser,
  }
 