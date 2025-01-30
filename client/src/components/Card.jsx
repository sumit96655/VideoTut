import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { format } from "timeago.js"
import axios from 'axios';


const Container = styled.div`
    width: ${(props) => props.type !== "sm" && "360px"};
    margin-bottom: ${(props) => props.type === "sm" ? "10px" : "45px"};
    cursor: pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: 10px;
`
const Image = styled.img`
    width: 100%;
    height: ${(props) => props.type === "sm" ? "120px" : "202px"};
    background-color: #999;
    flex:1; 
`
const Details = styled.div`
display: flex;
margin-top: ${(props) => props.type !== "sm" && "16px"};
gap: 12px;
flex:1;
`
const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => props.type === "sm" && "none"};
`
const Text = styled.div``
const Title = styled.h1`
font-size: 16px;
font-weight: 500;
color: ${({ theme }) => theme.text};
margin-bottom: -1px;
margin-top: -1px;
`
const ChannelName = styled.h2`
font-size: 16px;
color: ${({ theme }) => theme.textSoft};
`
const Info = styled.div`
font-size: 14px;
color: ${({ theme }) => theme.textSoft};
`

const Card = ({ type, video }) => {
    const [channel, setChannel] = useState({});
    // console.log(video);
    useEffect(()=>{
      const fetchChannel= async ()=>{
        const res=await axios.put(`http://localhost:8800/api/users/find/${video.userId}`);
        setChannel(res.data);
      }
      fetchChannel();
    },[video.userId])
    
    return (
        <Link to={`/videos/${video._id}`} style={{ textDecoration: "none" }}>
            <Container type={type}>
                <Image type={type} src={video.imageUrl}/>
                <Details type={type}>
                    <ChannelImage type={type} src={channel.img} />
                    <Text>
                        <Title>{video.title}</Title>
                        <ChannelName>{channel.name}</ChannelName>
                        <Info>{video.views} views. {format(video.createdAt)}</Info>
                    </Text>
                </Details>
            </Container>
        </Link>
    )
}

export default Card