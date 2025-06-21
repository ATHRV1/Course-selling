import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function CreatorLanding() {
    const [creatorname, setCreatorname] = useState('')

    useEffect(() => {
        async function fetch() {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/creator/credentials", {
                    headers: {
                        token: token,
                    },
                });
                setCreatorname(res.data.username);
            }
            catch (err) {
                console.log(err);
            }

        }
        fetch();
    },[])



    return (
        <div>
            <div className="bg-white pl-40 py-20">
                <p className="text-3xl font-bold">Welcome Back, {creatorname}!</p>
                <p className="text-gray-600 mt-2">Ready to share your knowledge?</p>
            </div>
            <div className="flex">
                <p>Quick Actions</p>
                <div>
                    <p>+</p>
                    <p>Create New Course</p>
                    <p>Start Building your Course</p>
                </div>
            </div>
        </div>
    );
}