//Keypad comment

import React, { useState } from 'react'
import {
  ChakraProvider,
  Container,
  Grid,
  Button,
  Input,
  InputGroup
} from '@chakra-ui/react'

function Keypad () {
  const [pin, setPin] = useState('');
   return (
    <Container>
    <InputGroup display="inline-block">
      <Input type='password' variant="outline" size="lg"  value={pin} onChange={e => setPin(e.target.value)}/>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} column={3} row={4}>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '1') : setPin(pin)}}>
          1
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '2') : setPin(pin)}}>
          2
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '3') : setPin(pin)}}>
          3
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '4') : setPin(pin)}}>
          4
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '5') : setPin(pin)}}>
          5
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '6') : setPin(pin)}}>
          6
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '7') : setPin(pin)}}>
          7
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '8') : setPin(pin)}}>
          8
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '9') : setPin(pin)}}>
          9
        </Button>
        <Button variant="solid" size="md" colorScheme="red" onClick={() => {setPin('')}}>
          C
        </Button>
        <Button variant="solid" size="md" onClick={() => {(pin.length <= 8) ? setPin(pin + '0') : setPin(pin)}}>
          0
        </Button>
        <Button variant="solid" size="md" colorScheme="whatsapp">
          Enter
        </Button>
      </Grid>
    </InputGroup>
  </Container>
   );
}
/*
const Keypad = () => ( 
  <Container>
    <InputGroup display="inline-block">
      <Input type='password' variant="outline" size="lg"  value={pin} onChange={e => setPin(e.target.value)}/>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} column={3} row={4}>
        <Button variant="solid" size="md" onClick={numberKeyClick('1')}>
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