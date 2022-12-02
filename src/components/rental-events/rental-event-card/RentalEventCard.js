import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getLoggedUser } from '../../../utils/http-utils/user-requests';

export function RentalEventCard({ rentalEvent, onRentalEventDelete }) {
    const loggedUser = getLoggedUser();
    
    return (
        <div className="rental-event-card-wrapper"> 
            <Card style={{ width: '18rem' }}>
            <Card.Body>
            { loggedUser.role === "admin" ? <Card.Text>
                    <span className='key'>User: </span>
                    <span className='value'>{rentalEvent.userId}</span>
                </Card.Text> : '' }
                <Card.Text>
                    <span className='key'>Vehicle: </span>
                    <span className='value'>{rentalEvent.vehicleId}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>Start date: </span>
                    <span className='value'>{rentalEvent.startDate}</span>
                </Card.Text>
                <Card.Text>
                    <span className='key'>End date: </span>
                    <span className='value'>{rentalEvent.endDate}</span>
                </Card.Text>
                <div className='btn-holder'>
                    { loggedUser.id === rentalEvent.userId || loggedUser.role === "admin" ? <Button variant="danger" onClick={() => onRentalEventDelete(rentalEvent.id)}>Cancel</Button> : '' }
                </div>                
            </Card.Body>
        </Card>
        </div>
    );
}