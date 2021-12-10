import { useHistory } from 'react-router';
import { isAuthenticated, setAuthentication } from '../../services/authentication';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'
const Signin = () => {
    let history = useHistory();
    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 'admin') {
            history.push('/admin');
        } else if (isAuthenticated() && isAuthenticated().role === 'user') {
            history.push('/user');
        } else {
            history.push('/signin');
        }
    }, [history]);

    const [formData, setFormData] = useState({
        passportId: '',
        password: '',
    });
    const [msgError, setMsgError] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const handleChange = (e) => {
        const regex = /^[0-9]*$/;
        console.log(regex.test(e.target.value),e.target.name);
        if (regex.test(e.target.value) && e.target.name === 'passportId') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
        else if(e.target.name !== 'passportId'){
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
            try {
                const response = await axios.post('http://localhost:5001/api/workers/login', { passportId: formData.passportId, password: formData.password });
                console.log(response.data);
                if (response.status === 200) {
                    setAuthentication(response.data.token, response.data.success);
                    if (isAuthenticated() && isAuthenticated().role === 'admin') {
                        console.log('Redirecting to admin dashboard');
                        history.push('/admin');
                    } else {
                        console.log('Redirecting to user dashboard');
                        history.push('/user');
                    }
                }
            }
            catch (err) {
                if(err.response.data.error){
                    setMsgError(err.response.data.error);
                }
                else{
                    setMsgError('');
                }
                
            }

        } else {
            setShowLoader(false);
            window.alert('your passport id needs to be 9 digits')
        }

    }



    return (
        <div className="limiter">
            <div className="container-login100" >
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <form onSubmit={(e) => handleSubmit(e)} className="login100-form validate-form">
                        <span style={{ color: 'black' }} className="login100-form-title p-b-49">
                            Sign In
                        </span>
                        <div className="wrap-input100 validate-input m-b-23">
                            <span className="label-input100">Passport Id</span>
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <i style={{ marginTop: '35px', marginLeft: '5px' }} className="fas fa-user"></i>
                                    <input required value={formData.passportId} onChange={(e) => handleChange(e)} className="input100" type="text" name="passportId" placeholder="Type your Passport Id" />
                                    <span className="focus-input100"></span>
                                </div>
                            </div>
                        </div>
                        <div className="wrap-input100 validate-input">
                            <span className="label-input100">Password</span>
                            <div style={{ display: 'flex' }}>
                                <i style={{ marginTop: '35px', marginLeft: '5px' }} className="fas fa-lock"></i>
                                <input required value={formData.password} onChange={(e) => handleChange(e)} className="input100" type="password" name="password" placeholder="***********" />
                                <span className="focus-input100"></span>
                            </div>
                        </div>

                        <div style={{ marginTop: '10vh' }} className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button type='submit' className="login100-form-btn">
                                    Login
                                </button>
                            </div>
                        </div>
                        {msgError && <><div className='msgError'>{msgError}</div></>}
                    </form>
                    {showLoader&&<div className='spinnerCont'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
                </div>
            </div >
        </div >
    )
}

export default Signin;