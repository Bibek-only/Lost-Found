import z from 'zod';

const envSchema = z.object({
    
    PORT: z.coerce.number(),
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    DATABASE_URL_DEV: z.string().trim().min(1),
});

export const validENV = envSchema.parse(process.env);