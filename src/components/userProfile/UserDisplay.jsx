import { useEffect, useState } from "react";
import { isAuthenticated } from "../../services/authentication";

const UserDisplay = () => {
    const shifts = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUser = isAuthenticated();
        console.log(getUser);
        if (getUser) {
            setUser(getUser);
        }
        console.log('mount');
    }, [])

    return (<>
        <div>
            Welcome {user && user.firstName} {user && user.lastName}
        </div>
        <div>
            {/* {user.shifts.length > 0 && user.shifts.map(userShift => {
                return 
            })
            } */}
        </div>

    </>)
}

export default UserDisplay;