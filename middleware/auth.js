import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) res.sendStatus(401);

    jwt.verify(token, 'test', (err, data) => {
      // console.log(err, data);
      if (err) res.sendStatus(403);
      next();
    });
  } catch (error) {
    res.sendStatus(401)
  }
}

export default auth;