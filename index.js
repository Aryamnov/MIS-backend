const http = require('http');
const { PrismaClient } = require('@prisma/client')

const prisma  = new PrismaClient();

const server = http.createServer(async (req, res) => {
    const allUsers = await prisma.patients.findMany()
    console.log(allUsers)
    const allDoctors = await prisma.doctors.findMany()
    console.log(allDoctors)
    const allSchedule = await prisma.schedule.findMany()
    console.log(allSchedule)
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');
    res.end();
});

server.listen(3000); 