const jwt = require('jsonwebtoken')

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  })
}

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  })
}

const sendAccessToken = (req, res, accessToken) => {
  res.send({
    accessToken,
    email: req.body.email ? req.body.email : res.locals.email,
    name: req.body.name ? req.body.name : res.locals.name,
    id: res.locals.id,
  })
}

const sendRefreshToken = (res, token) => {
  // in real use case, you should not name your cookie 'refreshToken', it's for demonstration purpose
  res.cookie('refreshtoken', token, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    path: '/api/refresh_token',
  })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
}
