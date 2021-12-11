import './style.css'
import { useState } from 'react';
import { addWorker } from '../../api/restApi';
import { isAuthenticated } from '../../services/authentication';
import { useHistory } from 'react-router-dom';
const AddWorker = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        passportId: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [msgError, setMsgError] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const handleChange = (e) => {
        const regex = /^[0-9]*$/;
        if (regex.test(e.target.value) && e.target.name === 'passportId') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
        else if (e.target.name !== 'passportId') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
        else {
            window.alert('please enter only numbers');
        }
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        setShowLoader(true);
        e.preventDefault();
        console.log('login', formData.passportId, formData.password);
        if (formData.passportId.length === 9) {
            const worker = {
                passportId: formData.passportId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password
            }
            const response = await addWorker(worker)
            console.log("response.data", response);
            if (response.status === 200) {
                setShowLoader(false);
                setSuccessMsg(true);
            } else {
                setShowLoader(false);
                if (response.status === 403) {
                    if(!isAuthenticated()){
                        console.log('pushed worker');
                        history.push('/signin')
                    }
                }
                else {
                    const error = response.data.msg;
                    console.log(error);
                    setSuccessMsg(false);
                    setMsgError(error);
                }
            }

        } else {
            setShowLoader(false);
            window.alert('your passport id needs to be 9 digits')
        }

    }

    return <>
        <div className='cont-addworker'>
            <div className="wrapper">
                <div className="inner">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h3>Add Worker</h3>
                        <div className="form-group">
                            <div className="form-wrapper">
                                <label htmlFor="">First Name</label>
                                <input required value={formData.firstName} onChange={(e) => handleChange(e)} name="firstName" type="text" className="form-control" />
                            </div>
                            <div className="form-wrapper">
                                <label htmlFor="">Last Name</label>
                                <input required value={formData.lastName} onChange={(e) => handleChange(e)} name="lastName" type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="">Passport Id</label>
                            <input required value={formData.passportId} onChange={(e) => handleChange(e)} name="passportId" type="text" className="form-control" />
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="">Password</label>
                            <input required value={formData.password} onChange={(e) => handleChange(e)} name="password" type="password" className="form-control" />
                        </div>
                        <button type='submit' className='addWorker-btn'>Add Worker</button>
                        {msgError && <><div className='msgError'>{msgError}</div></>}
                        {successMsg && <><div style={{ textAlign: 'center', color: 'green' }}>Worker have been added successfully</div></>}
                    </form>
                    {showLoader && <div className='add-worker-spinnerCont'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
                </div>
            </div>
        </div>
    </>
}

export default AddWorker;