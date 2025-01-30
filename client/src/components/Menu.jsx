import React, { useState } from 'react'
import styled from 'styled-components'
import logoImg from "../img/logo.png"
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice';
import Cookies from 'js-cookie';
import ComputerIcon from '@mui/icons-material/Computer';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import EvStationIcon from '@mui/icons-material/EvStation';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Premium from './Premium';

const Container = styled.div`
    flex: 1;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 100vh;
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    position: sticky;
    top: 0;
`
const Wrapper = styled.div`
padding: 18px 26px;

`
const Logo = styled.div`
display: flex;
align-items: center;
gap: 5px;
font-weight: bold;
margin-bottom: 25px;
`
const Img = styled.img`
    height: 25px;
`
const Items = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px 0px;
    &:hover{
        background-color: ${({ theme }) => theme.soft};
    }
`

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.soft};
`

const Login = styled.div`
    
`
const Button = styled.button`
padding    :5px 15px ;
background-color: transparent;
border: 1px solid #805936;
color: #805936;
border-radius: 3px;
font-weight: 500;
margin-top: 10px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
`
const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #aaaaaa;
    margin-bottom: 20px;
`

const Menu = ({ darkMode, setDarkMode }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleLogout = () => {

        Cookies.remove('access_token');

        dispatch(logout());
    };

    const currentUser = useSelector(state => state.user.currentUser);
    return (
        <Container>
            <Wrapper>
                <Link to='/' style={{ textDecoration: "none", color: 'inherit' }}>
                    <Logo>
                        <Img src={logoImg} />
                        VideoTut
                    </Logo>
                </Link>
                <Items>
                    <HomeIcon />
                    Home
                </Items>
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
                    <Items>
                        <ContentPasteSearchIcon />
                        Explore
                    </Items>
                </Link>
                <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
                    <Items>
                        < BookmarkIcon />
                        Subscriptions
                    </Items>
                </Link>
                <Hr />

                <Title>Branches</Title>
                <Link to="ce" style={{ textDecoration: "none", color: "inherit" }}>
                    <Items>
                        <ComputerIcon />
                        CE
                    </Items>
                </Link>
                <Link to='it' style={{ textDecoration: "none", color: "inherit" }}>
                    <Items>
                        <SyncAltIcon />
                        IT
                    </Items>
                </Link>
                <Link to='electrical' style={{ textDecoration: "none", color: "inherit" }}>
                    <Items>
                        <ElectricalServicesIcon />
                        Electrical
                    </Items>
                </Link>
                <Items>
                    <ElectricScooterIcon />
                    Electronics
                </Items>
                <Items>
                    <EvStationIcon />
                    ENTC
                </Items>
                <Hr />
                <Items>
                    <PrecisionManufacturingIcon />
                    Mechanical
                </Items>
                <Items>
                    <ProductionQuantityLimitsIcon />
                    Civil
                </Items>
                <Items>
                    <EngineeringIcon />
                    Production
                </Items>
                <Items>
                    <CheckroomIcon />
                    Textile
                </Items>
                <Hr />
                {!currentUser ? <>
                    <Login>
                        To go Ads-free:
                        <Button onClick={() => setOpen(true)}><CardMembershipIcon />PREMIUM MEMBER</Button>
                    </Login>
                    <Hr />
                </> :
                    <>
                        <Login>
                            To go Ads-free:
                            <Button onClick={() => setOpen(true)}><CardMembershipIcon />GO PREMIUM</Button>
                        </Login>
                    </>
                }
                <Items onClick={() => setDarkMode(!darkMode)} style={{ border: '1px solid #805936', color: '#805936', padding: '8px', borderRadius: '3px', marginTop: '10px' }}>
                    <SettingsBrightnessIcon />
                    {darkMode ? "Light" : "Dark"} Mode
                </Items>
                {currentUser &&
                    <Link to='/'>
                        <Button onClick={handleLogout}>Log Out</Button>
                    </Link>
                }
                {open && <Premium setOpen={setOpen} />}
            </Wrapper>
        </Container>
    )
}

export default Menu