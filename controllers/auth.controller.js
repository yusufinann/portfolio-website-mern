import User from '../models/userModel.js'; // .js uzantısını ekledik
import jwt from 'jsonwebtoken';

//Optional: To create the admin user on first run
// const createAdminUser = async () => {
//   try {
//     const existingAdmin = await User.findOne({ username: 'admin' });
//     if (!existingAdmin) {
//       const admin = new User({
//         username: 'your-username',
//         password: 'your-password',
//       });
//       await admin.save();
//       console.log('Admin user created successfully.');
//     } else {
//       console.log('Admin user already exists.');
//     }
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//   }
// };
// createAdminUser();

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Kullanıcı adı ve şifre zorunludur.' });
  }

  try {
    const user = await User.findOne({ username });

    if (user && (await user.comparePassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        username: user.username,
        message: 'Giriş başarılı.',
      });
    } else {
      res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Sunucu hatası, giriş yapılamadı.', error: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Çıkış başarılı.' });
};

export const checkAuth = async (req, res) => {
    if (req.user) {
        res.status(200).json({
            isAuthenticated: true,
            user: {
                _id: req.user._id,
                username: req.user.username
            }
        });
    } else {
        res.status(401).json({ isAuthenticated: false, message: 'Yetkisiz' });
    }
};