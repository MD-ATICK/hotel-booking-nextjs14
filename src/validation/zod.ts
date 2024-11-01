import z from 'zod'

const requiredString = z.string().trim().min(1, 'Required')
const requiredNumber = z.coerce.number().min(1, 'Required')
const requiredBoolean = z.boolean()

export const AddHotelSchema = z.object({
    title: requiredString,
    description: requiredString,
    image: requiredString,
    country: requiredString,
    state: z.string().nullable(),
    city: z.string().nullable(),
    locationDescription: requiredString,
    gym: requiredBoolean,
    spa: requiredBoolean,
    bar: requiredBoolean,
    laundry: requiredBoolean,
    restaurant: requiredBoolean,
    shopping: requiredBoolean,
    freeParking: requiredBoolean,
    bikeRental: requiredBoolean,
    freeWifi: requiredBoolean,
    movieNights: requiredBoolean,
    swimmingPool: requiredBoolean,
    coffeeShop: requiredBoolean,
})

export type AddHotelValues = z.infer<typeof AddHotelSchema>

export const AddRoomSchema = z.object({
    title: requiredString,
    description: requiredString,
    bedCount: requiredNumber,
    questCount: requiredNumber,
    bathRoomCount: requiredNumber,
    kingBed: requiredNumber,
    queenBed: requiredNumber,
    image: requiredString,
    breakFastPrice: requiredNumber,
    roomPrice: requiredNumber,
    roomService: requiredBoolean,
    TV: requiredBoolean,
    balcony: requiredBoolean,
    freeWifi: requiredBoolean,
    cityView: requiredBoolean,
    oceanView: requiredBoolean,
    forestView: requiredBoolean,
    mountainView: requiredBoolean,
    airCondition: requiredBoolean,
    soundProofed: requiredBoolean,
})

export type AddRoomValues = z.infer<typeof AddRoomSchema>
