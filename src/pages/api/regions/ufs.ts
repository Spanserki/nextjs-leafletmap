import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await prisma.uf.findMany({
        orderBy: {
            name: 'asc'
        }
    })
    return res.status(200).json(response)
}
