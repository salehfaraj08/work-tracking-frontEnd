import { useHistory } from 'react-router-dom';
import { endShift, startShift } from '../../api/restApi';
import { getUser } from '../../services/authentication';
import { isAuthenticated } from '../../services/authentication';
import { useState } from 'react';
import './style.css'
const StartShift = () => {
    const [msgError, setMsgError] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [successMsgEnd, setSuccessMsgEnd] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [shift, setShift] = useState(null);
    const history = useHistory();

    const startShiftHandle = async () => {
        setSuccessMsg(false);
        setMsgError(false);
        setShowLoader(true);
        console.log('start shift');
        const user = getUser();
        const response = await startShift(user._id);
        console.log("getshifts", response);
        if (response.status === 200) {
            setShowLoader(false);
            setSuccessMsg(true);
            const newShift = response.data;
            setShift(newShift);
        } else {
            if (response.status === 403) {
                if (!isAuthenticated()) {
                    console.log('pushed worker');
                    history.push('/signin')
                }
            }
            else {
                setShowLoader(false);
                const error = response.data.msg;
                setMsgError(error);
                console.log(error);
            }
        }
    }

    const endShiftHandle = async () => {
        setSuccessMsg(false);
        setMsgError(false);
        if (shift) {
            console.log('end shift');
            console.log(shift);
            setShowLoader(true);
            const response = await endShift(shift._id);
            console.log("getshifts", response);
            if (response.status === 200) {
                setShowLoader(false);
                setSuccessMsgEnd(true);
                setShift(null);
            } else {
                if (response.status === 403) {
                    if (!isAuthenticated()) {
                        console.log('pushed worker');
                        history.push('/signin')
                    }
                }
                else {
                    setShowLoader(false);
                    const error = response.data.msg;
                    setMsgError(error);
                    console.log(error);
                }
            }
        }
        else {
            setMsgError('You cannot end your shift before starting it');
        }

    }

    return (<>

        <div className='startShift-cont'>
            <div className='startShift-wrap'>
                <button onClick={startShiftHandle} className='button-shift'>Start shift</button>

            </div>

            <div className='startShift-wrap'>
                <button onClick={endShiftHandle} className='button-shift endShift'>End shift</button>
            </div>


        </div>
        {showLoader &&
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        }
        {successMsg && <div style={{ display: 'flex', justifyContent: 'center' }}> <div className='success'>You have started your shift successfully</div></div>}
        {successMsgEnd && <div style={{ display: 'flex', justifyContent: 'center' }}> <div className='success'>You have closed your shift successfully</div></div>}
        {msgError && <div style={{ display: 'flex', justifyContent: 'center' }}><div className='msg-Error'>{msgError}</div></div>}
    </>)
}

export default StartShift;