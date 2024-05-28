import Container from "../../../components/shared/Container";
import SignUpForm from "./SignInForm";
import BgRasm from '../../../assets/Rectangle 2.png'

const SignIn = () => {
  return (
    <div className="bg-white" style={{backgroundImage: `url(${BgRasm})`,  backgroundRepeat: 'no-repeat'}}>
      <div className="flex justify-center items-center h-screen">
        <Container>
          <div className="w-[35%] mx-auto bg-white p-8 rounded-[12px]" style={{boxShadow: "0px 4px 32px 0px #3333330A"}}>
            <h1 className="text-center mb-1 text-black text-[30px]">Sign In</h1>
            <SignUpForm />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SignIn;