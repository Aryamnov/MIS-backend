const { Status } = require("../utils/status-code");

const patientsRouter = require("./patients");
const doctorsRouter = require("./doctors");
const scheduleRouter = require("./schedule");

const checkError = (err) => {
  if (err !== null) {
    res.writeHead(Status.INTERNAL);
    res.end("Произошла ошибка сервера");
  }
};

const router = (req, res) => {
  patientsRouter.lookup(req, res, (err) => checkError(err));
  doctorsRouter.lookup(req, res, (err) => checkError(err));
  scheduleRouter.lookup(req, res, (err) => checkError(err));
  // TODO: добавить обработчик отсутствующего роута
};

module.exports = router;
