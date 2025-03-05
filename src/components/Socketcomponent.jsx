import React, { useState, useEffect } from 'react'
import io from "socket.io-client";

const socket = io("http://127.0.0.1:3005");


export default function Socketcomponent(props) {
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
    }, []);




    function messageSendFunc() {
        console.log("Sending message")
        socket.emit("message", {
            orderId: props.orderId,
            messageData: "Hello test message",
        });

    }

    return (
        <div>
            Connected to the order room
            <button onClick={messageSendFunc}>Send message</button>
        </div>
    )
}
