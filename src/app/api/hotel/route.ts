import { getAuth } from "@/lib/getAuth"
import { db } from "@/lib/prisma"
import { AddHotelSchema } from "@/validation/zod"


export async function POST(res: Request) {
    try {

        const body = await res.json()
        const data = AddHotelSchema.parse(body)

        const user = await getAuth()
        if (!user || !user.id) {
            return new Response("Unauthorized", { status: 401 })
        }

        const hotel = await db.hotel.create({
            data: {
                userId: user.id,
                ...data
            }
        })

        console.log('hotel', hotel)

        return Response.json(hotel)

    } catch (error) {
        console.log('api/hotel', error)
        return new Response("internal Server Error", { status: 500 })
    }
}