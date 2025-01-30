import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Upload from './Upload';
import Profile from './Profile';

const Container = styled.div`
position: sticky;
top: 0;
background-color:  ${({ theme }) => theme.bgLighter};
height: 56px;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: right;
height: 100%;
padding: 0px 20px;
position: relative;
`
const Search = styled.div`
width: 40%;
position: absolute;
left: 0;
right: 0;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px;
color: ${({ theme }) => theme.text};
`
const Input = styled.input`
border: none;
background-color: transparent;
outline: none;
`
const Button = styled.button`
padding    :5px 15px ;
background-color: transparent;
border: 1px solid #805936;
color: #805936;
border-radius: 3px;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
`
const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-weight: 500;
color:${({ theme }) => theme.text} ;
cursor: pointer;
`
const Avatar = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: #999;
`


const Navbar = () => {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.user.currentUser);
  const [open, setOpen] = useState(false);
  const [openProf, setOpenProf] = useState(false);
  const [q, setQ] = useState("")
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder='Search' onChange={(e) => setQ(e.target.value)} />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} style={{ cursor: 'pointer' }} />
          </Search>
          {currentUser ? (
            <User >
              <AddBoxIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} onClick={() => setOpenProf(true)}/>
              {currentUser.name}
            </User>
          ) : <Link to="signin" style={{ textDecoration: "none" }}>
            <Button><AccountCircleIcon />SIGN IN</Button>
          </Link>}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
      {openProf && <Profile setOpenProf={setOpenProf} />}
    </>
  )
}

export default Navbar