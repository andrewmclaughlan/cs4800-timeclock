//Keypad comment

import React from 'react'
import {
  ChakraProvider,
  Container,
  Grid,
  Button,
  Input,
  InputGroup
} from '@chakra-ui/react'
var pin = 0;
const Keypad = () => ( 
  <Container>
    <InputGroup display="inline-block">
      <Input type='password' variant="outline" size="lg"  />
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
)
function numberKeyClick(num) {
    pin += num;
}
const App = () => (
  <ChakraProvider resetCSS>
    <Keypad />
  </ChakraProvider>
)

export default App