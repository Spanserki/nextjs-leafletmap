import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { cityId } = req.query
    const response = await prisma.company.findMany({
        where: {
            cityId: String(cityId)
        },
        orderBy: {
            name: 'asc'
        }
    })
    return res.status(200).json(!!response ? response : undefined)
}
