import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    
    try {
        const categorias = await prisma.categoria.findMany({
            include:{
                productos: true
            }
        });
        res.status(200).json(categorias)

    } catch (error) {
        console.log(error)
    }
    
}