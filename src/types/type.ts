import { Hotel, Room } from "@prisma/client";

export interface HotelWithRooms extends Hotel {
    rooms : Room[]
}