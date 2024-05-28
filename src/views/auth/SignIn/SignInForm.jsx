import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import axios from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import Circle from '../../../assets/x-circle.png';
import { toast } from "react-toastify";

const SignInForm = () => {
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isFormValid = () => {
    return key.trim() !== "" && secret.trim() !== "";
  };

  const buttonText = loading ? <CircularProgress size={24} /> : "Submit";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get("/myself", {
        data: { secret },
        headers: { key },
      });
      if (response.data.isOk) {
        localStorage.setItem("key", response.data.data.key);
        localStorage.setItem("secret", response.data.data.secret);
        localStorage.setItem("USER", JSON.stringify(response.data.data));
        toast.success('User login successfully!', {position: "bottom-right",});
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          type="text"
          label="Key"
          variant="outlined"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: !!error && (
              <img
                src={Circle}
                alt="error"
                style={{ width: "22px", height: "20px" }}
              />
            ),
          }}
        />
      </div>
      <div>
        <TextField
          type="password"
          label="Secret"
          variant="outlined"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: !!error && (
              <img
                src={Circle}
                alt="error"
                style={{ width: "22px", height: "20px" }}
              />
            ),
          }}
        />
      </div>
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
        Already signed up? <Link to="/" className='text-blue-500'>Go to sign up.</Link>
      </div>
    </form>
  );
};

export default SignInForm;