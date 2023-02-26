// const { Status } = require("../utils/status-code");
const router = require("find-my-way")({
  defaultRoute: (req, res) => {
    // Такой костыль необходим, т.к. без него по умолчанию затирается ответ от сервера
    // на 404 ошибку: причина в том, что мы импортируем несколько роутеров в index
    // 'not found' необходимо задавать явно в index файле роута
    // res.statusCode = Status.NOT_FOUND;
    // res.end("Not found");
  },
});

const { getPatients, addPatient } = require("../controllers/patients");

router.on("GET", "/patients", (req, res) => getPatients(req, res));
router.on("POST", "/patients", (req, res) => addPatient(req, res));

module.exports = router;
