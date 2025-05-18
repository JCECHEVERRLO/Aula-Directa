const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const defineUser = require('../models/user'); // importa la definición del modelo

const User = defineUser(sequelize, DataTypes); // instancia del modelo

(async () => {
  try {
    await sequelize.sync(); // asegúrate de que las tablas existen
    const hash = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: 'Juan Pérez',
      email: 'admin@example.co',
      password: hash,
      role: 'admin'
    });

    console.log('✅ Usuario admin creado:', admin.toJSON());
    await sequelize.close();
  } catch (error) {
    console.error('❌ Error al crear el usuario admin:', error);
    await sequelize.close();
  }
})();
