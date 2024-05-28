import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, CircularProgress, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from '../../../services/AuthService';
import Circle from '../../../assets/x-circle.png'
import { toast } from 'react-toastify';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "Text@gmail.com",
    key: "",
    secret: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const buttonText = loading ? <CircularProgress size={24} /> : "Submit";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formErrors = {};
    for (const fieldName in formData) {
      if (!formData[fieldName]) {
        formErrors[fieldName] = `${fieldName} is required`;
      }
    }

    if (formData.key !== formData.secret) {
      formErrors['secret'] = 'Passwords do not match';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/signup", {
        name: formData.name,
        email: formData.email,
        key: formData.key,
        secret: formData.secret
      });
      if (response.data.isOk) {
        localStorage.setItem("key", response.data.data.key);
        localStorage.setItem("secret", response.data.data.secret);
        localStorage.setItem("USER", JSON.stringify(response.data.data));
        toast.success('User registered successfully!', {position: "bottom-right",});
        navigate("/main")
      } else {
        toast.error('Error registering user: ', {position: "bottom-right",} + response.data.message);
      }
    } catch (error) {
      toast.error('Sign Up Error:', {position: "bottom-right",}, error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const renderTextField = (fieldName) => (
    <div key={fieldName}>
      <TextField
        type={fieldName === "email" ? "email" : fieldName === "name" ? "text" : "password"}
        label={fieldName === "name" ? "First Name" : fieldName === "email" ? "Email" : fieldName === "key" ? "Enter your password" : fieldName === "secret" ? "Confirm Password" : ""}
        variant="outlined"
        name={fieldName}
        value={formData[fieldName]}
        onChange={(e) => handleChange(e)}
        fullWidth
        margin="normal"
        error={!!errors[fieldName]}
        helperText={errors[fieldName]}
        InputProps={{
          endAdornment: !!errors[fieldName] && (
            <img
              src={Circle}
              alt="error"
              style={{ width: "22px", height: "20px" }}
            />
          ),
        }}
        style={{ display: fieldName === "email" ? "none" : "" }}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map(renderTextField)}
      <Button
        type="submit"
        fullWidth
        disabled={loading || !isFormValid()}
        variant="contained"
        style={{
          backgroundColor: loading || !isFormValid() ? "gray" : "#6200EE",
          color: "white",
          marginTop: "20px",
          padding: "9px 0"
        }}
      >
        {buttonText}
      </Button>
      <div className='text-center text-[14px] py-[10px]'>
        <span>Already signed up? </span> <Link to={"/sign-in"} className='text-blue-500'> Go to sign in</Link>
      </div>
    </form>
  );
};

export default SignInForm;
