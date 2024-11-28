const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Get token from header

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Attach user ID to the request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
