import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteRentalEvent, getAllRentalEvents, getAllRentalEventsByUser } from "../../../utils/http-utils/rental-event-requests";
import { RentalEventCard } from "../rental-event-card/RentalEventCard";
import './RentalEventsList.scss';

export function RentalEventsList() {
    const[rentalEvents, setRentalEvents] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getAllRentalEventsByUser(params.id).then(response => {
                setRentalEvents(response.data);
            });
        }
        else {
            getAllRentalEvents().then(response => {
                setRentalEvents(response.data);
            })
        }
    }, [params.id])

    const onDeleteHandler = async (id) => {
        await deleteRentalEvent(id);
        setRentalEvents(prevState => {
            return prevState.filter(rentalEvent => rentalEvent.id !== id);
        });
    }
    
    return (
        <div className="rental-events-list-wrapper">
            { rentalEvents.map(rentalEvent => <RentalEventCard key={rentalEvent.id} rentalEvent={rentalEvent} onRentalEventDelete={onDeleteHandler}/>) }
        </div>
    );
}