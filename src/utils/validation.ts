import { z } from 'zod';

const contactSchema = z
  .object({
    name: z.string().min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres',
    }),
    message: z.string().min(5, {
      message: 'A mensagem deve ter pelo menos 5 caracteres',
    }),
    method: z.union([
      z.literal('email'),
      z.literal('whatsapp'),
      z.literal('signal'),
      z.literal('matrix'),
      z.literal('keybase'),
    ]),
    email: z
      .string()
      .email({
        message: 'O email deve ser válido',
      })
      .or(z.literal(''))
      .optional(),
    whatsapp: z
      .string()
      .regex(/^[0-9( )\-+]+$/, {
        message: 'O número de telefone deve ser válido',
      })
      .or(z.literal(''))
      .optional(),
    signal: z
      .string()
      .regex(/^[0-9( )\-+]+$/, {
        message: 'O número de telefone deve ser válido',
      })
      .or(z.literal(''))
      .optional(),
    matrix: z
      .string()
      .regex(/^@(?:[^:]*):(?:.+\..+)$/, {
        message: 'O nome de usuário deve ser válido',
      })
      .or(z.literal(''))
      .optional(),
    keybase: z
      .string()
      .max(16, {
        message: 'O nome de usuário deve ter no máximo 16 caracteres',
      })
      .regex(/^[0-9a-zA-Z_]+$/, {
        message: 'O nome de usuário deve ser válido',
      })
      .or(z.literal(''))
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data[data.method]) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [data.method || 'method'],
        message: 'O campo é obrigatório',
      });
    }
  })
  // remove empty fields from the object
  .transform((data) => (
    Object.fromEntries(
      Object.entries(data).filter(([_, value]) => (
        value !== ''
      )),
    )
  ));

export default contactSchema;
