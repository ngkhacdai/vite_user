import { useState } from "react";
import FooterRegister from "./FooterRegister";
import RegisterForm from "./RegisterForm";
import Otp from "./Otp";

const Register = () => {
  const [isRegister, setIsRegister] = useState();

  return (
    <div className="text-center mt-52">
      {isRegister ? (
        <Otp
          isRegister={isRegister}
          setIsRegister={(values) => setIsRegister(values)}
        />
      ) : (
        <div>
          <RegisterForm setIsRegister={(values) => setIsRegister(values)} />
          <FooterRegister />
        </div>
      )}
    </div>
  );
};

export default Register;
