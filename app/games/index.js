import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { addDays, formatISO } from 'date-fns'

const prisma = new PrismaClient()

export const list = async (ctx) => {
    if (!ctx.headers.authorization) {
        ctx.status = 401
        return
    }

    const [type, token] = ctx.headers.authorization.split(" ")

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)

        const currentDate = ctx.request.query.gameTime
    
        // Datas maiores ou iguais ao current date, se o currentDate existir, se não existir não adiciona a query
        const where = currentDate ? {
            gameTime: {
                gte: currentDate,
                lt: formatISO(addDays(new Date(currentDate), 1))
            }
        } : {}
    
        try {
            const games = await prisma.game.findMany({ where })
            ctx.body = games
            ctx.status = 200
        } catch (error) {
            ctx.body = error
            ctx.status = 500
        }
    } catch (error) {
        ctx.status = 401
        return
    }
}