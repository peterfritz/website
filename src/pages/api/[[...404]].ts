export const config = {
  runtime: 'edge',
};

const handler = async () => (
  new Response(
    null,
    {
      status: 404,
    },
  )
);

export default handler;
