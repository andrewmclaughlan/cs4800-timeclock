import React, { useState } from 'react'
import {
  Container,
  Input,
  Text,
  Button,
  Grid,
  Heading
} from '@chakra-ui/react'
import { isEmptyArray } from '@chakra-ui/utils';
export default function UpdateSuperPinSection() {
  const [oldPin, setOldPin] = useState();
  const [newPin, setNewPin] = useState();
  const [submitMessage, setSubmitMessage] = useState();
    return (
        <Container backgroundColor="whiteAlpha.50" p={5}>
            <Heading as="h5" size="lg">
              Update Super Pin
            </Heading>
            {submitMessage}
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5} mb={5}>
              <Text>Current Super Pin</Text>
              <Input value={oldPin} type='password' maxLength={8} onChange={e => (setOldPin(e.target.value))}/>
              <Text>New Super Pin</Text>
              <Input value={newPin} type='password' maxLength={8} onChange={e => (setNewPin(e.target.value))}/>
              <Button variant="solid" size="md" colorScheme="linkedin" onClick={async () => {
                if(!(oldPin === undefined || newPin === undefined)) {
                  if(oldPin.length >= 4 && /^\d+$/.test(oldPin) && await checkSuperPin(oldPin)) {
                    if(newPin.length >= 4 && /^\d+$/.test(newPin) && await checkNewPin(newPin)) {
                      changeSuperPin(oldPin, newPin);
                      setSubmitMessage(<Text backgroundColor="whatsapp.100">Super Pin was Successfully Changed!</Text>);
                    }
                    else {
                      setSubmitMessage(<Text backgroundColor="red.200">Invalid New Super Pin!</Text>);
                    }  
                  }
                  else {
                    setSubmitMessage(<Text backgroundColor="red.200">Invalid Old Super Pin!</Text>);
                  }
                }
                else {
                  setSubmitMessage(<Text backgroundColor="red.200">Old Pin or New Pin was Blank!</Text>);
                }
              }}>
                Submit
              </Button>
            </Grid>
          </Container>
    );
}
async function checkSuperPin(pin) {
  let query = "SELECT PIN FROM USER WHERE USERTYPENAME = 'SUPER' AND PIN = " + pin;
  let result = await window.api.selectData(query);
  return !isEmptyArray(result);
}
async function checkNewPin(pin) {
  let query = "SELECT PIN FROM USER WHERE PIN = " + pin;
  let result = await window.api.selectData(query);
  return isEmptyArray(result);
}
async function changeSuperPin(oldPin, newPin) {
  let query = "UPDATE USER SET PIN = " + newPin + " WHERE PIN = " + oldPin;
  await window.api.updateData(query);
}