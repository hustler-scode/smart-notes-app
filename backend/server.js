require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

/*
--------------------------------------------------
 Middleware Setup
--------------------------------------------------
*/

app.use(cors());

app.use(express.json());

/*
--------------------------------------------------
 Routes
--------------------------------------------------
*/

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/tags", require("./routes/tagRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

/*
--------------------------------------------------
 Swagger
--------------------------------------------------
*/

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
--------------------------------------------------
 Database Sync + Server Start
--------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error(err));