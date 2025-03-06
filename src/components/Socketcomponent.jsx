import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
import { useAuth } from '../context/AuthContext';

const socket = io("http://127.0.0.1:3005");


export default function Socketcomponent(props) {
    const {findNearestTrucks, nearestTrucks, setnearestTrucks} = useAuth();
    const [setIntervalId, setsetIntervalId] = useState();
    


    useEffect(() => {
        const joinOrderRoom = () => {
            if (props.orderId.trim()) {
                socket.emit("join_order", props.orderId);
                // setMessages((prev) => [...prev, `✅ Joined Order Room: ${props.orderId}`]);
            }
        };

        joinOrderRoom();
        // ✅ Listen for messaged
        socket.on("messaged", (data) => {
            console.log(data);
        });

        // const intervalIDD = setInterval(()=>{
        //     const joinTruckRoom = () => {
        //         if (props.orderId.trim()) {
        //             socket.emit("join_truck_room", nearestTrucks[0]);
        //             // setMessages((prev) => [...prev, `✅ Joined Order Room: ${props.orderId}`]);
        //         }
        //     };
        // }, 30000)

        findNearestTrucks(props.currentorderLocation.coordinates[0], props.currentorderLocation.coordinates[1], 50000000);
    }, []);




    function messageSendFunc() {
        console.log("Sending message")
        socket.emit("message", {
            orderId: props.orderId,
            currentorderLocation:props.currentorderLocation,
            messageData: "Hello test message",
        });
    }

    if(nearestTrucks){
        return (
            <div>
                <div>Total truck founds {nearestTrucks.length}</div>
                Result
                {JSON.stringify(nearestTrucks)}
                <br />
                <hr />
                Connected to the order room
                <button onClick={messageSendFunc}>Send message</button>
                <hr />
                <div>
                    We are requesting to the first truck
                    <div>Truck Info</div>
                    {JSON.stringify(nearestTrucks[0])}
                </div>
            </div>
        )
    }

    return (
        <div>
            Not Connected to the order room!
            <button onClick={messageSendFunc}>Send message</button>
        </div>
    )
}
