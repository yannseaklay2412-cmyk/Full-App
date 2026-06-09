import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Administrator';

    if (!adminEmail || !adminPassword) {
      console.error(' Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env file');
      process.exit(1);
    }

    console.log(' Checking if admin exists...');
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [adminEmail]);
    if (existing.rows.length > 0) {
      console.log('⚠️  Admin already exists!');
      process.exit(0);
    }

    console.log(' Hashing password...');
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    console.log(' Creating admin user...');
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [adminName, adminEmail, hashedPassword, 'admin']
    );

    console.log(' Admin created successfully!');
    console.log(` Email: ${adminEmail}`);
    console.log(` Name: ${adminName}`);
    console.log(` Role: admin`);
    process.exit(0);
  } catch (err) {
    console.error(' Error creating admin:', err.message);
    process.exit(1);
  }
};

seedAdmin();
