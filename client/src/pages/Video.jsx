
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ShareIcon from '@mui/icons-material/Share';
import Comments from '../components/Comments';
import Comment from '../components/Comment';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchSuccess, fetchFailure, fetchStart, like, dislike } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';

const Container = styled.div`
display: flex;
gap: 24px;
`
const Content = styled.div`
flex: 5;
`
const VideoWrapper = styled.div`
  
`
const Title = styled.h1`
 font-size: 18px;
 font-weight: 400;
 margin-top: 20px;
 margin-bottom: 10px;
 color : ${({ theme }) => theme.text};
`
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`
const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({ theme }) => theme.text};
  
`
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`
const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: 15px 0px;
`
const Channel = styled.div`
display: flex;
justify-content: space-between;
`
const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`
const Subscribe = styled.button`
  background-color: red;
  border: none;
  border-radius:3px;
  color: white;
  font-weight: 500;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`
const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
background-color: black;
`
const ChannelDetails = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text};
`
const ChannelName = styled.span`
font-weight: 500;
`
const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20px;
color: ${({ theme }) => theme.textSoft};
font-size: 12px;
`
const Description = styled.p`
font-size: 14px;
`
const VideoFrame=styled.video`
max-height: 560px;
width: 100%;
object-fit: cover;
`

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  // console.log("currentVideo", currentVideo);
  // console.log("currentUser", currentUser);

  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({})
  // console.log("outside:", path);

  useEffect(() => {
    // console.log("inside effect", path);

    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:8800/api/videos/find/${path}`)
        // console.log("v ideo res", videoRes.data);

        const channelRes = await axios.put(`http://localhost:8800/api/users/find/${videoRes.data.userId}`)

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data))
      } catch (err) {
        console.log("error fetching data", err);
      }
    }
    fetchData();
  }, [path, dispatch])

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:8800/api/users/like/${currentVideo._id}`,
        {},
        { withCredentials: true }
      )
      dispatch(like(currentUser._id));
    } catch (err) {
      console.log("error for like", err);
    }
  }
  const handleDislike = async () => {
    try {
      await axios.put(`http://localhost:8800/api/users/dislike/${currentVideo._id}`,
        {},
        { withCredentials: true }
      )
      dispatch(dislike(currentUser._id));
    } catch (err) {
      console.log("error for dislike", err);
    }
    
  }
  
  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id) 
    ? await axios.put(`http://localhost:8800/api/users/unsub/${channel._id}`, {},{ withCredentials: true }) 
    : await axios.put(`http://localhost:8800/api/users/sub/${channel._id}`, {}, { withCredentials: true })
    dispatch(subscription(channel._id))
  }


  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls/>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Info>{currentVideo.views} views . {format(currentVideo.createdAt)} </Info>
            <Buttons>
              <Button onClick={handleLike}>{currentVideo.likes?.includes(currentUser._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}{currentVideo.likes?.length}</Button>
              <Button onClick={handleDislike}>{currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}</Button>
              <Button><ShareIcon></ShareIcon></Button>
              <Button><SaveAltIcon /></Button>
            </Buttons>
          </Details>
          <Hr />
        </VideoWrapper>
        <Channel>
          <ChannelInfo>
            <Image src={channel.img}></Image>
            <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>{currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id}/>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </Content>
      <Recommendation tags={currentVideo.tags}/>
    </Container>
  )
}

export default Video