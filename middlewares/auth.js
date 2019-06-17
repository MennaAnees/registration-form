const jwt = require('jsonwebtoken');
module.exports = (req, res, next)=>{
  const { headers: { authorization: token } } = req;  
  if (!token) return res.status(401).send('Not Autorized');
  jwt.verify(token, 'secret', (err, data)=>{
    if (err) return res.status(400).send('Bad Request');
    req.userId = data.userId;
  });
  return next();
};
