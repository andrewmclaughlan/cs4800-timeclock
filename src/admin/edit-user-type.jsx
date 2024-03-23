import React from 'react'
import {
  Container,
  Input,
  Text,
  Button,
  Grid,
  Heading
} from '@chakra-ui/react'

export default function EditUserTypeSection() {
    return (
        <Container mt={5} mb={5} p={5}>
            <Heading as="h2" size="lg">
              Upgrade or Demote User to Administrator
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Text>Super Pin:</Text>
              <Input />
              <Text>User Pin:</Text>
              <Input />
              <Button variant="solid" size="md" colorScheme="linkedin">
                Submit
              </Button>
            </Grid>
          </Container>
    );
}