import { supabaseAdmin } from '../../lib/supabase.js';
import { verifyAdmin } from '../../lib/auth.js';

export default async function handler(req, res) {
  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: 'İcazəsiz giriş' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getReviews(req, res);
      case 'PUT':
        return await updateReview(req, res);
      case 'DELETE':
        return await deleteReview(req, res);
      default:
        return res.status(405).json({ error: 'Metod dəstəklənmir' });
    }
  } catch (error) {
    console.error('Admin reviews error:', error);
    return res.status(500).json({ error: 'Server xətası' });
  }
}

// Bütün rəyləri al (təsdiq olunmamışlar daxil)
async function getReviews(req, res) {
  const { status } = req.query; // 'pending', 'approved', 'all'

  let query = supabaseAdmin
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (status === 'pending') {
    query = query.eq('is_approved', false);
  } else if (status === 'approved') {
    query = query.eq('is_approved', true);
  }
  // 'all' — heç bir filtr yoxdur

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}

// Rəyi təsdiq et və ya imtina et
async function updateReview(req, res) {
  const { id, is_approved } = req.body;

  if (!id || is_approved === undefined) {
    return res.status(400).json({ error: 'id və is_approved tələb olunur' });
  }

  const { data, error } = await supabaseAdmin
    .from('reviews')
    .update({ is_approved })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  const statusText = is_approved ? 'təsdiq edildi' : 'imtina edildi';
  return res.status(200).json({ success: true, message: `Rəy ${statusText}`, data });
}

// Rəy sil
async function deleteReview(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Rəy ID tələb olunur' });
  }

  const { error } = await supabaseAdmin
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ success: true, message: 'Rəy silindi' });
}
