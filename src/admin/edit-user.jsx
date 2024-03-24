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
  var submitCode = 7;
  const[submitMessageText, setSubmitMessageText] = useState();
  
  return (
        <Container mt={5} mb={5} p={5}>
            <Heading as="h5" size="lg">Create/Edit User</Heading>
            {submitMessageText}
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Text>User Pin:</Text>
              <Input value={userPin} type='password' maxLength={8} onChange={e => (setUserPin(e.target.value))} />
              <Button variant="solid" size="md" colorScheme="green" onClick={ async () => {
                let checkUserPinResult = await checkUserPin(userPin);
                submitCode = checkUserPinResult;
                if(checkUserPinResult === 0) {
                  let result = await getUserData(userPin);
                  setFirstName(result.firstName);
                  setLastName(result.lastName);
                  setTotalHours(result.totalHours);
                }
                setSubmitMessageText(setSubmitMessage(submitCode));
              }}>
                Get User
              </Button>
              <Button variant="solid" size="md" colorScheme="blackAlpha" onClick={() => {
                setUserPin("");
                setFirstName("");
                setLastName("");
                setTotalHours("");
                setNewPin("");
                setTotalRecordHours("");
                submitCode = 7;
                setSubmitMessageText(<></>);
              }}>
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
                submitCode = checkUserPinResult;
                if(checkUserPinResult === 0) {
                  let result = await getTotalRecordHours(userPin);
                  setTotalRecordHours(result);
                }
                setSubmitMessageText(setSubmitMessage(submitCode));
              }}>
                Get Record Hours
              </Button>
              <Button variant="solid" size="md" colorScheme="linkedin" onClick={ async () => {
                let checkUserPinResult = await checkUserPin(userPin);
                submitCode = checkUserPinResult;
                if(checkUserPinResult === 0) {
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
                    submitCode = checkNewPinResult;
                    if(checkNewPinResult === 0) {
                      await updateUserPin(userPin, newPin);
                    }
                  }
                  setSubmitMessageText(setSubmitMessage(submitCode));
                }
              }}>
                Update User
              </Button>
              <Button variant="solid" size="md" colorScheme="orange" onClick={ async () => {
                let checkUserPinResult = await checkUserPin(userPin);
                submitCode = checkUserPinResult;
                if(checkUserPinResult === 0) {
                  await clearTimeRecords(userPin);
                }
                setSubmitMessageText(setSubmitMessage(submitCode));
              }}>
                Clear Time Records
              </Button>
              <Button variant="solid" size="md" colorScheme="green" onClick={ async () => {
                if(!((newPin === undefined || newPin === "") 
                  || (firstName === undefined || firstName === "")
                  || (lastName === undefined || lastName === "")
                  || (totalHours === undefined || totalHours === ""))) {
                  let checkNewPinResult = await checkNewPin(newPin);
                  submitCode = checkNewPinResult;
                  if(checkNewPinResult === 0) {
                    await createUser(firstName, lastName, totalHours, newPin);
                  }
                }
                else {
                  submitCode = 7;
                }
                setSubmitMessageText(setSubmitMessage(submitCode));
              }}>
                Create User
              </Button>
              <Button variant="solid" size="md" colorScheme="red" onClick={ async () => {
                let checkUserPinResult = await checkUserPin(userPin);
                submitCode = checkUserPinResult;
                if(checkUserPinResult === 0) {
                  await deleteUser(userPin);
                }
                setSubmitMessageText(setSubmitMessage(submitCode));
              }}>
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
async function checkNewPin(newPin) {
  if(!(newPin === undefined || newPin === "")) {
    if(newPin.length >= 4 && /^\d+$/.test(newPin)) {
      let query = "SELECT PIN FROM USER WHERE NOT USERTYPENAME = 'SUPER' AND PIN = " + newPin;
      let result = await window.api.selectData(query);
      if(isEmptyArray(result)) {
        return 0; // Good Pin
      }
      else {
        return 6; // newPin was not a Pin in the Database
      }
    }
    else {
      return 5; // newPin was either too short or wasn't a made of numbers
    }
  }
  else {
    return 4; // Blank newPin
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
async function clearTimeRecords(userPin) {
  var query = "SELECT USERID FROM USER WHERE PIN = " + userPin;
  let result =  await window.api.selectData(query);
  query = "DELETE FROM TIMERECORDS WHERE USERID = " + result[0].userId;
  await window.api.deleteData(query);
}
async function createUser(firstName, lastName, totalHours, pin) {
  let query = "INSERT INTO USER (FIRSTNAME, LASTNAME, TOTALHOURS, PIN, USERTYPENAME)"
  + " VALUES('" + firstName + "', '"+ lastName + "', " + totalHours + ", " + pin + ", 'USER')";
  await window.api.insertData(query);
}
async function deleteUser(userPin) {
  let query = "DELETE FROM USER WHERE PIN = " + userPin;
  await window.api.deleteData(query);
}
function setSubmitMessage(submitCode) {
  if(submitCode === 0) {
    return (<Text backgroundColor="whatsapp.100">Request was Successfully Processed!</Text>);
  }
  else if(submitCode === 1) {
    return(<Text backgroundColor="red.200">User Pin was Blank!</Text>);
  }
  else if(submitCode === 2) {
    return(<Text backgroundColor="red.200">Invalid User Pin!</Text>);
  }
  else if(submitCode === 3) {
    return(<Text backgroundColor="red.200">Invalid User Pin!</Text>);
  }
  else if(submitCode === 4) {
    return(<Text backgroundColor="red.200">Blank New Pin!</Text>);
  }
  else if(submitCode === 5) {
    return(<Text backgroundColor="red.200">Invalid New Pin!</Text>);
  }
  else if(submitCode === 6) {
    return(<Text backgroundColor="red.200">Invalid New Pin!</Text>);
  }
  else if(submitCode === 7) {
    return(<Text backgroundColor="red.200">1 or More Necessary Fields was Blank!</Text>);
  }
  else {
    return;
  }
}
//setSubmitMessage(<Text backgroundColor="red.200">Invalid User Pin!</Text>);
//setSubmitMessage()