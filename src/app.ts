import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger'; 
import healthRouter from './api/v1/routes/health';
import employeeRouter from './api/v1/routes/employeesRouter'; 
import branchRouter from "./api/v1/routes/branchRouter";
import { errorHandler } from './api/v1/middlewares/errorHandler';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use Morgan for HTTP request logging
app.use(morgan('combined'));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register routes
app.use('/api/v1/employees', employeeRouter);
app.use('/', healthRouter);
app.use("/api/v1/branches", branchRouter);
app.use(errorHandler);
// Use Helmet middleware to set HTTP headers for security
app.use(helmet());
// Use cors middleware 
app.use(cors());

export default app;
