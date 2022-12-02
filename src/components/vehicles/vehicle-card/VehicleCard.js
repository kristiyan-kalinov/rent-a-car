import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../../utils/http-utils/user-requests';
import './VehicleCard.scss';

export function VehicleCard({ vehicle, deleteVehicle, isInDetails }) {
    
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();
    
    const redirectToDetails = () => {
        navigate(`/vehicle/${vehicle.id}`);
    }

    const redirectToEdit = () => {
        navigate(`/vehicle/edit/${vehicle.id}`);
    }

    if (!vehicle) {
        return <p>No Vehicle!</p>;
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={vehicle.picture} />
            <Card.Body>
                <Card.Title>{ vehicle.brand + " " + vehicle.model + " " + vehicle.constructionYear }</Card.Title>
                <Card.Text>
                    <span className='key'>Vehicle type: </span>
                    <span className='value'>{vehicle.vehicleType}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Fuel type: </span>
                    <span className='value'>{vehicle.fuelType}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Number of seats: </span>
                    <span className='value'>{vehicle.numberOfSeats}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Price per day: </span>
                    <span className='value'>{vehicle.pricePerDay}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Count: </span>
                    <span className='value'>{vehicle.count}</span>
                </Card.Text>
                <div className='btn-holder'>
                    { loggedUser.role === "admin" ? <Button variant="primary" onClick={redirectToEdit}>Edit</Button> : ''}
                    { loggedUser.role === "admin" ? <Button variant="danger" onClick={() => deleteVehicle(vehicle.id)}>Delete</Button> : '' }
                    { !isInDetails && loggedUser.role !== "admin" ? <Button variant="info" onClick={redirectToDetails}>Details</Button> : '' }
                </div>                
            </Card.Body>
        </Card>
    );
}