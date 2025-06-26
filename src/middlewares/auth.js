const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  try {
    console.log('🛡️ Entrando al middleware authenticate');
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('⚠️ Cabecera Authorization no válida o ausente');
      return res.status(401).json({ message: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error('❌ JWT_SECRET no definido');
      return res.status(500).json({ message: 'Error interno de autenticación' });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log('🔓 Usuario autenticado:', req.user);
    next();
  } catch (err) {
    console.error('❌ Token inválido:', err.message);
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
};
//     const calificacion = await Qualification.create({