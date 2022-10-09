import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const create = async (ctx) => {
    const userId = 'cl91o3mmg0002vk4ol1gfjos4'
    if (!ctx.request.body.homeTeamScore && !ctx.request.body.awayTeamScore) {
        ctx.status = 500
        return
    }

    const { gameId, homeTeamScore, awayTeamScore } = ctx.request.body

    const data = { gameId, homeTeamScore, awayTeamScore }

    // Update se já existir um gameId com o mesmo userId e insert se não houver
    try {
        const hunch = await prisma.hunch.upsert({
            where: { userId, gameId },
            create: { userId, gameId, homeTeamScore, awayTeamScore },
            update: { homeTeamScore, awayTeamScor }
        })

        ctx.body = hunch
        ctx.status = 200
    } catch (error) {
        ctx.body = error
        ctx.status = 500
    }
}

export const list = async (ctx) => {
    try {
        const users = await prisma.user.findMany()
        ctx.body = users
        ctx.status = 200
    } catch (error) {
        ctx.body = error
        ctx.status = 500
    }
}