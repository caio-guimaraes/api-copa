import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const create = async (ctx) => {
    if (!ctx.request.body.homeTeamScore && !ctx.request.body.awayTeamScore) {
        ctx.status = 500
        return
    }

    const userId = 'cl91o3mmg0002vk4ol1gfjos4'
    const { gameId } = ctx.request.body
    const homeTeamScore = parseInt(ctx.request.body.homeTeamScore)
    const awayTeamScore = parseInt(ctx.request.body.awayTeamScore)

    // Update se já existir um gameId com o mesmo userId e insert se não houver
    try {
        const [hunch] = await prisma.hunch.findMany({
            where: { userId, gameId },
        })

        if (hunch) {
            ctx.body = await prisma.hunch.update({ 
                where: { id: hunch.id },
                data: {
                    homeTeamScore, awayTeamScore
                }
            })
        } else {
            ctx.body = await prisma.hunch.create({ 
                data: {
                    userId,
                    gameId,
                    homeTeamScore,
                    awayTeamScore
                }
            })
        }

        ctx.status = 200
    } catch (error) {
        ctx.body = error
        ctx.status = 500
    }
}