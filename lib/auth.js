/**
 * Admin autentifikasiya - sadə token əsaslı
 * Header-də "Authorization: Bearer <ADMIN_PASSWORD>" göndərilir
 */
export function verifyAdmin(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.replace('Bearer ', '');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set');
    return false;
  }

  return token === adminPassword;
}
