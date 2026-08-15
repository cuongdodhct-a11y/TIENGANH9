import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.status(200).json({
    status: 'ok',
    message: 'TIENGANH9 API is running',
    timestamp: new Date().toISOString(),
  });
}