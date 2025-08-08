import { put } from '@vercel/blob';

export default async function handler(req, res) {
  const { userId } = req.query;
  const body = req.body;

  if (!userId || !body) {
    return res.status(400).json({ error: 'Faltando dados no envio.' });
  }

  try {
    const buffer = Buffer.from(body.split(',')[1], 'base64'); // remove "data:image/jpeg;base64,"
    const filename = `usuarios/${userId}/foto.jpg`;

    const { url } = await put(filename, buffer, {
      access: 'public',
      contentType: 'image/jpeg'
    });

    return res.status(200).json({ url });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao enviar a imagem', detail: err.message });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // limite opcional
    },
  },
};
