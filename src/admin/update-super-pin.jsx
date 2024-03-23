import React from 'react'
import {
  Container,
  Input,
  Text,
  Button,
  Grid,
  Heading
} from '@chakra-ui/react'

export default function UpdateSuperPinSection() {
    return (
        <Container backgroundColor="whiteAlpha.50" p={5}>
            <Heading as="h5" size="lg">
              Update Super Pin
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5} mb={5}>
              <Text>Current Super Pin</Text>
              <Input />
              <Text>New Super Pin</Text>
              <Input />
              <Button variant="solid" size="md" colorScheme="linkedin">
                Submit
              </Button>
            </Grid>
          </Container>
    );
}