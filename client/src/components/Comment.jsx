import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
display: flex;
align-items: center;
gap:10px;
margin: 30px 0px;
`
const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`
const Details = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
const Channel = styled.span`
font-size: 13px;
font-weight: 500;
color: ${({ theme }) => theme.text};
`
const Date = styled.span`
font-size: 12px;
font-weight: 400;
color: ${({ theme }) => theme.textSoft};
margin-left: 5px;
`
const Content = styled.div`
font-size: 14px;
color: ${({ theme }) => theme.text};
`
const Buttons = styled.div``
const Button = styled.button``

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`
const Text = styled.span`
  font-size: 14px;
`

const Comment = ({ comment }) => {
    if (!comment) {
        return null; 
      }
    const [channel, setChannel] = useState({})
    useEffect(() => {
        const fetchComment = async () => {
            const res = await axios.put(`http://localhost:8800/api/users/find/${comment.userId}`)
            setChannel(res.data);
        }
        fetchComment();
    }, [comment?.userId])
    return (
        <Container>
            <Avatar src={channel.img}></Avatar>
            <Details>
                <Name>
                    {channel.name}
                </Name>
                <Text>{comment?.desc}</Text>
            </Details>
        </Container>
    )
}

export default Comment