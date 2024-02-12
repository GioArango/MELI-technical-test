import dotenv from 'dotenv';

dotenv.config()

export const config = {
    PORT: parseInt(process.env.PORT || '3000'),
    PUBLIC_PATH: process.env.PUBLIC_PATH
}