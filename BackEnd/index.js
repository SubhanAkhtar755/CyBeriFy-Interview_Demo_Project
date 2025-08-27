import express from 'express';
import helmet from 'helmet';
import routes from './src/routes/index.js';
import mongoose from './src/db/index.js';
import chalk from 'chalk';
import env from 'dotenv';
import fileUpload from 'express-fileupload';
import cookieParser from "cookie-parser";


const app = express();
env.config(); // ✅ required for .env

// ✅ Middleware
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use(helmet());
app.use(cookieParser());

// ✅ Test route
app.get('/', (req, res) => {
  res.send(new Date().toString());
});

// ✅ MongoDB connection checks
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("open", () => {
  console.log(chalk.magentaBright.bgWhite("----------MongoDB connection successful----------"));
});

// ✅ Routing
app.use('/api', routes);

// ❌ REMOVE this cloudinary.config section from here
// ✅ It should be moved inside utils/cloudinary.js

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started on PORT:', PORT);
});
