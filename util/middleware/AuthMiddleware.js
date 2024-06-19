const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    if (!authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: 'Invalid Token Format'});
    }
    const token = authorizationHeader.slice(7);
    if (!token) {
        return res.status(401).json({error: 'Invalid Token'});
    }
    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        return res.status(401).json({error: 'Invalid Token'});
    }
}

module.exports = verifyToken