
import React, { useState } from 'react'
import {
  ChakraProvider,
  SimpleGrid,
  Text,
  Heading,
  Container,
  Input,
  Button,
} from '@chakra-ui/react'
import { isEmptyArray } from '@chakra-ui/utils';

export default function Hours() {
  const [pin, setPin] = useState();
  const [recordsTable, setRecordsTable] = useState();
  const [hours, setHours] = useState();
  const [errorMessage, setErrorMessage] = useState();
  return (
    <ChakraProvider resetCSS>
      <Container display="flex" minWidth="100%" justifyContent="center" alignItems="center">
      <Text minWidth="10%" maxWidth="50%" textAlign="center" ml={5} mr={5} >Pin:</Text>
      <Input value= {pin} type='password' maxLength={8} maxWidth="35%" p={5} mr={5} ml={5} onChange={e => (setPin(e.target.value))} />
      <Button variant="solid" size="md" colorScheme="gray" ml={5} mr={5} minWidth={"20%"} p={5} onClick={async () => {
        if(!(pin === undefined)) {
          if(pin.length >= 4 && /^\d+$/.test(pin) && await checkPin(pin)) {
            setRecordsTable(await showRecords(pin));
            setHours(await showHours(pin));
            setErrorMessage("");
            setPin("");
          }
          else {
            setErrorMessage(<Text backgroundColor="red.200">Pin was invalid!</Text>);
          }
        }
        else {
          setErrorMessage(<Text backgroundColor="red.200">Pin was Blank!</Text>);
        }
      }}>
        Show Hours
      </Button>
      <Button Button variant="solid" size="md" colorScheme="gray" ml={5} mr={5} p={5} minWidth={"20%"} onClick={async () =>{
      setPin("");
      setRecordsTable(<></>);
      setHours("");
    }}>Logout</Button>
    </Container>
    {errorMessage}
    <Container minWidth="100%" backgroundColor="green.300" pl={15} pt={30} pb={30} pr={15}>
      <Heading as="h6">Time Records</Heading>
      <SimpleGrid columns={4} spacingX={1} spacingY={1} backgroundColor="whiteAlpha.900" p={1}>
        <Text backgroundColor="green.300">Clock In Date/Time</Text>
        <Text backgroundColor="green.300">Clock Out Date/Time</Text>
        <Text backgroundColor="green.300">Hours</Text>
        <Text backgroundColor="green.300">Request Code</Text>
        {recordsTable}
      </SimpleGrid>
    </Container>
    <Container minWidth="100%" backgroundColor="orange.200" pl={15} pt={30} pb={30} pr={15}>
      <Heading as="h6" fontSize="4xl" size="xs">Total Hours</Heading>
      <Text backgroundColor="whiteAlpha.900" fontSize="xl">{hours}</Text>
    </Container>
  </ChakraProvider>
    );
}
async function showRecords(pin) {
  var query = "SELECT USERID FROM USER WHERE PIN = " + pin;
  var resultUserID =  await window.api.selectData(query);
  query = "SELECT * FROM TIMERECORDS WHERE USERID = " + resultUserID[0].userId;
  var resultTimeRecords = await window.api.selectData(query);
  var records = (<></>); 
  resultTimeRecords.map (record => {
    //console.log(record);
    let start = new Date(record.start).toLocaleDateString() + " " + new Date(record.start).toLocaleTimeString();
    var end = "";
    if(!(record.end === null)) {
      end = new Date(record.end).toLocaleDateString() + " " + new Date(record.end).toLocaleTimeString();
    }  
    records = (<>
      {records}
      <Text>{start}</Text>
      <Text>{end}</Text>
      <Text>{record.hours}</Text>
      <Text>{record.timeCode}</Text>
    </>);

  })
  return records;
}
async function showHours(pin) {
  var query = "SELECT TOTALHOURS FROM USER WHERE PIN = " + pin;
  var result =  await window.api.selectData(query);
  return result[0].totalHours;
}
async function checkPin(pin) {
  let query = "SELECT PIN FROM USER WHERE NOT USERTYPENAME = 'SUPER' AND PIN = " + pin;
  let result = await window.api.selectData(query);
  return !isEmptyArray(result);
}