// api/get-image.js
import { list } from '@vercel/blob';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId é obrigatório.' });
  }

  try {
    // Busca por arquivos no "diretório" do usuário
    const { blobs } = await list({
      prefix: `usuarios/${userId}/`,
      limit: 1, // Queremos apenas a primeira (e única) foto de perfil
    });

    if (blobs.length > 0) {
      // Se encontrou, retorna a URL do primeiro arquivo
      return res.status(200).json({ url: blobs[0].url });
    } else {
      // Se não encontrou nenhuma imagem para o usuário
      return res.status(200).json({ url: null });
    }
  } catch (error) {
    console.error('Erro ao buscar imagem no Blob:', error);
    return res.status(500).json({ error: 'Erro ao buscar a imagem.' });
  }
}