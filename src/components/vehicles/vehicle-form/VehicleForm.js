import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './VehicleForm.scss';
import { getLoggedUser } from '../../../utils/http-utils/user-requests';
import { getVehicleById, saveVehicle, VehicleType, FuelType } from '../../../utils/http-utils/vehicle-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function VehicleForm() {

    const loggedUser = getLoggedUser();
    const params = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        vehicleType: '',
        brand: '',
        model: '',
        constructionYear: '',
        fuelType: '',
        numberOfSeats: '',
        picture: '',
        pricePerDay: '',
        count: '',
    });

    useEffect(() => {
        if (params.id) {
            getVehicleById(params.id).then(response => {
                setVehicle(response.data);
            });
        }        
    }, [params.id])

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveVehicle(vehicle).then(() => {
            console.log('Success');
            navigate('/vehicles-list');
        });
    }

    const onInputChange = (event) => {        
        let value = event.target.value;

        setVehicle((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    return (
        <div className="vehicle-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Vehicle type</Form.Label>
                    <Form.Select placeholder="Select vehicle type" name="vehicleType" value={vehicle.vehicleType} onChange={onInputChange}> 
                        { Object.keys(VehicleType).map(vehicleType => <option key={vehicleType} value={VehicleType[vehicleType]}>{VehicleType[vehicleType]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter brand" name="brand" value={vehicle.brand} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Enter model" name="model" value={vehicle.model} onChange={onInputChange} required />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Construction year</Form.Label>
                    <Form.Control type="number" placeholder="Enter construction year" name="constructionYear" value={vehicle.constructionYear} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Fuel type</Form.Label>
                    <Form.Select placeholder="Select fuel type" name="fuelType" value={vehicle.fuelType} onChange={onInputChange}> 
                        { Object.keys(FuelType).map(fuelType => <option key={fuelType} value={FuelType[fuelType]}>{FuelType[fuelType]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Number of seats</Form.Label>
                    <Form.Control type="number" placeholder="Enter number of seats" name="numberOfSeats" value={vehicle.numberOfSeats} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="picture" value={vehicle.picture} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price per day</Form.Label>
                    <Form.Control type="number" placeholder="Enter price per day" name="pricePerDay" value={vehicle.pricePerDay} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="number" placeholder="Enter count" name="count" value={vehicle.count} onChange={onInputChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}