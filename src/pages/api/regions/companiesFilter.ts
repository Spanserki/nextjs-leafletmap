import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { cityId, isAuthorized } = req.query
    const response = await prisma.company.findMany({
        where: {
            cityId: String(cityId),
            isAuthorized: {
                contains: String(isAuthorized) || undefined
            }
        },
        orderBy: {
            name: 'asc'
        }
    })
    res.status(200).json(response)
}
