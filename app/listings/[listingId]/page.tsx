import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/ClientOnly";

interface IParams {
    listingId?: string;
}

const ListingPage = async ( {params} : {params: IParams}) => {
    const listing = await getListingById(params);

    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return ( 
        <div>
            <ClientOnly>
                <ListingClient
                    listing={listing}
                    reservations={reservations}
                    currentUser={currentUser}
                />
            </ClientOnly>
        </div>
     );
}
 
export default ListingPage;