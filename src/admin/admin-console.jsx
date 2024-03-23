import React, { useState }  from 'react'
import {
  ChakraProvider,
  Container,
  Input,
  Text,
  Button,
  Grid,
} from '@chakra-ui/react'
import { isEmptyArray } from '@chakra-ui/utils';
import UpdateSuperPinSection from './update-super-pin';
import EditUserSection from './edit-user';
import EditUserTypeSection from './edit-user-type';



export default function AdminConsole() {
    const [pin, setPin] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [adminCommands, setAdminCommands] = useState();
    return (
        <ChakraProvider resetCSS>
        <Container minWidth="100%" display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <Text textAlign="center" ml={5} mr={5} >Admin Pin:</Text>
      <Input value= {pin} type='password' maxLength={8} onChange={e => (setPin(e.target.value))} />
      <Button variant="solid" size="md" colorScheme="gray" p={5} onClick={async () => {
        if(!(pin === undefined)) {
          if(pin.length >= 4 && /^\d+$/.test(pin) && await checkAdminPin(pin)) {
            setErrorMessage("");
            setPin("");
           setAdminCommands(<>
              <UpdateSuperPinSection />
              <EditUserSection />
              <EditUserTypeSection />
              </>);
          }
          else {
            setErrorMessage(<Text backgroundColor="red.200">Pin was invalid!</Text>);
          }
        }
        else {
          setErrorMessage(<Text backgroundColor="red.200">Pin was Blank!</Text>);
        }
      }}>
        Login
      </Button>
      <Button Button variant="solid" size="md" colorScheme="gray" p={5} onClick={async () =>{
      setPin("");
      setAdminCommands(<></>);
    }}>Logout</Button>
    </Grid>
    {errorMessage}
    {adminCommands}
        </Container>
      </ChakraProvider>
    );
}
async function checkAdminPin(pin) {
  let query = "SELECT PIN FROM USER WHERE (USERTYPENAME = 'SUPER' OR 'ADMIN') AND PIN = " + pin;
  let result = await window.api.selectData(query);
  return !isEmptyArray(result);
}