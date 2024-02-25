
import React from 'react'
import {
  ChakraProvider,
  Grid,
  Text,
  Input,
  Container,
  Button
} from '@chakra-ui/react'

export default function TimeRequest() {
  var startDateTime;
  var endDateTime;
  var hours;
  var requestCode;
  var pin;

  return (
<ChakraProvider resetCSS>
    <Grid templateColumns="repeat(2, 1fr)" gap={6} templateRows="repeat(5, 4)" margin={15}>
      <Text>Start Date and Time:</Text>
      <Input type='datetime-local' onChange={e => (startDateTime = e.target.value)}/>
      <Text>End Date and Time</Text>
      <Input type='datetime-local' onChange={e => (endDateTime = e.target.value)}/>
    </Grid>

    <Grid templateColumns="repeat(2, 3fr)" gap={6} margin={15}>
      <Text>Hours</Text>
      <Input type='number' min={0} max={1000} step={1} onChange={e => (hours = e.target.value)}/>
      <Text>Request Code</Text>
      <Input type='text' onChange={e => (requestCode = e.target.value)}/>
      <Text>Pin</Text>
      <Input type='password' minLength={4} maxLength={9} onChange={e => (pin = e.target.value)}/>
    </Grid>
    <Container display="flex" flexDirection="row-reverse" justifyContent="flex-start" alignItems="stretch" minWidth="100%" margin={15}>
      <Button variant="solid" size="md" ml={15} mr={15} onClick={e => (
        console.log("Request: \n" + startDateTime + "\n" + endDateTime + "\n" + hours + "\n" + requestCode + "\n" + pin)
        )}>Submit</Button>
    </Container>
  </ChakraProvider>
  ); 
}
