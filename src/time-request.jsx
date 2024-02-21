
import React from 'react'
import {
  ChakraProvider,
  Grid,
  Text,
  Select,
  Input,
  NumberInput,
  Container,
  Button
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

const App = () => (
  <ChakraProvider resetCSS>
    <Grid templateColumns="repeat(4, 1fr)" gap={6} templateRows="repeat(5, 4)">
      <Text>Start Date</Text>
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" defaultValue="Month">
        <option value="">Month</option>
        <option value="">January</option> 
        <option value="">February</option>   
        <option value="">March</option> 
        <option value="">April</option> 
        <option value="">May</option> 
        <option value="">June</option> 
        <option value="">July</option> 
        <option value="">August</option> 
        <option value="">September</option> 
        <option value="">October</option> 
        <option value="">November</option> 
        <option value="">December</option>
      </Select>
      <Select icon={<ChevronDownIcon />} variant="outline" size="md">
        <option value=""></option>
      </Select>
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
      <Text>Start Time</Text>
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
      <Text>End Date</Text>
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" defaultValue="Month">
        <option value="">Month</option>
        <option value="">January</option> 
        <option value="">February</option>   
        <option value="">March</option> 
        <option value="">April</option> 
        <option value="">May</option> 
        <option value="">June</option> 
        <option value="">July</option> 
        <option value="">August</option> 
        <option value="">September</option> 
        <option value="">October</option> 
        <option value="">November</option> 
        <option value="">December</option>
      </Select>
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
      <Text>End Time</Text>
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
      <Select icon={<ChevronDownIcon />} variant="outline" size="md" />
    </Grid>
    <Grid templateColumns="repeat(2, 3fr)" gap={6}>
      <Text>Hours</Text>
      <Input />
      <Text>Request Code</Text>
      <Input />
      <Text>Pin</Text>
      <Input />
    </Grid>
    <Container
      display="flex"
      flexDirection="row-reverse"
      justifyContent="flex-start"
      alignItems="stretch"
      minWidth="100%"
    >
      <Button variant="solid" size="md" ml={15} mr={15}>
        Submit
      </Button>
      <Button variant="solid" size="md" ml={15} mr={15}>
        Reset
      </Button>
    </Container>
  </ChakraProvider>
)

export default App