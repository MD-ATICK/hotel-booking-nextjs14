import AddHotelForm from '@/components/AddHotelForm'
import ErrorMessage from '@/components/ErrorMessage'
import { getAuth } from '@/lib/getAuth'
import { getHotelById } from '../../../../../actions/hotel'

interface props {
    params: { hotelId: string }
}
export default async function Hotel({ params: { hotelId } }: props) {

    console.log(hotelId)
    const { error, hotel } = await getHotelById(hotelId)
    const user = await getAuth()

    if (!user) return <ErrorMessage>Unauthorized!</ErrorMessage>
    if (error) return <ErrorMessage>{error}</ErrorMessage>
    if (hotel && hotel.userId !== user?.id) return <ErrorMessage>Access Denied!</ErrorMessage>


    return (
        <div>
            <AddHotelForm hotel={hotel} />
        </div>
    )
}
