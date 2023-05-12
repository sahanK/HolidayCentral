import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
function Room({ room, fromdate, todate }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row bs">
            <div className="col-md-4">
                {/* <img src={room.imageurls[0]} className="smalling" /> */}
            </div>
            <div className="col-md-7">
                <h1>{room.hotel_name}</h1>
                <p>Star Rate :{room.star_rating} </p>
                <p>Destination : {room.destination_country}</p>
                <p>{room.facilities}</p>
                <p>Room Types :{room.available_room_types}</p>
            </div>
            <div style={{ float: "right" }}>
                <link to={`/book/${room._id}${fromdate}${todate}`}>
                <button className="btn btn-primaary">Book Now</button>
                </link>
                <button className="btn btn-primaary" onClick={handleShow}> View Details</button>
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{room.hotel_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel prevLabel='' nextLabel=''>

                            {room.imageurls.map((url, index) => {
                                return <Carousel.Item key={index}>
                                    <img
                                        key={index}
                                        className="d-block w-100"
                                        src={url}
                                        alt="hotel details"
                                    />
                                </Carousel.Item>

                            })}
                        </Carousel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Room
