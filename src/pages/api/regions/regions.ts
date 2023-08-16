import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes?orderBy=nome');
        for (const item of response.data) {
            const { nome, mesorregiao } = item;
            await prisma.city.create({
                data: {
                    name: nome,
                    Uf: {
                        connect: {
                            initials: mesorregiao.UF.sigla,
                        },
                    },
                },
            });
        }
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        return res.status(400).json({ message: 'error' });
    }
}
