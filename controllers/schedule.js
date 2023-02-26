const { PrismaClient } = require("@prisma/client");
const { Status } = require("../utils/status-code");
const bodyParser = require("body-parser");
const url = require("url");

const prisma = new PrismaClient();

const getTimeTo = (timestampFrom) => {
  const timestamp = new Date(timestampFrom);
  return new Date(timestamp.getTime() + 1800000).toISOString();
};

const addSchedule = (req, res) => {
  bodyParser.json()(req, res, () => {
    const { doctorId, patientId, date, time, isReAppointment } = req.body;
    // TODO: add validation

    if (
      !doctorId ||
      !patientId ||
      !date ||
      !time ||
      isReAppointment === undefined
    ) {
      res.writeHead(Status.BAD_REQUEST);
      res.end(
        "Для создания записи к врачу необходимо передать ids врача и пациента, дату и время приема, а так же его тип"
      );
    } else {
      // TODO: add get doctor and patient from database
      // TODO: add checking the time and date of admission, as well as working hours
      prisma.schedule
        .create({
          data: {
            doctor_id: doctorId,
            patient_id: patientId,
            date: new Date(date),
            time_from: time,
            is_free: false,
            time_to: getTimeTo(time),
            type: isReAppointment,
          },
        })
        .then((reception) => {
          res.writeHead(Status.SUCCESS, { "Content-Type": "application/json" });
          res.end(JSON.stringify(reception));
        })
        .catch((err) => {
          res.writeHead(Status.INTERNAL);
          res.end("Ошибка создания записи");
        });
    }
  });
};

const getSchedule = (req, res) => {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  if (query.date !== undefined) {
    // TODO: add filters
    prisma.schedule
      .findMany({
        where: {
          date: new Date(query.date),
        },
      })
      .then((receptions) => {
        res.writeHead(Status.SUCCESS, { "Content-Type": "application/json" });
        res.end(JSON.stringify(receptions));
      })
      .catch((err) => {
        res.writeHead(Status.INTERNAL);
        res.end("Ошибка создания записи");
      });
  }
};

module.exports = { addSchedule, getSchedule };
