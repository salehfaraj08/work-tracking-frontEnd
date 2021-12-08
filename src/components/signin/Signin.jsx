import './style.css'
const Signin = () => {
    return (
        <div class="limiter">
            <div class="container-login100" >
                <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <form class="login100-form validate-form">
                        <span class="login100-form-title p-b-49">
                            Login
                        </span>

                        <div class="wrap-input100 validate-input m-b-23">
                            <span class="label-input100">Username</span>
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <i style={{ marginTop: '20px', marginLeft: '5px' }} class="fas fa-user"></i>
                                    <input class="input100" type="text" name="username" placeholder="Type your username" />
                                    <span class="focus-input100"></span>
                                </div>

                            </div>

                        </div>

                        <div class="wrap-input100 validate-input">
                            <span class="label-input100">Password</span>
                            <div style={{ display: 'flex' }}>
                                <i style={{ marginTop: '20px', marginLeft: '5px' }} class="fas fa-lock"></i>
                                <input class="input100" type="password" name="pass" placeholder="Type your password" />
                                <span class="focus-input100"></span>
                            </div>
                        </div>

                        <div style={{marginTop:'10vh'}} class="container-login100-form-btn">
                            <div class="wrap-login100-form-btn">
                                <div  class="login100-form-bgbtn"></div>
                                <button class="login100-form-btn">
                                    Login
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div >
        </div >
    )
}

export default Signin;