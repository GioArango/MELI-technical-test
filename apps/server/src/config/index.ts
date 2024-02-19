import dotenv from 'dotenv';

dotenv.config()

export const config = {
    PORT: parseInt(process.env.PORT || '3000'),
    PUBLIC_PATH: process.env.PUBLIC_PATH,
    API_URL: process.env.API_URL || 'https://api.mercadolibre.com/sites/MLA',
    RECORD_LIMIT: process.env.RECORD_LIMIT || 4
}