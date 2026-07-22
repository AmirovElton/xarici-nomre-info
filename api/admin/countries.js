import { supabaseAdmin } from '../../lib/supabase.js';
import { verifyAdmin } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: 'İcazəsiz giriş' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getCountries(req, res);
      case 'POST':
        return await createCountry(req, res);
      case 'PUT':
        return await updateCountry(req, res);
      case 'DELETE':
        return await deleteCountry(req, res);
      default:
        return res.status(405).json({ error: 'Metod dəstəklənmir' });
    }
  } catch (error) {
    console.error('Admin countries error:', error);
    return res.status(500).json({ error: 'Server xətası' });
  }
}

// Bütün ölkələri al (platform ilə)
async function getCountries(req, res) {
  const { platform_id } = req.query;

  let query = supabaseAdmin
    .from('countries')
    .select('*, platforms(name, emoji)')
    .order('sort_order');

  if (platform_id) {
    query = query.eq('platform_id', platform_id);
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

// Yeni ölkə əlavə et
async function createCountry(req, res) {
  const {
    platform_id,
    name,
    flag,
    country_code,
    quality,
    success_rate,
    stock,
    price,
    currency,
    description,
    is_active,
    sort_order,
  } = req.body;

  if (!platform_id || !name || !price) {
    return res.status(400).json({
      error: 'platform_id, name və price tələb olunur',
    });
  }

  const { data, error } = await supabaseAdmin
    .from('countries')
    .insert({
      platform_id,
      name,
      flag: flag || '🏳️',
      country_code: country_code || '',
      quality: quality || 'Yüksək',
      success_rate: success_rate || 95,
      stock: stock || 0,
      price,
      currency: currency || 'AZN',
      description: description || '',
      is_active: is_active !== false,
      sort_order: sort_order || 0,
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data);
}

// Ölkə yenilə (stok, qiymət və s.)
async function updateCountry(req, res) {
  const { id, ...updates } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Ölkə ID tələb olunur' });
  }

  const { data, error } = await supabaseAdmin
    .from('countries')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

// Ölkə sil
async function deleteCountry(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Ölkə ID tələb olunur' });
  }

  const { error } = await supabaseAdmin
    .from('countries')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ success: true, message: 'Ölkə silindi' });
}
