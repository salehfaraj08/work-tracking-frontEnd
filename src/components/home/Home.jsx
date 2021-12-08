import './style.css'
import back from '../../images/homeBack.jpg'
const Home = () => {
    return <>
        <h1>Welcome to my work Tracking app</h1>
        <div className='contPhoto'>
            <img alt='homeImg' className='homePhoto' src={back} />
        </div>
    </>
}

export default Home;