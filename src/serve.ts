import { NextFunction, Request, Response } from 'express';
import 'express-async-errors'
import { AppError } from './errors/appError';
const express = require("express");
import { routes } from "./routes"

const app = express()

app.use(express.json())

app.use(routes)


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal serve error - ${err.message}`
  })
})


app.listen(3333, () => {
  console.log("Serve is running in port 3333")
})
