interface Message {
  content: string;
  embeds?: {
    color: number;
    title: string;
    author?: {
      name?: string;
      icon_url?: string;
    };
    fields: {
      name: string;
      value: string;
    }[];
    timestamp: string;
  }[];
}

const send = async (message: Message) => {
  const endpoint = process.env.DISCORD_WEBHOOK_URL;

  if (!endpoint) {
    return;
  }

  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

const discord = {
  send,
};

export default discord;
