import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getShifts } from "../../api/restApi";
import { isAuthenticated } from "../../services/authentication";
import './style.css'

const AdminDisplay = () => {
    const [showLoader, setShowLoader] = useState(false);
    const history = useHistory();
    const [shifts, setShifts] = useState([]);
    const [user, setUser] = useState(null);
    const [showShiftsVisible, setShowShifts] = useState(false);
    const [showShiftsTextVisible, setShowShiftsText] = useState(false);
    useEffect(() => {
        const getUser = isAuthenticated();
        console.log(getUser);
        if (getUser) {
            setUser(getUser);
        }

    }, []);
    const showShifts = async () => {
        setShowLoader(true);
        setShowShifts(true);
        const response = await getShifts(user._id);
        console.log("getshifts", response);
        if (response.status === 200) {
            console.log(response.data);
            const workerShifts = response.data;
            console.log(workerShifts);
            if (workerShifts.length === 0)
                setShowShiftsText(true);
            setShowLoader(false);
            setShifts(workerShifts);
        } else {
            if (response.status === 403) {
                if (!isAuthenticated()) {
                    console.log('pushed worker');
                    history.push('/signin')
                }
            }
            else {
                setShowShiftsText(true);
                setShowLoader(false);
                const error = response.data.msg;
                console.log(error);
            }
        }
    }

    return (<>
        <div className='welcome'>
            <div className='Administrator'>Administrator</div>
            <div className='welcomeAdministrator'>
                Welcome {user && user.firstName} {user && user.lastName}
            </div>
        </div>

        <div className="seeMonthly">
            <p style={{ color: 'black', fontSize: '18px' }}>Click the button to see your monthly shifts</p>
            <input className="button-77" value='click' type="button" onClick={showShifts} />
        </div>
        {showLoader &&
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        }
        {showShiftsVisible && shifts.length > 0 && shifts && <h3 style={{ marginTop: '2vh', textAlign: 'center' }}>Your Monthly Shifts</h3>}
        {showShiftsVisible && shifts.length > 0 && shifts &&
            <div className="limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100 ver1 m-b-110">
                            <div className="table100-head">
                                <table>
                                    <thead>
                                        <tr className="row100 head">
                                            <th className="cell100 column1">Date</th>
                                            <th className="cell100 column2">Entery hour</th>
                                            <th className="cell100 column3">Exit hour</th>
                                            <th className="cell100 column4">Shift Duration</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            <div className="table100-body js-pscroll">
                                <table>
                                    <tbody>
                                        {
                                            shifts.map(userShift => {
                                                return <tr key={userShift._id} className="row100 body">
                                                    <td className="cell100 column1">{userShift.day}/{userShift.month}/{userShift.year}</td>
                                                    <td className="cell100 column2">{userShift.enteryHour}</td>
                                                    <td className="cell100 column3">{userShift.exitHour}</td>
                                                    <td className="cell100 column4">{userShift.shiftDuration}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        {
            showShiftsTextVisible &&
            <div className="dontHave">
                <p>
                    You dont have any shifts this month yet.
                </p>
            </div>
        }

    </>)
}

export default AdminDisplay;