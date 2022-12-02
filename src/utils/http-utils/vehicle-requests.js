import axios from 'axios';

const apiUrl = 'http://localhost:3005/vehicles';
const loggedUserKey = 'loggedUser';

export const VehicleType = {
    ECONOMY: 'Economy',
    ESTATE: 'Estate',
    LUXURY: 'Luxury',
    SUV: 'SUV',
    CARGO: 'Cargo'
};

export const FuelType = {
    PETROL: 'Petrol',
    DIESEL: 'Diesel',
    HYBRID: 'Hybrid',
    ELECTRIC: 'Electric'
};

// .then => resolved correctly
// .catch => has error
// .finally => executed always
export function getAllVehicles() {
    return axios.get(apiUrl);
}

export function getAllVehiclesByBrand(brand) {
    return axios.get(`${apiUrl}?brand=${brand}`);
}

export function getVehicleById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteVehicle(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveVehicle(vehicle) {
    if (!vehicle.picture)
        vehicle.picture = `https://picsum.photos/200/300?random=${Math.random()}`;

    if (vehicle.id) {
        return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
    }

    return axios.post(`${apiUrl}`, vehicle);
}