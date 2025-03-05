import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const OrderForm = () => {
    const { user, token } = useAuth();
    console.log(user._id)
    console.log("Calling")
    const [orderData, setOrderData] = useState({
        phone_1: user.phone,
        phone_2: "",
        from: "",
        to: "",
        total_road_distence: "",
        material_name: "",
        vehicle_size: "",
        qty: "",
        qty_in_tones: "",
        qty_in_kiloliter: "",
        vehicle_body_type: "",
        vehicle_capacity_in_tons: "",
        vehicle_capacity_in_kiloliter: "",
        vehicle_weight_type: "",
        vehicle_category: "",
        order_status: "Pending",
        locationHistory: [
            {
                latitude: 28.7041,
                longitude: 77.1025,
                place_name: "Delhi",
            },
        ],
        accepted_by_driver: "",
        accepted_by_truck: "",
        order_location: {
            type: "Point",
            coordinates: [77.1025, 28.7041],
        },
        requested_trucks: [],
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle form changes
    const handleChange = (e) => {
        console.log("Helllllllll")
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
        console.log("Calling handleChange");
        console.log(orderData)
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("http://127.0.0.1:3005/order/createorder", orderData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage("Order Created Successfully!");
            console.log("Order Response:", response.data);
        } catch (error) {
            console.error("Order Creation Failed", error);
            setMessage("Failed to create order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="phone_1" placeholder="Phone 1" value={user.phone} onChange={handleChange} required />
                <input type="number" name="phone_2" placeholder="Phone 2" onChange={handleChange} required />
                <input type="text" name="from" placeholder="Pickup Location" onChange={handleChange} required />
                <input type="text" name="to" placeholder="Drop Location" onChange={handleChange} required />
                <input type="text" name="material_name" placeholder="Material Name" onChange={handleChange} required />
                <input type="number" name="qty" placeholder="Quantity" onChange={handleChange} required />
                <input type="text" name="vehicle_size" placeholder="Vehicle Size" onChange={handleChange} required />
                {/* <input type="text" name="vehicle_category" placeholder="Vehicle Category" onChange={handleChange} required /> */}
                <select name="vehicle_category" id="vehicle_category" onChange={handleChange} required>
                    <option value="">Select Vehicle Category</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Truck">Truck</option>
                    <option value="Tanker">Tanker</option>
                    <option value="Container">Container</option>
                </select>
                <input type="number" name="total_road_distence" placeholder="total_road_distence" onChange={handleChange} required />
                <input type="number" name="qty_in_tones" placeholder="qty_in_tones" onChange={handleChange} required />
                <input type="number" name="qty_in_kiloliter" placeholder="qty_in_kiloliter" onChange={handleChange} required />
                {/* <input type="text" name="vehicle_body_type" placeholder="vehicle_body_type" onChange={handleChange} required /> */}
                <select name="vehicle_body_type" id="vehicle_body_type" onChange={handleChange} required>
                    <option value="">Select vehicle body type</option>
                    <option value="close_body">Close Body</option>
                    <option value="open_body">Open Body</option>
                    <option value="flatbed">Flatbed</option>
                    <option value="container">Container</option>
                </select>
                <input type="number" name="vehicle_capacity_in_tons" placeholder="vehicle_capacity_in_tons" onChange={handleChange} required />
                <input type="number" name="vehicle_capacity_in_kiloliter" placeholder="vehicle_capacity_in_kiloliter" onChange={handleChange} required />
                {/* <input type="text" name="vehicle_weight_type" placeholder="vehicle_weight_type" onChange={handleChange} required /> */}
                <select name="vehicle_weight_type" id="vehicle_weight_type" onChange={handleChange} required>
                    <option value="">Select Vehicle Weight Type</option>
                    <option value="tons">Tons</option>
                    <option value="kiloliter">Kiloliter</option>
                </select>
                
                <button type="submit" disabled={loading}>{loading ? "Booking..." : "Create Order"}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default OrderForm;
