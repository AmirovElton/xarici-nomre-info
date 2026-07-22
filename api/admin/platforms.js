import { supabaseAdmin } from '../../lib/supabase.js';
import { verifyAdmin } from '../../lib/auth.js';

export default async function handler(req, res) {
  // Admin autentifikasiya
  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: 'İcazəsiz giriş' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getPlatforms(req, res);
      case 'POST':
        return await createPlatform(req, res);
      case 'PUT':
        return await updatePlatform(req, res);
      case 'DELETE':
        return await deletePlatform(req, res);
      default:
        return res.status(405).json({ error: 'Metod dəstəklənmir' });
    }
  } catch (error) {
    console.error('Admin platforms error:', error);
    return res.status(500).json({ error: 'Server xətası' });
  }
}

// Bütün platformaları al
async function getPlatforms(req, res) {
  const { data, error } = await supabaseAdmin
    .from('platforms')
    .select('*')
    .order('sort_order');

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

// Yeni platforma əlavə et
async function createPlatform(req, res) {
  const { name, emoji, description, is_active, sort_order } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Platforma adı tələb olunur' });
  }

  const { data, error } = await supabaseAdmin
    .from('platforms')
    .insert({
      name,
      emoji: emoji || '📱',
      description: description || '',
      is_active: is_active !== false,
      sort_order: sort_order || 0,
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data);
}

// Platforma yenilə
async function updatePlatform(req, res) {
  const { id, ...updates } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Platform ID tələb olunur' });
  }

  const { data, error } = await supabaseAdmin
    .from('platforms')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

// Platforma sil
async function deletePlatform(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Platform ID tələb olunur' });
  }

  const { error } = await supabaseAdmin
    .from('platforms')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ success: true, message: 'Platforma silindi' });
}
