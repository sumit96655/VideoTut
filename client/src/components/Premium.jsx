import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser'; // Import EmailJS



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
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

const Select = styled.select`
  padding: 6px;
  font-size: 14px;
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`;

const ToggleButton = styled.div`
  width: 50px;
  height: 25px;
  border-radius: 25px;
  background-color: ${({ active, theme }) =>
        active ? theme.soft : theme.bgLighter};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ active }) => (active ? 'flex-end' : 'flex-start')};
  padding: 3px;
`;

const ToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.text};
`;

const AmountDisplay = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

const Premium = ({ setOpen }) => {
    const [paymentMethod, setPaymentMethod] = useState('UPI');
    const [selectedDuration, setSelectedDuration] = useState('3 months');
    const [amount, setAmount] = useState(400);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [paymentDetails, setPaymentDetails] = useState('');

    const handleToggle = () => {
        setPaymentMethod((prev) => (prev === 'UPI' ? 'Card' : 'UPI'));
    };

    const handleDurationChange = (e) => {
        const duration = e.target.value;
        setSelectedDuration(duration);

        // Update amount based on duration
        const pricing = {
            '3 months': 400,
            '1 year': 1000,
            '2 years': 1500,
            '5 years': 3500,
        };

        setAmount(pricing[duration]);
    };
    const handlePay = () => {
        if (!name || !email || !paymentDetails) {
            alert('Please fill in all the fields before proceeding.');
            return;
        }
        const templateParams = {
            user_name: name,
            user_email: email,
            duration: selectedDuration,
            amount: amount,
        };
        emailjs.init({
            publicKey: 'Bg5XXEXTjc6gM-n4C',
          });
        emailjs
            .send(
                'service_2dnb5zi', 
                'template_ckxmsyk',
                templateParams
            )
            .then(
                (result) => {
                    console.log('Email sent:', result.text);
                    alert(`Payment successful. Confirmation sent to email: ${email}`);
                },
                (error) => {
                    console.error('Email sending failed:', error.text);
                    alert('Payment successful, but confirmation email could not be sent.');
                }
            );
    };


    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>PAYMENT</Title>
                <Label>Name</Label>
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Input>
                <Label>Email</Label>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Input>
                <Label>Select Number of Months</Label>
                <Select name="months" id="months" onChange={handleDurationChange}>
                    <option value="3 months">3 months</option>
                    <option value="1 year">1 year</option>
                    <option value="2 years">2 years</option>
                    <option value="5 years">5 years</option>
                </Select>
                <Label>Payment Method</Label>
                <PaymentMethod>
                    <span>UPI</span>
                    <ToggleButton active={paymentMethod === 'Card'} onClick={handleToggle}>
                        <ToggleCircle />
                    </ToggleButton>
                    <span>Card</span>
                </PaymentMethod>
                <Input
                    type={paymentMethod === 'UPI' ? 'text' : 'number'}
                    placeholder={
                        paymentMethod === 'UPI'
                            ? 'Enter UPI ID (e.g., yourname@bank)'
                            : 'Enter Card Number'
                    }
                    value={paymentDetails}
                    onChange={(e) => setPaymentDetails(e.target.value)}
                ></Input>
                <AmountDisplay>Amount: Rs {amount}</AmountDisplay>
                <Button onClick={handlePay}>PAY</Button>
            </Wrapper>
        </Container>
    );
};

export default Premium;