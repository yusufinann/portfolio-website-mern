
import { Intro } from '../models/portfolioModel.js'; // Model dosyanızın yolunu ayarlayın

// Kontrolcü fonksiyonu
export const intro = async (req, res) => {
    try {
        const { welcomeText, firstName, lastName, caption, description } = req.body;

        // Verilerin doğrulanması
        if (!welcomeText || !firstName || !lastName || !caption || !description) {
            return res.status(400).json({ message: "Tüm alanlar gereklidir." });
        }

        // Yeni Intro belgesi oluşturma
        const newIntro = new Intro({
            welcomeText,
            firstName,
            lastName,
            caption,
            description,
        });

        // Veritabanına kaydetme
        await newIntro.save();

        // Başarılı yanıt
        res.status(201).json({ message: "Intro başarıyla oluşturuldu!", intro: newIntro });
    } catch (error) {
        console.error('Intro oluşturma hatası:', error);
        res.status(500).json({ message: "Sunucu hatası" });
    }
};

export const updateIntro = async (req, res) => {
    try {
        const { _id, welcomeText, firstName, lastName, caption, description } = req.body;

        // Verilerin doğrulanması
        if (!_id || !welcomeText || !firstName || !lastName || !caption || !description) {
            return res.status(400).json({ message: "Tüm alanlar gereklidir.", success: false });
        }

        // Veritabanında ilgili intro belgesini bul ve güncelle
        const intro = await Intro.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true } // Güncellenen belgeyi döndür
        );

        // Eğer intro bulunmazsa
        if (!intro) {
            return res.status(404).json({ message: "Intro bulunamadı.", success: false });
        }

        // Başarılı yanıt
        res.status(200).json({ data: intro, success: true, message: "Intro başarıyla güncellendi!" });
    } catch (error) {
        console.error('Intro güncelleme hatası:', error);
        res.status(500).json({ message: "Sunucu hatası", success: false });
    }
};
