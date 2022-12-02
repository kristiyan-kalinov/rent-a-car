import { useEffect, useState } from "react";
import { saveRentalEvent } from "../../../utils/http-utils/rental-event-requests";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import './RentalEventForm.scss';
import { getAllVehicles } from "../../../utils/http-utils/vehicle-requests";

export function RentalEventForm() {
    const navigate = useNavigate();
    const[rentalEvent, setRentalEvent] = useState([]);
    const[vehicles, setVehicles] = useState([]);
    var days;
    var days1 = new Date();
    var days2 = new Date();

    useEffect(() => {
        getAllVehicles().then(response => {
            setVehicles(response.data);
         });
    }, [])
    
    const onInputChange = (event) => {
        setRentalEvent((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
        if(event.target.name === "startDate") {
            var placeholderYear = "";
            var placeholderMonth = "";
            var placeholderMonth2 = "";
            var placeholderDay = "";
            for(let i = 0; i < 4; i++) {
                placeholderYear += event.target.value.charAt(i);
            }
            for(let i = 5; i < 7; i++) {
                placeholderMonth += event.target.value.charAt(i);
                placeholderMonth2 = parseInt(placeholderMonth) - 1;
            }
            for(let i = 8; i < 10; i++) {
                placeholderDay += event.target.value.charAt(i);
            } 
            days1 = new Date(placeholderYear, placeholderMonth2, placeholderDay);
            console.log(days1.getTime());
        }
        if(event.target.name === "endDate") {
            var placeholderYear = "";
            var placeholderMonth = "";
            var placeholderMonth2 = "";
            var placeholderDay = "";
            for(let i = 0; i < 4; i++) {
                placeholderYear += event.target.value.charAt(i);
            }
            for(let i = 5; i < 7; i++) {
                placeholderMonth += event.target.value.charAt(i);
                placeholderMonth2 = parseInt(placeholderMonth) - 1;
            }
            for(let i = 8; i < 10; i++) {
                placeholderDay += event.target.value.charAt(i);
            } 
            days2 = new Date(placeholderYear, placeholderMonth2, placeholderDay);
            console.log(days2.getTime());
            //console.log((days2.getTime() - days1.getTime()) / (1000 * 3600 * 24));
        }
        
    }
    
    const onRentalEventSubmit = (event) => {
        event.preventDefault();

        saveRentalEvent(rentalEvent).then(() => {
            navigate('/rental-events-list');
        });
    }
    
    return (
        <div className="rental-event-form-wrapper">
            <Form onSubmit={onRentalEventSubmit}>
                <Form.Group className="mb-3 reftf" controlId="formBasicEmail">
                    <Form.Label>Vehicle</Form.Label>
                    <Form.Select placeholder="Select vehicle" name="vehicleId" value={rentalEvent.vehicleId} onChange={onInputChange}> 
                        { vehicles.map(vehicle => <option key={vehicle.id} value={rentalEvent.vehicleId}>{vehicle.brand + " " + vehicle.model + " " + vehicle.constructionYear}</option>) }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="datetime-local" placeholder="Enter Start date" name="startDate" value={rentalEvent.startDate} onChange={onInputChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="datetime-local" placeholder="Enter End date" name="endDate" value={rentalEvent.endDate} onChange={onInputChange} required/>
                </Form.Group>
                <div>{days}</div>

                <Button variant="primary" type="submit">Rent</Button>
            </Form>
        </div>
    );
}