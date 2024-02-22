
import React from 'react'
import {
  ChakraProvider,
  Grid,
  Text,
  Select,
  Input,
  Container,
  Button
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function TimeRequest() {
  return (
<ChakraProvider resetCSS>
    <Grid templateColumns="repeat(4, 1fr)" gap={6} templateRows="repeat(5, 4)">
      <Text>Start Date</Text>
      <Month/>
      <Day/>
      <Year/>
      <Text>Start Time</Text>
      <Hour/>
      <Minute/>
      <Select icon={<ChevronDownIcon />} variant="outline" size="md">
        <option value="">AM</option>
        <option value="">PM</option>
      </Select> 
      <Text>End Date</Text>
      <Month/>
      <Day/>
      <Year/>
      <Text>End Time</Text>
      <Hour/>
      <Minute/>
      <Select icon={<ChevronDownIcon />} variant="outline" size="md">
        <option value="">AM</option>
        <option value="">PM</option>
      </Select>
    </Grid>
    <Grid templateColumns="repeat(2, 3fr)" gap={6}>
      <Text>Hours</Text>
      <Input />
      <Text>Request Code</Text>
      <Input />
      <Text>Pin</Text>
      <Input  type='password' minLength={4} maxLength={9}/>
    </Grid>
    <Container
      display="flex"
      flexDirection="row-reverse"
      justifyContent="flex-start"
      alignItems="stretch"
      minWidth="100%"
    >
      <Button variant="solid" size="md" ml={15} mr={15}>
        Submit
      </Button>
      <Button variant="solid" size="md" ml={15} mr={15}>
        Reset
      </Button>
    </Container>
  </ChakraProvider>
  );
  
}
function Month() {
  return (
    <Select>
        <option value="">January</option> 
        <option value="">February</option>   
        <option value="">March</option> 
        <option value="">April</option> 
        <option value="">May</option> 
        <option value="">June</option> 
        <option value="">July</option> 
        <option value="">August</option> 
        <option value="">September</option> 
        <option value="">October</option> 
        <option value="">November</option> 
        <option value="">December</option>
    </Select>
  );
}
function Day() {
  var days;
  for(var i = 1; i <= 31; i++) {
    days = (<>{days}<option value={i}>{i}</option></>);
  }
  return (<Select>{days}</Select>);
}
function Year() {
  var years;
  for(var i = 2024; i <= 2030; i++) {
    years = (<>{years}<option value={i}>{i}</option></>);
  }
  return (<Select>{years}</Select>);
}

function Hour() {
  var hours;
  for(var i = 1; i <= 12; i++) {
    hours = (<>{hours}<option value={i}>{i}</option></>);
  }
  return (<Select>{hours}</Select>);
}

function Minute() {
  var minute;
  for(var i = 0; i <= 45; i += 15) {
    minute = (<>{minute}<option value={i}>{i}</option></>);
  }
  return (<Select>{minute}</Select>);
}
