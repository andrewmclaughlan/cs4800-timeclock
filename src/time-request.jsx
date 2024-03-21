
import React, { useState }  from 'react'
import {
  ChakraProvider,
  Grid,
  Text,
  Input,
  Container,
  Button
} from '@chakra-ui/react'

export default function TimeRequest() {
  const[submitMessage, setSubmitMessage] = useState();
  var start;
  var end;
  var hours;
  var requestCode;
  var pin;
  return (
<ChakraProvider resetCSS>
    <Grid templateColumns="repeat(2, 1fr)" gap={6} templateRows="repeat(5, 4)" margin={15}>
      <Text>Start Date and Time:</Text>
      <Input type='datetime-local' onChange={e => (start = e.target.value)}/>
      <Text>End Date and Time</Text>
      <Input type='datetime-local' onChange={e => (end = e.target.value)}/>
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
      <Button variant="solid" size="md" ml={15} mr={15} onClick={e => (submitButtonHandler(start, end, hours, requestCode, pin))}>Submit</Button>
    </Container>
  </ChakraProvider>
  ); 
}
function submitButtonHandler(start, end, hours, requestCode, pin) {
  console.log("Request: \n" + start + "\n" + end + "\n" + hours + "\n" + requestCode + "\n" + pin);
  if(!(start === undefined & end === undefined && hours === undefined && requestCode === undefined && pin === undefined)) {
    if(/^\d+$/.test(pin) && pin.length > 4) {
      if(checkPin()) {
        console.log('Pin is a number');
      }
      
    }
    else {
      console.log(typeof pin);
    }
  }
  
}
async function checkPin(pin) {
  let query = "SELECT PIN FROM USER WHERE PIN = " + pin;
  let result = await window.api.selectData(query);
  return !isEmptyArray(result);
}
//if(punch) setPunchMessage(<Text backgroundColor="whatsapp.100">Clock Out Successful!</Text>);
//else setPunchMessage(<Text backgroundColor="red.200">Clock Out Failed!</Text>);