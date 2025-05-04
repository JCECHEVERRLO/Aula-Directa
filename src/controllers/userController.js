const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => { 
  const { email, password } = req.body;
  console.log('Request body:', req.body);
  try {
    const user = await User.findOne({ where: { email } });
    console.log('User found:', user);

    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' }); 

    const valid = await bcrypt.compare(password, user.password); 
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error }); 
  }

  
};
