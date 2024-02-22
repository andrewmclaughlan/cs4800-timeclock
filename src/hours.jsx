
import React from 'react'
import {
  ChakraProvider,
  SimpleGrid,
  Text,
  Heading,
  Container
} from '@chakra-ui/react'

export default function Hours() {
    return (
        <ChakraProvider resetCSS>
    <Container minWidth="100%" backgroundColor="messenger.300" pl={15} pt={30} pb={30} pr={15}>
      <Heading as="h6">Punch Periods</Heading>
      <SimpleGrid
        columns={3}
        spacingX={1}
        spacingY={1}
        backgroundColor="whiteAlpha.900"
        p={1}
      >
        <Text backgroundColor="messenger.300">Clock In Date/Time</Text>
        <Text backgroundColor="messenger.300">Clock Out Date/Time</Text>
        <Text backgroundColor="messenger.300">Hours</Text>
        <Text>Text value</Text>
        <Text>Text value</Text>
        <Text>Text value</Text>
      </SimpleGrid>
    </Container>
    <Container minWidth="100%" backgroundColor="whatsapp.200" pl={15} pt={30} pb={30} pr={15}>
      <Heading as="h6">Time Requests</Heading>
      <SimpleGrid
        columns={4}
        spacingX={1}
        spacingY={1}
        backgroundColor="whiteAlpha.900"
        p={1}
      >
        <Text backgroundColor="whatsapp.200">
          Clock In Date/Time
        </Text>
        <Text backgroundColor="whatsapp.200">Clock Out Date/Time</Text>
        <Text backgroundColor="whatsapp.200">Hours</Text>
        <Text backgroundColor="whatsapp.200">Request Code</Text>
        <Text>Text value</Text>
        <Text>Text value</Text>
        <Text>Text value</Text>
        <Text>Text value</Text>
      </SimpleGrid>
    </Container>
    <Container minWidth="100%" backgroundColor="orange.200" pl={15} pt={30} pb={30} pr={15}>
      <Heading as="h6" fontSize="4xl" size="xs">
        Total Hours
      </Heading>
      <Text backgroundColor="whiteAlpha.900" fontSize="xl">
        Text value
      </Text>
    </Container>
  </ChakraProvider>
    );
  
}

