import type { NextApiRequest, NextApiResponse } from 'next';

const new_app_script_url = process.env.GOOGLE_APP_SCRIPT_URL;

const webhookUrls: { [key: string]: string | undefined } = {
  contact: process.env.DISCORD_WEBHOOK_URL_CONTACT,
  register: process.env.DISCORD_WEBHOOK_URL_REGISTER,
  teach: process.env.DISCORD_WEBHOOK_URL_TEACH,
  volunteer: process.env.DISCORD_WEBHOOK_URL_VOLUNTEER,
};

async function NotifyDiscord(form: { [key: string]: string }, whurl: string) {
  const d = new Date();
  let field_values = Object.keys(form).map(key => ({
    name: key,
    value: form[key]
  }));

  const webhookBody = {
    username: "Bounder Bot",
    content: "",
    embeds: [{
      title: `Form submission occurred on : ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`,
      fields: field_values
    }],
  };

  const response = await fetch(whurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(webhookBody),
  });

  if (!response.ok) {
    throw new Error('Failed to notify Discord');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.body.honeypot) {
    return res.status(400).json({ error: "Bot detected." });
  }

  const form = req.body;
  const webhookIdentifier = form.whurl;
  const whurl = webhookUrls[webhookIdentifier];

  if (!whurl) {
    return res.status(400).json({ error: "Invalid webhook identifier" });
  }

  try {
    // Submit the form data to Google Apps Script
    const response = await fetch(new_app_script_url, {
      method: 'POST',
      body: new URLSearchParams({
        ...form,
        formIdentifier: webhookIdentifier 
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.text();

    // Notify Discord
    await NotifyDiscord(form, whurl);

    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
