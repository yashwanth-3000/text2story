import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Ensure the Emails table exists
    await sql`
      CREATE TABLE IF NOT EXISTS Emails (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL
      );
    `;

    // Insert the email into the Emails table
    const result = await sql`
      INSERT INTO Emails (email) VALUES (${email});
    `;
    return res.status(200).json({ result });
  } catch (error) {
    console.error('Error storing email:', error.message); // Log the error for debugging
    return res.status(500).json({ error: error.message });
  }
}
