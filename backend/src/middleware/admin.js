const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required before verifying administrative rights.',
    });
  }

  if (req.user.role !== 'admin' && req.user.role !== 'coordinator') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Administrative privileges are required for this action.',
    });
  }

  next();
};

module.exports = { authorizeAdmin };
