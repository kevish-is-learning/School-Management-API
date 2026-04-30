require("dotenv").config();

const express = require("express");
const schoolRoutes = require("./routes/schoolRoutes");
const { checkDatabaseConnection } = require("./db/connection");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy"
  });
});

app.use("/", schoolRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  try {
    await checkDatabaseConnection();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error.message);
    process.exit(1);
  }
}

startServer();
