import type { NextApiRequest, NextApiResponse } from 'next';

const new_app_script_url = "https://script.google.com/macros/s/AKfycbyc5P11yAcee_ANeU26HgL2p9GbQo899YHkSBKXL8LEQJGiOq1xJMk2r0xpmxlM-XA/exec";

const webhookUrls: { [key: string]: string } = {
  contact: "https://discord.com/api/webhooks/980246108095782943/VBFWK3HuNLMhw-UAKvAI3I4n6He9pRSfpx3DBCkqAw2GKRXySyxvcVAL1psWrAsi1SMD",
  register: "https://discord.com/api/webhooks/980245904453935195/eRTTU5B1SU-uc1_mOJIQ-x-nBRxIhyIv9jJ1D9wtGAq2YzRvshdwqnGkHB-F3RW8JTmC",
  teach: "https://discord.com/api/webhooks/980246014143365161/ONUQiHmTHF1g2skXBvSn4SAkMdSqeTl1NoQMVJm87Z7QYwQo5y_aTylYIkCUJY4Lex_C",
  volunteer: "https://discord.com/api/webhooks/1028483199631904789/8V4uG7VxJrsHWXw_frXoTu-8gPs3i-SEhZkLlBMZ5izQb2fJ4UNG7-LRKfWJH-ydAMPm",
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
  
    const form = req.body;
    const webhookIdentifier = form.whurl;
    console.log("Received webhook identifier:", webhookIdentifier); // Log the received webhook identifier
    const whurl = webhookUrls[webhookIdentifier];
  
    if (!whurl) {
      return res.status(400).json({ error: "Invalid webhook identifier" });
    }
  
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
  
      // Notify Discord
      await NotifyDiscord(form, whurl);
  
      res.status(200).json({ message: 'Success', data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  