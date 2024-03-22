
import React, { useState }  from 'react'
import {
  ChakraProvider,
  Grid,
  Text,
  Input,
  Container,
  Button
} from '@chakra-ui/react'

import { isEmptyArray } from '@chakra-ui/utils';
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
      <Input type='password' minLength={4} maxLength={8} onChange={e => (pin = e.target.value)}/>
    </Grid>
    <Container display="flex" flexDirection="row-reverse" justifyContent="flex-start" alignItems="stretch" minWidth="100%" margin={15}>
      <Button variant="solid" size="md" ml={15} mr={15} onClick={async () => {
        let result = await submitButtonHandler(start, end, hours, requestCode, pin);
        if(result === 0) { 
          setSubmitMessage(<Text backgroundColor="whatsapp.100">Time Request was Successfully Submitted!</Text>); 
        }
        if(result === 1) setSubmitMessage(<Text backgroundColor="red.200">Pin was invalid!</Text>);
        if(result === 2) setSubmitMessage(<Text backgroundColor="red.200">1 or more fields were not filled in!</Text>);
      }}>Submit</Button>
    </Container>
    <Container display="flex" flexDirection="row-reverse" justifyContent="flex-start" alignItems="stretch" minWidth="100%" margin={15}>
      {submitMessage}
    </Container>
  </ChakraProvider>
  ); 
}
async function submitButtonHandler(start, end, hours, timeCode, pin) {
  console.log("Request: \n" + start + "\n" + end + "\n" + hours + "\n" + timeCode + "\n" + pin);
  if(!(start === undefined || end === undefined || hours === undefined || timeCode === undefined || pin === undefined)) {
    if(pin.length >= 4 && /^\d+$/.test(pin) && await checkPin(pin)) {
      var query = "SELECT USERID FROM USER WHERE PIN = " + pin;
      var result =  await window.api.selectData(query);
      query = "INSERT INTO TIMERECORDS(START, END, TIMECODE, HOURS, USERID)"
        +" VALUES('"+ start +"', '" + end + "', '" + timeCode + "', " + hours + ", "+ result[0].userId+")";
      await window.api.insertData(query);
       return 0;
    }
    else {
      return 1;
    }
  }
  else {
    return 2;
  }
}
async function checkPin(pin) {
  let query = "SELECT PIN FROM USER WHERE PIN = " + pin;
  let result = await window.api.selectData(query);
  return !isEmptyArray(result);
}
//if(punch)  setSubmitMessage(<Text backgroundColor="whatsapp.100">Time Request was Successfully Submitted!</Text>);
//else setSubmitMessage(<Text backgroundColor="red.200">Pin was invalid!</Text>);