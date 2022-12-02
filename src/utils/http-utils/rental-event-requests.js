import axios from "axios";
import { getLoggedUser } from "./user-requests";

const apiUrl = 'http://localhost:3005/rental-events';

export function getAllRentalEvents() {
    return axios.get(apiUrl);
}

export function getAllRentalEventsByUser(userId) {
    return axios.get(`${apiUrl}?userId=${userId}`);
}

export function saveRentalEvent(rentalEvent) {
    if(!rentalEvent.id) {
        const loggedUser = getLoggedUser();
        
        rentalEvent.userId = loggedUser.id;
        return axios.post(apiUrl, rentalEvent);
    }

    return axios.put(`${apiUrl}/${rentalEvent.id}`, rentalEvent);
}

export function deleteRentalEvent(id) {
    return axios.delete(`${apiUrl}/${id}`);
}