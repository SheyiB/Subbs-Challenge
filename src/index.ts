import express from "express"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import {userRouter} from "./routers/user.routes"
import {authRouter} from "./routers/auth.routes"
import swaggerUi from "swagger-ui-express"

AppDataSource.initialize()
    .then(async () => {console.log("Connected to database")})
    .catch(error => console.log(error))

export const app = express()

app.use(express.json())

app.use('/api/tasks', userRouter)
app.use('/api/auth', authRouter )
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("../swagger.json")))
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})

