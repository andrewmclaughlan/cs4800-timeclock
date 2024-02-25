
import React from 'react'
import {
  ChakraProvider,
  SimpleGrid,
  Text,
  Heading,
  Container
} from '@chakra-ui/react'


export default function Hours() {
  const timeRecords = [
    { id: 0, startDateTime: "DateTime", endDateTime: "DateTime", hours: "Hours", requestCode: "Request Code"},
    { id: 1, startDateTime: "DateTime", endDateTime: "DateTime", hours: "Hours", requestCode: "Request Code"},
    { id: 2, startDateTime: "DateTime", endDateTime: "DateTime", hours: "Hours", requestCode: "Request Code"},
    { id: 3, startDateTime: "DateTime", endDateTime: "DateTime", hours: "Hours", requestCode: "Request Code"},
    { id: 4, startDateTime: "DateTime", endDateTime: "DateTime", hours: "Hours", requestCode: "Request Code"},
    { id: 5, startDateTime: "DateTime", endDateTime: "DateTime", hours: "Hours", requestCode: "Request Code"},
  ];
  const hours = 100;
  return (
    <ChakraProvider resetCSS>
    <Container minWidth="100%" backgroundColor="green.300" pl={15} pt={30} pb={30} pr={15}>
      <Heading as="h6">Time Records</Heading>
      <SimpleGrid columns={4} spacingX={1} spacingY={1} backgroundColor="whiteAlpha.900" p={1}>
        <Text backgroundColor="green.300">Clock In Date/Time</Text>
        <Text backgroundColor="green.300">Clock Out Date/Time</Text>
        <Text backgroundColor="green.300">Hours</Text>
        <Text backgroundColor="green.300">Request Code</Text>
        {
          
          timeRecords.map(record => {
            return (
              <>
                <Text>{record.startDateTime}</Text>
                <Text>{record.endDateTime}</Text>
                <Text>{record.hours}</Text>
                <Text>{record.requestCode}</Text>
              </>
            );
          })
        }
      </SimpleGrid>
    </Container>
    <Container minWidth="100%" backgroundColor="orange.200" pl={15} pt={30} pb={30} pr={15}>
      <Heading as="h6" fontSize="4xl" size="xs">Total Hours</Heading>
      <Text backgroundColor="whiteAlpha.900" fontSize="xl">{hours}</Text>
    </Container>
  </ChakraProvider>
    );
}