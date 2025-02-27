import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Comment from "./Comment";

const Container = styled.div``
const NewComment = styled.div`
display: flex;
align-items: center;
gap: 10px;
`
const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`
const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    background-color: transparent;
    outline: none;
    padding:5px;
    width: 100%;
`

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user)
  const [comments, setComments] = useState([])
  // console.log(videoId)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/comments/${videoId}`, {}, {
          withCredentials: true
        })
        setComments(res.data);
        // console.log(res);

      } catch (err) {
        console.log(err);
      }
    }
    fetchComments();
  }, [videoId])
  // console.log(comments);


  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder='Add a comment...' />
      </NewComment>
      {comments.filter((comment)=>comment)
      .map((comment) => (
        
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  )
}

export default Comments