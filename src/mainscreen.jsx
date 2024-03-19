import React from "react";
import Keypad from './keypad.jsx';
import TimeRequest from './time-request.jsx';
import Hours from './hours.jsx'
import {
    ChakraProvider,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Heading,
    Button,
    Container
  } from '@chakra-ui/react'
  async function testButtonEvent() {
    //window.api.testDatabase();
    let query = "SELECT * FROM USERTYPE";
    let data = await window.api.testDatabaseReceive(query);
    console.log(data);
    console.log(data[0]);
    console.log(data[0].description);
  }
  export function MainScreen() {
    return(
        <ChakraProvider resetCSS>
          <Heading size="xl" as="h1" textAlign="center">
            Time Clock
          </Heading>
          <Tabs size="md" variant="line" isFitted orientation="horizontal" align="start">
            <TabList>
              <Tab backgroundColor="messenger.300">Punch</Tab>
              <Tab backgroundColor="whatsapp.200" opacity={1}>
                Time Requests
              </Tab>
              <Tab backgroundColor="orange.200">Hours</Tab>
              <Tab backgroundColor="red.300">Administrative</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Keypad />
              </TabPanel>
              <TabPanel>
              <TimeRequest />  
              </TabPanel>
              <TabPanel>
                <Hours />
              </TabPanel>
              <TabPanel>Admin</TabPanel>
            </TabPanels>
          </Tabs>
          <Container>
            <Button onClick={() => {window.api.quitApp()}}>Quit</Button>
            <Button onClick={testButtonEvent}>Test DB</Button>
          </Container>
          
        </ChakraProvider>
      );
  }
