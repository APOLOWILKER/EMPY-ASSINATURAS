import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from "./generated/prisma";
import planRoutes from './routes/planRoutes';
import purchaseRoutes from './routes/purchaseRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use('/plans', planRoutes);
app.use('/users', userRoutes);
app.use('/purchases', purchaseRoutes);

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