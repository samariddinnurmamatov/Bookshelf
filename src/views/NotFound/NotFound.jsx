import { Link } from 'react-router-dom';
import BgRasm from '../../assets/Rectangle 2.png'
import Error from '../../assets/not.png'
import Container from '../../components/shared/Container';


const NotFound = () => {
  return (
    <div className='h-screen' style={{backgroundImage: `url(${BgRasm})`,  backgroundRepeat: 'no-repeat'}}>
      <Container>
        <div className='flex flex-col gap-[50px] items-center justify-center h-screen'>
          <img src={Error} alt="" />
          <div className='flex items-center text-center gap-5 w-[45%] text-[17px]'>
            <Link to={"/main"} className='w-[100%] py-1.5 px-10 rounded-[4px]' style={{border: "1px solid #6200EE", color: "white", background: "#6200EE"}}>Go Home Page</Link>
            <Link to={"#"} className='w-[100%] py-1.5 px-10 rounded-[4px]' style={{border: "1px solid #6200EE", color: "white", background: "#6200EE"}}>Reload Page</Link>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default NotFound;
