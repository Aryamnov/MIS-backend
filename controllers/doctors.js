const { PrismaClient } = require("@prisma/client");
const { Status } = require("../utils/status-code");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();

const getDoctors = (req, res) => {
  prisma.doctors
    .findMany()
    .then((doctors) => {
      res.writeHead(Status.SUCCESS, { "Content-Type": "application/json" });
      res.end(JSON.stringify(doctors));
    })
    .catch(() => {
      res.writeHead(Status.INTERNAL);
      res.end("Что-то пошло не так");
    });
};

const addDoctor = (req, res) => {
  bodyParser.json()(req, res, () => {
    const { name, spec, price } = req.body;
    // TODO: add validation

    if (!name || !spec || !price) {
      res.writeHead(Status.BAD_REQUEST);
      res.end(
        "Для создания доктора необходимо передать имя, специализацию и цену приему доктора"
      );
    } else {
      prisma.doctors
        .create({
          data: {
            name: name,
            spec: spec,
            price: price,
          },
        })
        .then((doctor) => {
          res.writeHead(Status.SUCCESS, { "Content-Type": "application/json" });
          res.end(JSON.stringify(doctor));
        })
        .catch((err) => {
          res.writeHead(Status.INTERNAL);
          res.end("Ошибка создания доктора");
        });
    }
  });
};

module.exports = { getDoctors, addDoctor };
