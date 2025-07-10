import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' }, 
    update: {
      name: 'John Doe',
    },
    create: {
      id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });
  console.log(`Test user created/updated: ${testUser.name} (${testUser.id})`);

  
  let lightPlan = await prisma.plan.findFirst({ where: { name: 'Light' } });
  if (!lightPlan) {
    lightPlan = await prisma.plan.create({
      data: {
        name: 'Light',
        description: 'Ganhe 2 meses de desconto na contratação anual com 12 meses de fidelidade',
        monthlyValue: 157.00,
        annualValue: 130.83,
        onlineCredits: 2,
        offlineCredits: 20,
        isActive: true,
        isCustom: false,
      },
    });
    console.log('Light plan created.');
  } else {
    
    lightPlan = await prisma.plan.update({
      where: { id: lightPlan.id }, 
      data: {
        description: 'Ganhe 2 meses de desconto na contratação anual com 12 meses de fidelidade',
        monthlyValue: 157.00,
        annualValue: 130.83,
        onlineCredits: 2,
        offlineCredits: 20,
        isActive: true,
        isCustom: false,
      },
    });
    console.log('Light plan updated.');
  }

  
  let standardPlan = await prisma.plan.findFirst({ where: { name: 'Standard' } });
  if (!standardPlan) {
    standardPlan = await prisma.plan.create({
      data: {
        name: 'Standard',
        description: 'Ganhe 2 meses de desconto na contratação anual com 12 meses de fidelidade',
        monthlyValue: 249.50,
        annualValue: 207.91,
        onlineCredits: 10,
        offlineCredits: 30,
        isActive: true,
        isCustom: false,
      },
    });
    console.log('Standard plan created.');
  } else {
    standardPlan = await prisma.plan.update({
      where: { id: standardPlan.id },
      data: {
        description: 'Ganhe 2 meses de desconto na contratação anual com 12 meses de fidelidade',
        monthlyValue: 249.50,
        annualValue: 207.91,
        onlineCredits: 10,
        offlineCredits: 30,
        isActive: true,
        isCustom: false,
      },
    });
    console.log('Standard plan updated.');
  }

  
  let proPlan = await prisma.plan.findFirst({ where: { name: 'Pro' } });
  if (!proPlan) {
    proPlan = await prisma.plan.create({
      data: {
        name: 'Pro',
        description: 'Ganhe 2 meses de desconto na contratação anual com 12 meses de fidelidade',
        monthlyValue: 347.00,
        annualValue: 289.92,
        onlineCredits: 30,
        offlineCredits: -1, 
        isActive: true,
        isCustom: false,
      },
    });
    console.log('Pro plan created.');
  } else {
    proPlan = await prisma.plan.update({
      where: { id: proPlan.id },
      data: {
        description: 'Ganhe 2 meses de desconto na contratação anual com 12 meses de fidelidade',
        monthlyValue: 347.00,
        annualValue: 289.92,
        onlineCredits: 30,
        offlineCredits: -1,
        isActive: true,
        isCustom: false,
      },
    });
    console.log('Pro plan updated.');
  }

  console.log(`Final Plans State: ${lightPlan.name}, ${standardPlan.name}, ${proPlan.name}`);
}

main()
  .catch((e) => {
    console.error('Erro na execução do seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });