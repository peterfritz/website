import discord from '@/service/discord';
import contactSchema from '@/utils/validation';
import color from 'color';
import { NextRequest } from 'next/server';
import random, { RNG } from 'random';
import seedrandom, { PRNG } from 'seedrandom';

export const config = {
  runtime: 'edge',
};

const handler = async (request: NextRequest) => {
  if (request.method !== 'POST') {
    return new Response(null, {
      status: 405,
      statusText: 'Method Not Allowed',
    });
  }

  try {
    const timestamp = Date.now();

    const body = await request.json();

    const data = contactSchema.parse(body);

    const seed = seedrandom(data.name.toLowerCase().replace(/[^a-z]/g, ''));

    random.use(seed as RNG & PRNG);

    await discord.send({
      content: 'Chegou uma nova mensagem!',
      embeds: [
        {
          color: parseInt(
            color(`hwb(${random.int(0, 360)}, 20%, 0%)`)
              .hex()
              .substring(1),
            16,
          ),
          title: 'Nova mensagem',
          fields: [
            {
              name: 'De',
              value: data.name,
            },
            {
              name: 'Mensagem',
              value: data.message,
            },
            {
              name: 'Método de contato',
              value: `${data.method}: ${data[data.method]}`,
            },
          ],
          timestamp: new Date(timestamp).toISOString(),
        },
      ],
    });
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(null, {
    status: 200,
    statusText: 'OK',
  });
};

export default handler;
