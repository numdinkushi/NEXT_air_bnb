import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorised" subtitle="Please login" />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No trips found" subtitle="Looks like you haven't reserved any trip." />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient 
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

};

export default TripPage;