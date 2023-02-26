const { PrismaClient } = require("@prisma/client");
const { Status } = require("../utils/status-code");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();

const getPatients = (req, res) => {
  prisma.patients
    .findMany()
    .then((patients) => {
      res.writeHead(Status.SUCCESS, { "Content-Type": "application/json" });
      res.end(JSON.stringify(patients));
    })
    .catch(() => {
      res.writeHead(Status.INTERNAL);
      res.end("Что-то пошло не так");
    });
};

const addPatient = (req, res) => {
  bodyParser.json()(req, res, () => {
    const { email, name, gender, phone } = req.body;
    // TODO: add validation

    if (!email || !name || !gender || !phone) {
      res.writeHead(Status.BAD_REQUEST);
      res.end(
        "Для создания пациента необходимо передать имя, почту, пол и телефон пациента"
      );
    } else {
      prisma.patients
        .create({
          data: {
            email: email,
            name: name,
            phone: phone,
            gender: gender,
          },
        })
        .then((patient) => {
          res.writeHead(Status.SUCCESS, { "Content-Type": "application/json" });
          res.end(JSON.stringify(patient));
        })
        .catch((err) => {
          res.writeHead(Status.INTERNAL);
          res.end("Ошибка создания пациента");
        });
    }
  });
};

module.exports = { getPatients, addPatient };
