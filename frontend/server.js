const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // Puerto donde corre React
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
