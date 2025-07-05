import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from "./generated/prisma";
import planRoutes from './routes/planRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use('/plans', planRoutes);

app.get('/', (req, res) => {
  res.send('API da Empy Assinaturas está funcionando!');
});

async function main() {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Database connected successfully!');
    });
  } catch (error) {
    console.error('Falha ao conectar ao banco de dados ou iniciar o servidor:', error);
    process.exit(1);
  }
}

main();