import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import Room from "../components/Room";
import moment from 'moment';

function Bookingscreen(match) {

    const [room, setrooms] = useState()
    const [lording, setlording] = useState(true)
    const [error, seterror] = useState()

    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate).format("DD-MM-YYYY")
    const todate = moment(match.params.todate).format("DD-MM-YYYY")

    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
    const { TotalAmount, setTotalamount } = useState()

    useEffect(async () => {

        try {
            setlording(true)
            const data = (await axios.post("/api/rooms/getallrooms", { roomid: match.params.roomid })).data

            setrooms(data)
            setlording(false)
            setTotalamount(data.price_per_night * totaldays)

        } catch (error) {
            seterror(true)
            setlording(false)
        }
    }, []);
    async function bookroom() {
        const bookingdetails = {
            _id: JSON.parse(localStorage.getItem('Currentuser'))._id,
            hotel_name,
            price_per_night,
            fromDate,
            TomDate,
            totalDate,
            TotalAmount,
        
        }
        try{
            const result = await axios.post('/api/bookinRouts',bookingdetails)
        }catch(error){

        }
    }



    return (
        <div className="m-5">
            {lording ? (<h1>lording.......</h1>) : error ? (<h1>Error</h1>) : (<div>
                <div className='row justify-content-center md-5'>
                    <div className='col-md-5'>
                        <h1>
                            {room.hotel_name}
                        </h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>
                    <div className='col-md-6'>
                        <h1>Booking Details</h1>
                        <hr />
                        <div style={{ textAlign: 'right' }}>
                            <p>Hotel Name   :JSON.parse(localStorage.getItem("Currentuser")).hotel_name</p>
                            <p>From Date    :{match.params.fromdate} </p>
                            <p>Due Date     :{match.params.todate} </p>
                            <p>Max Amount   :</p>
                            <p>Total Dates   :{totaldays}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p>One day rental   :{room.price_per_night}</p>
                            <p>Atachment Amount :{TotalAmount}</p>
                            <p>Full Pyment      :</p>
                        </div>
                        <div style={{ float: 'right' }}>
                            <button className='btn btn-primary' onClick={bookroom}>Pay Now </button>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
