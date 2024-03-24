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

export default function EditUserTypeSection() {
    const [superPin, setSuperPin] = useState();
    const [userPin, setUserPin] = useState();
    const [submitMessage, setSubmitMessage] = useState();
    return (
        <Container mt={5} mb={5} p={5}>
            <Heading as="h2" size="lg">Promote or Demote User</Heading>
            {submitMessage}
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Text>Super Pin:</Text>
              <Input value={superPin} type='password' maxLength={8} onChange={e => (setSuperPin(e.target.value))}/>
              <Text>User Pin:</Text>
              <Input value={userPin} type='password' maxLength={8} onChange={e => (setUserPin(e.target.value))}/>
              <Button variant="solid" size="md" colorScheme="linkedin" onClick={ async () => {
                if(!(superPin === undefined || userPin === undefined || superPin === "" || userPin === "")) {
                  if(superPin.length >= 4 && /^\d+$/.test(superPin) && await checkSuperPin(superPin)) {
                    if(userPin.length >= 4 && /^\d+$/.test(userPin)) {
                      let result = await checkUserType(userPin);
                      if(!isEmptyArray(result)) {
                        if(result[0].userTypeName === 'USER') {
                          await updateUserTypeName(userPin, 'ADMIN');
                          setSubmitMessage(<Text backgroundColor="whatsapp.100">User Promoted!</Text>);
                        }
                        else if(result[0].userTypeName === 'ADMIN') {
                          await updateUserTypeName(userPin, 'USER');
                          setSubmitMessage(<Text backgroundColor="whatsapp.100">User Demoted!</Text>);
                        }
                        else {
                          setSubmitMessage(<Text backgroundColor="red.200">Invalid User Pin!</Text>);
                        }
                      }
                      else {
                        setSubmitMessage(<Text backgroundColor="red.200">Invalid User Pin!</Text>);
                      }
                    }
                    else {
                      setSubmitMessage(<Text backgroundColor="red.200">Invalid User Pin!</Text>);
                    }
                  }
                  else {
                    setSubmitMessage(<Text backgroundColor="red.200">Invalid Super Pin!</Text>);
                  }
                }
                else {
                  setSubmitMessage(<Text backgroundColor="red.200">Super Pin or User Pin was Blank!</Text>);
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
async function checkUserType(pin) {
  let query = "SELECT USERTYPENAME FROM USER WHERE PIN = " + pin;
  let result = await window.api.selectData(query);
  return result;
}
async function updateUserTypeName(pin, userTypeName) {
  let query = "UPDATE USER SET USERTYPENAME = '" + userTypeName + "' WHERE PIN = " + pin;
  await window.api.updateData(query);
}