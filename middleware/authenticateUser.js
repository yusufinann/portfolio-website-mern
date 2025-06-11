import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // ES Module import, .js uzantısını ekledik

export const authenticateUser = async (req, res, next) => { // 'export' keyword'ünü ekledik
  let token;

  // Cookie'den token'ı oku
  token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Şifre olmadan kullanıcı bilgisini req.user'a ekle
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        // Kullanıcı bulunamadıysa ama token geçerliyse (örneğin kullanıcı silinmişse)
        // Bu durum, kullanıcının veritabanından silindiği ancak token'ının hala geçerli olduğu anlamına gelebilir.
        // Bu durumda token'ı temizlemek ve yetkisiz yanıtı göndermek iyi bir pratiktir.
        res.clearCookie('token'); // Tarayıcıdan cookie'yi temizle
        return res.status(401).json({ message: 'Yetkisiz, kullanıcı bulunamadı.' });
      }
      next();
    } catch (error) {
      console.error('Token verification error:', error.name); // error.name (örn: JsonWebTokenError, TokenExpiredError) daha bilgilendirici olabilir
      // Token geçersizse veya süresi dolmuşsa, tarayıcıdaki cookie'yi temizlemek iyi bir pratiktir.
      res.clearCookie('token'); // Tarayıcıdan cookie'yi temizle
      // Hata mesajını daha spesifik hale getirebiliriz
      let message = 'Yetkisiz, token geçersiz.';
      if (error.name === 'TokenExpiredError') {
        message = 'Yetkisiz, token süresi dolmuş.';
      }
      res.status(401).json({ message });
    }
  } else {
    res.status(401).json({ message: 'Yetkisiz, token bulunamadı.' });
  }
};

// Eğer bu dosyada sadece authenticateUser varsa ve onu default olarak export etmek isterseniz:
// export default authenticateUser;
// Bu durumda import ederken: import authenticateUser from '../middleware/authenticateUser.js';
// Ama mevcut yapınızda named export kullanıyorsunuz ( { authenticateUser } ), bu yüzden 'export const' daha uygun.