import React from 'react'
import {
  Container,
  Input,
  Text,
  Button,
  Grid,
  Heading
} from '@chakra-ui/react'

export default function EditUserSection() {
    return (
        <Container mt={5} mb={5} p={5}>
            <Heading as="h5" size="lg">Edit User</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Text>User Pin:</Text>
              <Input />
              <Button variant="solid" size="md" colorScheme="green">
                Get User
              </Button>
              <Button variant="solid" size="md" colorScheme="blackAlpha">
                Reset
              </Button>
              <Text>First Name:</Text>
              <Input />
              <Text>Last Name:</Text>
              <Input />
              <Text>Total Hours:</Text>
              <Input />
              <Text>New Pin:</Text>
              <Input />
              <Text>Total Record Hours: </Text>
              <Button variant="solid" size="md">
                Get Record Hours
              </Button>
              <Button variant="solid" size="md" colorScheme="linkedin">
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