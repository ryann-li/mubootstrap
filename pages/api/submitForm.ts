import type { NextApiRequest, NextApiResponse } from 'next';

const new_app_script_url = "https://script.google.com/macros/s/AKfycbyc5P11yAcee_ANeU26HgL2p9GbQo899YHkSBKXL8LEQJGiOq1xJMk2r0xpmxlM-XA/exec";
const discordWebhookUrl = "https://discord.com/api/webhooks/980245904453935195/eRTTU5B1SU-uc1_mOJIQ-x-nBRxIhyIv9jJ1D9wtGAq2YzRvshdwqnGkHB-F3RW8JTmC";

async function NotifyDiscord(form: { [key: string]: string }) {
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

  const response = await fetch(discordWebhookUrl, {
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

  const form = req.body;

  try {
    // Submit the form data to Google Apps Script
    const response = await fetch(new_app_script_url, {
      method: 'POST',
      body: new URLSearchParams(form).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.text();

    // Notify Discord if the webhook URL is set
    if (discordWebhookUrl) {
      await NotifyDiscord(form);
    }

    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
