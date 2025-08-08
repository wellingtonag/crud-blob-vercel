// api/upload.js
import { put } from '@vercel/blob';

export default async function handler(req, res) {
  const { userId } = req.query;

  const file = req.body;
  const buffer = Buffer.from(file.split(',')[1], 'base64');

  const filename = `usuarios/${userId}/foto.jpg`;

  const { url } = await put(filename, buffer, {
    access: 'public',
    contentType: 'image/jpeg',
  });

  return res.status(200).json({ url });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
