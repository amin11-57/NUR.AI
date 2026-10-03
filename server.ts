import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Support base64 image payloads up to 25MB
app.use(express.json({ limit: '25mb' }));

// Server-side initialization of Gemini API
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Analyze image with Gemini 3.8 Flash
app.post('/api/analyze-image', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', language = 'id' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Gambar tidak ditemukan dalam permintaan.' });
    }

    // Clean up base64 prefix if provided
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z0-9-+.]+;base64,/, '');

    let languageInstruction = '';
    if (language === 'en') {
      languageInstruction = `
Respond entirely in natural, gentle English.
Spoken description must be easy to understand for elementary school students and visually impaired individuals.
`;
    } else if (language === 'ar') {
      languageInstruction = `
Respond entirely in clear, modern standard Arabic (العربية الفصحى البسيطة) with proper phrasing suitable for listening.
`;
    } else {
      languageInstruction = `
Respond entirely in natural, respectful Indonesian (Bahasa Indonesia yang santun, hangat, dan ramah).
Gunakan bahasa yang sederhana, mudah dipahami siswa SD maupun penyandang tunanetra.
`;
    }

    const systemInstruction = `
You are NURAI, an assistive AI vision guide designed for a PAI (Pendidikan Agama Islam) educational initiative: "Teknologi yang Membantu Melihat Dunia dengan Suara".
Your purpose is to describe objects and surroundings for visually impaired individuals (tunanetra/low-vision) and young learners.

Core guidelines:
1. Empathy, clarity, and safety: Describe what is in front of the user honestly, calmly, and simply.
2. Identify the main object clearly.
3. State the color(s) if recognizable.
4. State the shape if relevant.
5. State the position/orientation relative to the viewer (e.g. "Di depan Anda terdapat...", "Di bagian tengah agak ke kanan...", "Di atas meja...").
6. Read any visible, legible text clearly if present.
7. DO NOT GUESS or make up facts. If the image is too blurry, too dark, or unclear, say:
   - ID: "Gambar kurang jelas. Silakan ambil foto dari jarak atau posisi yang lebih baik."
   - EN: "The image is unclear. Please take another photo from a better distance or angle."
   - AR: "الصورة غير واضحة. يرجى التقاط صورة أخرى من مسافة أو زاوية أفضل."
8. PRIVACY & SAFETY: Never guess personal identities, names, phone numbers, or sensitive personal data. If a person is present, describe them respectfully and generally (e.g., "seorang anak sedang membaca buku") without naming them.
9. Connect briefly to a gentle PAI value (Empati, Peduli, Tolong-menolong, Rasa Syukur, Menjaga Ciptaan Allah).

${languageInstruction}
`;

    const promptText = `
Analyze this image thoroughly for a visually impaired user. Provide a clear spoken summary and structured details.
Format the output as a valid JSON object matching the requested schema.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            spokenDescription: {
              type: Type.STRING,
              description: 'The main concise description ready to be read aloud (1 to 3 clear sentences). Example: "Di depan Anda terdapat sebuah botol air berwarna biru. Botol berada di atas sebuah meja."',
            },
            detailedDescription: {
              type: Type.STRING,
              description: 'Detailed description of the scene or object.',
            },
            mainObject: {
              type: Type.STRING,
              description: 'Name of the primary object identified (e.g. Botol Air Minum, Buku Pelajaran, Buah Apel).',
            },
            color: {
              type: Type.STRING,
              description: 'Dominant colors of the object or scene.',
            },
            shape: {
              type: Type.STRING,
              description: 'Shape of the object if relevant.',
            },
            position: {
              type: Type.STRING,
              description: 'Spatial position relative to viewer (e.g. Di tengah, di atas meja, di sebelah kiri).',
            },
            detectedText: {
              type: Type.STRING,
              description: 'Any readable text found on the object, or empty if none.',
            },
            clarityStatus: {
              type: Type.STRING,
              description: 'Quality status: "clear", "blurry", or "obscured".',
            },
            paiReflection: {
              type: Type.STRING,
              description: 'A brief moral/Islamic value reflection related to the object or empathy/gratitude.',
            },
          },
          required: ['spokenDescription', 'mainObject', 'color', 'shape', 'position', 'clarityStatus'],
        },
      },
    });

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error analyzing image with Gemini:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Gagal menganalisis gambar. Periksa koneksi atau coba lagi.',
    });
  }
});

// Endpoint: Generate Speech via Gemini 3.8 Flash Lite TTS
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language = 'id', voiceName } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Teks untuk dibacakan diperlukan.' });
    }

    // Default prebuilt voice: 'Kore' or 'Puck' or 'Zephyr'
    const selectedVoice = voiceName || (language === 'ar' ? 'Zephyr' : 'Kore');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.trim(),
              speechMetadata: {
                style: 'Gentle, supportive, clear assistive guide for visually impaired users',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      return res.status(500).json({ error: 'Gagal membuat audio suara.' });
    }

    return res.json({
      success: true,
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (error: any) {
    console.error('TTS error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Layanan suara Gemini sedang tidak tersedia.',
    });
  }
});

// Dev vs Prod Vite handling
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NURAI server running at http://localhost:${PORT}`);
  });
}

startServer();
