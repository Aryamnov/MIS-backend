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

const { addSchedule, getSchedule } = require("../controllers/schedule");

router.on("POST", "/schedule", (req, res) => addSchedule(req, res));
router.on("GET", "/schedule", (req, res) => getSchedule(req, res));

module.exports = router;
