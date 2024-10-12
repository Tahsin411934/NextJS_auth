// app/MyForm.jsx

"use client"; // Ensure this component runs on the client side

import { useForm } from "react-hook-form";
import { useState } from "react";

const MyForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false); // New loading state

    const onSubmit = async (data) => {
        setLoading(true); // Set loading to true

        try {
            const res = await fetch("/api/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            setResponse(result); // Set the response
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h1>Data Submission Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Title:
                    <input
                        type="text"
                        {...register("title", { required: true })}
                    />
                    {errors.title && <span>This field is required</span>}
                </label>
                <br />
                <label>
                    Number:
                    <input
                        type="number"
                        {...register("number", { required: true })}
                    />
                    {errors.number && <span>This field is required</span>}
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'} {/* Show loader text */}
                </button>
            </form>

            {response && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default MyForm;
