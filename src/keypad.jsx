//Keypad comment

import React, { useState } from 'react'
import {
  ChakraProvider,
  Container,
  Grid,
  Button,
  Input,
  InputGroup,
  Text
} from '@chakra-ui/react'
//This is a functional keypad with test data
function Keypad () {
  const pins = ['111111', '12211', '88888888', '1111', '111', '1234567890'];
  const [pin, setPin] = useState('');
  const[punchMessage, setPunchMessage] = useState();
   return (
    <Container>
    <InputGroup display="inline-block">
      {punchMessage}
      <Input type='text' readOnly variant="outline" size="lg"  value={pin} onChange={e => setPin(e.target.value)}/>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} column={3} row={4}>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '1') : setPin(pin)}}>
          1
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '2') : setPin(pin)}}>
          2
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '3') : setPin(pin)}}>
          3
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '4') : setPin(pin)}}>
          4
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '5') : setPin(pin)}}>
          5
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '6') : setPin(pin)}}>
          6
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '7') : setPin(pin)}}>
          7
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '8') : setPin(pin)}}>
          8
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '9') : setPin(pin)}}>
          9
        </Button>
        <Button variant="solid" size="md" colorScheme="red" onClick={() => {setPin('')}}>
          C
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '0') : setPin(pin)}}>
          0
        </Button>
        <Button type="submit" variant="solid" size="md" colorScheme="whatsapp" onClick={()=> {
          var punch = false;
          if(pin.length >= 4) {
            for(var i = 0; i < pins.length; i++){
              if(pin === pins[i]) {
                punch = true;
              }
            }
          }
          
          if(punch) setPunchMessage(<Text backgroundColor="whatsapp.100">Authentication Successful!</Text>);
          else setPunchMessage(<Text backgroundColor="red.200">Authentication Failed!</Text>);
        }}>
          Enter
        </Button>
      </Grid>
    </InputGroup>
  </Container>
   );
   
}
//This is what OpenChakra will make for you
/*
const Keypad = () => ( 
  <Container>
    <InputGroup display="inline-block">
      <Input type='password' variant="outline" size="lg" />
      <Grid templateColumns="repeat(3, 1fr)" gap={6} column={3} row={4}>
        <Button variant="solid" size="md">
          1
        </Button>
        <Button variant="solid" size="md">
          2
        </Button>
        <Button variant="solid" size="md">
          3
        </Button>
        <Button variant="solid" size="md">
          4
        </Button>
        <Button variant="solid" size="md">
          5
        </Button>
        <Button variant="solid" size="md">
          6
        </Button>
        <Button variant="solid" size="md">
          7
        </Button>
        <Button variant="solid" size="md">
          8
        </Button>
        <Button variant="solid" size="md">
          9
        </Button>
        <Button variant="solid" size="md" colorScheme="red">
          C
        </Button>
        <Button variant="solid" size="md">
          0
        </Button>
        <Button variant="solid" size="md" colorScheme="whatsapp">
          Enter
        </Button>
      </Grid>
    </InputGroup>
  </Container>
)*/

const App = () => (
  <ChakraProvider resetCSS>
    <Keypad />
  </ChakraProvider>
)

export default App