import { getAuth } from "@/lib/getAuth"
import { db } from "@/lib/prisma"
import { AddHotelSchema } from "@/validation/zod"


export async function PATCH(res: Request, {params} : {params : { hotelId : string}}) {
    try {

        const body = await res.json()
        const data = AddHotelSchema.parse(body)

        const user = await getAuth()
        if (!params.hotelId) {
            return new Response("HotelId not found", { status: 401 })
        }
        if (!user || !user.id) {
            return new Response("Unauthorized", { status: 401 })
        }
        

        const hotel = await db.hotel.update({
            where : {id: params.hotelId},
            data
        })


        return Response.json(hotel)

    } catch (error) {
        console.log('api/hotel', error)
        return new Response("internal Server Error", { status: 500 })
    }
}

export async function DELETE(res: Request, {params} : {params : { hotelId : string}}) {
    try {

        const user = await getAuth()
        if (!params.hotelId) {
            return new Response("HotelId not found", { status: 401 })
        }
        if (!user || !user.id) {
            return new Response("Unauthorized", { status: 401 })
        }
        

        const hotel = await db.hotel.delete({
            where : {id: params.hotelId},
        })


        return Response.json(hotel)

    } catch (error) {
        console.log('api/hotel', error)
        return new Response("internal Server Error", { status: 500 })
    }
}