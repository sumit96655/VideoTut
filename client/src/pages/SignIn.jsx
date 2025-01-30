import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { loginStart, loginFailure, loginSuccess } from '../redux/userSlice'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'


const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: calc(100vh - 56px);
`
const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: ${({ theme }) => theme.bgLighter};
padding: 20px 50px;
border: 1px solid ${({ theme }) => theme.soft};
gap:10px;
`
const Title = styled.h1`
margin-bottom: -3px;
margin-top: -2px;
font-size: 24;
color: ${({ theme }) => theme.text};
`
const SubTitle = styled.h2`
margin-bottom: 2px;
font-size: 20px;
font-weight: 300;
color: ${({ theme }) => theme.text};
`
const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 100%;
`
const InputImg = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  width: 100%;

`;
const Label = styled.span`
  font-size: 14px;
`;

const Button = styled.button`
border: none;
border-radius: 3px;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
`
const More = styled.div``

const supabase = createClient('https://vxcjsgubvofkwetixoab.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4Y2pzZ3Vidm9ma3dldGl4b2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTI0NDksImV4cCI6MjA0Nzk2ODQ0OX0.fKPGH5R-oPP5UPmNWyhVZCfTPJBUt3NLByfMMAKlSO0')


const SignIn = () => {
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8800/api/auth/signin", { name, password }, {
        withCredentials: true
      })
      dispatch(loginSuccess(res.data));
      navigate(`/`);
    } catch (err) {
      err?.status===404 && alert("Please enter a valid username")
      dispatch(loginFailure());
    }
  }

  const uploadFile = async (file, type) => {
    if (!file) return;

    try {
      // Generate a unique file path
      const filePath = `${type}/${Date.now()}_${file.name}`;

      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from('VideoTutB') // Replace with your actual bucket name
        .upload(filePath, file);

      if (error) {
        console.error(`Error uploading ${type}:`, error.message);
        return null; // Return null in case of error
      }

      // Get the public URL of the uploaded file
      const { data: publicData } = supabase.storage
        .from('VideoTutB')
        .getPublicUrl(filePath);

      if (type === 'video') {
        setVideoPerc(100); // Update video progress
        return publicData.publicUrl; // Return the video URL
      }

      if (type === 'image') {
        setImgPerc(100); // Update image progress
        return publicData.publicUrl; // Return the image URL
      }
    } catch (err) {
      console.error(`Error in ${type} upload:`, err.message);
      return null;
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!password || !img || !name || !email) {
        console.error("All fields are required.");
        return;
      }
      const imageUrl = await uploadFile(img, 'image');
      if (!imageUrl) {
        console.error("Failed to upload files to Supabase.");
        return;
      }
      const newUser = {
        name: name, // Replace with the actual user ID
        email: email,
        password: password,
        img: imageUrl,

      };
      const res = await axios.post(
        "http://localhost:8800/api/auth/signup",
        newUser,
        { withCredentials: true }
      );
      setName("");
      setEmail("");
      setPassword("");
      setImg("");
      alert("User registered successfully! Please sign in."); // Notify user
    } catch (err) {  
      if (err.response) {
        // If error has response data from server
        if (err.response.status === 400) {
            alert("Bad Request: Please check your input.");
        } else if (err.response.status === 409) {
            alert("Email already exists. Please use a different email address.");
        }else if(err.response.status === 500){
            alert("username or email already used");
        } 
        else {
            alert(`Error: ${err.response.data.message || "An unknown error occurred"}`);
        }
    } else {
        // For network or other errors
        alert(`Error: ${err.message || "Something went wrong. Please try again later."}`);
    }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to VideoTut</SubTitle>
        <Input placeholder='username' onChange={(e) => { setName(e.target.value) }} />
        <Input type='password' placeholder='password' onChange={(e) => { setPassword(e.target.value) }} />
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>or</Title>
        <Input placeholder='username' onChange={(e) => { setName(e.target.value) }} />
        <Input type='email' placeholder='email' onChange={(e) => { setEmail(e.target.value) }} />
        <Input type='password' placeholder='password' onChange={(e) => { setPassword(e.target.value) }} />
        <Label>Profile Photo</Label>
        <InputImg type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />
        <Button onClick={handleRegister}>Sign Up</Button>
      </Wrapper>
    </Container>
  )
}

export default SignIn