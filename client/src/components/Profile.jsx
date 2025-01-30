import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import jsPDF from 'jspdf';

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

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  margin-top: 10px;
`

const Title = styled.h1`
text-align: center;
margin-bottom: 50px;
color: #805936;
`

const Label = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  overflow: auto;
  color: #b37137;
  flex: 2;
`;
const Label2 = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  overflow: auto;
  color: ${({ theme }) => theme.textSoft};
  flex: 7;
`;
const SubscribedList = styled.div`
  
`;

const SubscribedChannel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin: 5px 0;
`;

const Avatar = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background-color: #999;
`


const Profile = ({ setOpenProf }) => {
    const { currentUser } = useSelector((state) => state.user);
    const handleDownload = () => {
        const doc = new jsPDF();

        // Add user details to the PDF
        doc.text('Profile Information', 10, 10);
        doc.text(`Name: ${currentUser.name}`, 10, 20);
        doc.text(`Email: ${currentUser.email}`, 10, 30);
        doc.text(`Profile Photo Url: ${currentUser.img}`, 10, 40);
        doc.text(`No of Subscribers: ${currentUser.subscribers}`, 10, 50);
      
        // Add Channels Subscribed section
        doc.text('Channels Subscribed:', 10, 60);
      
        // Start from line 70 for subscribed channels
        let y = 70;
        currentUser.subscribedUsers.forEach((channel) => {
          doc.text(`- ${channel}`, 10, y);
          y += 10; // Move to the next line
        });
      
        // Save the PDF
        doc.save('profile_data.pdf');
    };

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpenProf(false)}>X</Close>
                <Title>Profile</Title>
                <Avatar src={currentUser.img}/>
                <Label>Name:<Label2>{currentUser.name}</Label2> </Label>
                <Label>Email: <Label2>{currentUser.email}</Label2></Label>
                <Label>Profile Photo Url: <Label2>{currentUser.img}</Label2></Label>
                <Label>No of Subscribers: <Label2>{currentUser.subscribers}</Label2></Label>
                <Label>Channels Subscribed:</Label>
                <SubscribedList>
                    {currentUser.subscribedUsers.map((channel, index) => (
                        <SubscribedChannel key={index}>{channel}</SubscribedChannel>
                    ))}
                </SubscribedList>
                <Button onClick={handleDownload}>Download Account Data</Button>
            </Wrapper>
        </Container>
    )
}

export default Profile