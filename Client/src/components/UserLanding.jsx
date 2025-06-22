import axios from "axios";
import { useEffect, useState } from "react";


export default function UserLanding() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        async function fetch() {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.post("http://localhost:3000/user/info", {}, {
                    headers:
                    {
                        token: token,
                    }
                })
                setUsername(res.data.username);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, [])
    return (
        <div>
            <div className="bg-white">
                <p>Welcome back, {username}!</p>
                <p>Continue your learning journey</p>
            </div>
        </div>
    );
}