import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import Room from "../components/Room";
import { DatePicker, Space } from 'antd';
import 'antd/dist/reset.css';
import axios from "axios";
import moment from "moment";
import { Option } from "antd/es/mentions";
const { RangePicker } = DatePicker;

function hotels() {

    const [rooms, setrooms] = useState([])
    const [lording, setlording] = useState()
    const [error, seterror] = useState()
    const { RangePicker } = DatePicker;
    const { fromdate, setfromdate } = useState()
    const { todate, setTodate } = useState()
    const {searchkey, setsearchkey}=useState('')
    const {type, setType}=useState('all')
    useEffect(() => {

        try {
            setlording(true)
            const data = (axios.post("/api/rooms/getallrooms")).data

            setrooms(data)
            setlording(false)

        } catch (error) {
            seterror(true)
            setlording(false)
        }

    }, []);
    function filterByDate(dates) {
        setfromdate(moment(dates[0].format("DD-MM-YYYY")))
        setTodate(moment(dates[1].format("DD-MM-YYYY")))
    }
    function filterByserch(){
       const temprooms = duplicaterooms.filter(room=> room.hotel_name.toLowerCase().includes(searchkey.toLowerCase()))
        setrooms(temprooms)
    }
    function filterBytype(e){
        setType(e)
        if(e!=='all'){
            const temprooms = duplicaterooms.filter(room=> room.available_room_types.toLowerCase()==e.toLowerCase())
        setrooms(temprooms)
        }
        else{
            setrooms(duplicaterooms)
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 bs">
            <div className="col-md-3">
                <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />

            </div>
            <div className="col-md-5">
                <input type="text" className="form-control" placeholder="Search room"
                value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterByserch}/>
            </div>
            <div className="col-md-3">
                <select className="form-contol" value={type} onChange={(e)=>{filterBytype(e.target.value)}}>
                    <option value="all">All</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="super deluxe">Super deluxe</option>
                    <option value="suite">Suite</option>
                </select>
            </div>
            </div>


            <div className="row justify-content-center md-5">
                {lording ? (<lording></lording>)
                        : (rooms.map(room => {
                            return <div className='col-md-9'>
                                <Room room={room} fromdate={fromdate} todate={todate}/>
                            </div>
                        }))}
            </div>

        </div>
    )
};

export default hotels;
