//Keypad comment

import React, { useEffect, useState } from 'react'
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
export default function Keypad () {
  const pins = ['123', '1234', '88888888', '1111', '1234567890'];
  const [pin, setPin] = useState('');
  const[punchMessage, setPunchMessage] = useState();
  const [date, setDate] = useState(new Date());
  useEffect(() =>  {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000)

    return () => clearInterval(intervalId);
  }, []);
   return (
    <ChakraProvider resetCSS><Container>
    <InputGroup display="inline-block">
      <Text>{date.toLocaleTimeString()}</Text>
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
        <Button variant="solid" size="md" colorScheme="linkedin" backgroundColor="gray.700" onClick={() => {setPin('')}}>
          C
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length < 8) ? setPin(pin + '0') : setPin(pin)}}>
          0
        </Button>
        <Button variant="solid" size="md" colorScheme="red" onClick={()=> {
          if(pin.length > 0) {
            setPin(pin.substring(0, pin.length-1))
          }
         }}>
          {'\u232B'}  
        </Button>
      </Grid>
      <Container display="flex" flexDirection="column">
          <Button variant="solid" size="lg" colorScheme="linkedin" m={2} onClick={()=> {
          var punch = false;
          if(pin.length >= 4) {
            for(var i = 0; i < pins.length; i++){
              if(pin === pins[i]) {
                punch = true;
              }
            }
          }
          
          if(punch) setPunchMessage(<Text backgroundColor="whatsapp.100">Clock In Successful!</Text>);
          else setPunchMessage(<Text backgroundColor="red.200">Clock In Failed!</Text>);
        }}>
            Clock In
          </Button>
          <Button variant="solid" size="lg" colorScheme="linkedin" m={2} onClick={()=> {
          var punch = false;
          if(pin.length >= 4) {
            for(var i = 0; i < pins.length; i++){
              if(pin === pins[i]) {
                punch = true;
              }
            }
          }
          
          if(punch) setPunchMessage(<Text backgroundColor="whatsapp.100">Clock Out Successful!</Text>);
          else setPunchMessage(<Text backgroundColor="red.200">Clock Out Failed!</Text>);
        }}>
            Clock Out
          </Button>
        </Container>
    </InputGroup>
  </Container></ChakraProvider>
   );
   
}

