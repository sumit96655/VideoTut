import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const supabase = createClient('https://vxcjsgubvofkwetixoab.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4Y2pzZ3Vidm9ma3dldGl4b2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTI0NDksImV4cCI6MjA0Nzk2ODQ0OX0.fKPGH5R-oPP5UPmNWyhVZCfTPJBUt3NLByfMMAKlSO0')  

const Container = styled.div`
width: 100%;
height: 100%;
position: fixed;
z-index: 3;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
width: 600px;
height: 600px;
background-color: ${({ theme }) => theme.bgLighter};
color: ${({ theme }) => theme.text};
padding: 20px;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;
`
const Close = styled.div`
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
`
const Title = styled.h1`
text-align: center;
`
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen }) => {
    const [video, setVideo] = useState(undefined)
    const [img, setImg] = useState(undefined)
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);

    const { currentUser } = useSelector((state) => state.user);

    const navigate=useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    };
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
    useEffect(() => {
        if (video) uploadFile(video, 'video');
    }, [video])
    useEffect(() => {
        if (img) uploadFile(img, 'image');
    }, [img])

    const handleUpload = async () => {
        try {
            if (!video || !img || !inputs.title || !inputs.desc) {
                console.error("All fields are required.");
                return;
            }
    
            // Upload video and image to Supabase
            const videoUrl = await uploadFile(video, 'video');
            const imageUrl = await uploadFile(img, 'image');
    
            if (!videoUrl || !imageUrl) {
                console.error("Failed to upload files to Supabase.");
                return;
            }
    
            // Create the video object to send to the backend
            const newVideo = {
                userId: currentUser._id, // Replace with the actual user ID
                title: inputs.title,
                desc: inputs.desc,
                imageUrl,
                videoUrl,
                tags,
            };
    
            // Save the video in MongoDB via your API
            const res = await axios.post("http://localhost:8800/api/videos", newVideo, {
                withCredentials: true,
            });
    
            if (res.status === 200) {
                alert("Video uploaded successfully:", res.data);
                setOpen(false); // Close the upload modal
            } else {
                console.error("Failed to save video in MongoDB:", res.statusText);
            }
        } catch (err) {
            console.error("Error uploading video:", err.message);
        }
    };
    

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a new video</Title>
                <Label>Video</Label>
                <Input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
                <Input type="text" placeholder="Title" name='title' onChange={handleChange} />
                <Desc type='text' placeholder="Description" name='desc' rows={8} onChange={handleChange} />
                <Input type="text" placeholder="Separate the tags with commas." onChange={handleTags} /> 
                <Label>Image</Label>
                <Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload