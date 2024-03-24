
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
  const[start, setStart] = useState();
  const [end, setEnd] = useState();
  const [hours, setHours] = useState();
  const [requestCode, setRequestCode] = useState();
  const [pin, setPin] = useState();
  return (
<ChakraProvider resetCSS>
    <Grid templateColumns="repeat(2, 1fr)" gap={6} templateRows="repeat(5, 4)" margin={15}>
      <Text>Start Date and Time:</Text>
      <Input value={start} type='datetime-local' onChange={e => ( setStart(e.target.value))}/>
      <Text>End Date and Time</Text>
      <Input value={end} type='datetime-local' onChange={e => (setEnd(e.target.value))}/>
    </Grid>

    <Grid templateColumns="repeat(2, 3fr)" gap={6} margin={15}>
      <Text>Hours</Text>
      <Input value={hours} type='number' min={0} max={1000} step={1} onChange={e => (setHours(e.target.value))}/>
      <Text>Request Code</Text>
      <Input value={requestCode} type='text' onChange={e => (setRequestCode(e.target.value))}/>
      <Text>Pin</Text>
      <Input value={pin} type='password' minLength={4} maxLength={8} onChange={e => (setPin(e.target.value))}/>
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
  let query = "SELECT PIN FROM USER WHERE NOT USERTYPENAME = 'SUPER' AND PIN = " + pin;
  let result = await window.api.selectData(query);
  return !isEmptyArray(result);
}