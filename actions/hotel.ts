"use server"
import { db } from "@/lib/prisma";

export const getHotelById = async (hotelId: string) => {

    try {
        const hotel = await db.hotel.findFirstOrThrow({
            where: { id: hotelId },
            include: {
                rooms: true
            }
        })

        if (!hotel) {
            return { error: 'No hotel found' }
        }

        return { hotel };
    } catch (error) {
        console.log(error)
        return { hotel: undefined }
    }
}