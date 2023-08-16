import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { ufId } = req.query
    const response = await prisma.city.findMany({
        where: {
            ufId: String(ufId)
        },
        orderBy: {
            name: 'asc'
        }
    })
    return res.status(200).json(response)
}
