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
export default function EditUserSection() {
  const [userPin, setUserPin] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [totalHours, setTotalHours] = useState();
  const [newPin, setNewPin] = useState();
  const [totalRecordHours, setTotalRecordHours] = useState();
  
  
  return (
        <Container mt={5} mb={5} p={5}>
            <Heading as="h5" size="lg">Edit User</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Text>User Pin:</Text>
              <Input value={userPin} type='password' maxLength={8} onChange={e => (setUserPin(e.target.value))} />
              <Button variant="solid" size="md" colorScheme="green" onClick={ async () => {
                let checkUserPinResult = await checkUserPin(userPin);
                if(checkUserPinResult === 0) {
                  let result = await getUserData(userPin);
                  setFirstName(result.firstName);
                  setLastName(result.lastName);
                  setTotalHours(result.totalHours);
                }
              }}>
                Get User
              </Button>
              <Button variant="solid" size="md" colorScheme="blackAlpha">
                Reset
              </Button>
              <Text>First Name:</Text>
              <Input value={firstName} onChange={e => (setFirstName(e.target.value))}/>
              <Text>Last Name:</Text>
              <Input value={lastName} onChange={e => (setLastName(e.target.value))}/>
              <Text>Total Hours:</Text>
              <Input type='number' value={totalHours} onChange={e => setTotalHours(e.target.value)}/>
              <Text>New Pin:</Text>
              <Input value={newPin} type='password' maxLength={8} onChange={e => (setNewPin(e.target.value))} />
              <Text>Total Record Hours: {totalRecordHours}</Text>
              <Button variant="solid" size="md" onClick={async () => {
                let checkUserPinResult = await checkUserPin(userPin);
                if(checkUserPinResult === 0){
                  let result = await getTotalRecordHours(userPin);
                  setTotalRecordHours(result);
                }
                
              }}>
                Get Record Hours
              </Button>
              <Button variant="solid" size="md" colorScheme="linkedin" onClick={async () => {
                let checkUserPinResult = await checkUserPin(userPin);
                if(checkUserPinResult === 0){
                  if(!(firstName === undefined || firstName === "")) {
                    await updateFirstName(userPin, firstName);
                  }
                  if(!(lastName === undefined || lastName === "")) {
                    await updateLastName(userPin, lastName);
                  }
                  if(!(totalHours === undefined || totalHours === "")) {
                    await updateTotalHours(userPin, totalHours);
                  }
                  if(!(newPin === undefined || newPin === "")) {
                    let checkNewPinResult = await checkNewPin(newPin);
                    if(checkNewPinResult === 0) {
                      await updateUserPin(userPin, newPin);
                    }
                  }
                  
                }
              }}>
                Update User
              </Button>
              <Button variant="solid" size="md" colorScheme="orange">
                Clear Time Records
              </Button>
              <Button variant="solid" size="md" colorScheme="green">
                Create User
              </Button>
              <Button variant="solid" size="md" colorScheme="red">
                Delete User
              </Button>
            </Grid>
          </Container>
    );
}
async function checkUserPin(userPin) {
  if(!(userPin === undefined || userPin === "")) {
    if(userPin.length >= 4 && /^\d+$/.test(userPin)) {
      let query = "SELECT PIN FROM USER WHERE NOT USERTYPENAME = 'SUPER' AND PIN = " + userPin;
      let result = await window.api.selectData(query);
      if(!isEmptyArray(result)) {
        return 0; // Good Pin
      }
      else {
        return 3; // userPin was not a Pin in the Database
      }
    }
    else {
      return 2; // userPin was either too short or wasn't a made of numbers
    }
  }
  else {
    return 1; // Blank userPin
  }
}
async function getUserData(userPin) {
  let query = "SELECT * FROM USER WHERE NOT USERTYPENAME = 'SUPER' AND PIN = " + userPin;
  let result = await window.api.selectData(query);
  return result[0];
}
async function getTotalRecordHours(userPin) {
  var query = "SELECT USERID FROM USER WHERE PIN = " + userPin;
  var resultUserID =  await window.api.selectData(query);
  query = "SELECT SUM(HOURS) FROM TIMERECORDS WHERE USERID = " + resultUserID[0].userId;
  var resultTimeRecords = await window.api.selectData(query);
  return resultTimeRecords[0]["SUM(HOURS)"];
}

async function checkNewPin(newPin) {
  if(!(newPin === undefined || newPin === "")) {
    if(newPin.length >= 4 && /^\d+$/.test(newPin)) {
      let query = "SELECT PIN FROM USER WHERE NOT USERTYPENAME = 'SUPER' AND PIN = " + newPin;
      let result = await window.api.selectData(query);
      if(isEmptyArray(result)) {
        return 0; // Good Pin
      }
      else {
        return 3; // newPin was not a Pin in the Database
      }
    }
    else {
      return 2; // newPin was either too short or wasn't a made of numbers
    }
  }
  else {
    return 1; // Blank newPin
  }
}
async function updateFirstName( userPin, firstName) {
  let query = "UPDATE USER SET FIRSTNAME = '" + firstName + "' WHERE PIN = " + userPin;
  await window.api.updateData(query);
}
async function updateLastName( userPin, lastName) {
  let query = "UPDATE USER SET LASTNAME = '" + lastName + "' WHERE PIN = " + userPin;
  await window.api.updateData(query);
}
async function updateTotalHours(userPin, totalHours) {
  let query = "UPDATE USER SET TOTALHOURS = " + totalHours + " WHERE PIN = " + userPin;
  await window.api.updateData(query);
}
async function updateUserPin( userPin, newPin) {
  let query = "UPDATE USER SET PIN = " + newPin + " WHERE PIN = " + userPin;
  await window.api.updateData(query);
}