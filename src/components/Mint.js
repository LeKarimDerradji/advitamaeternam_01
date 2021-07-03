import { useContext, useReducer } from "react";
import { Web3Context } from "web3-hooks";
import { AdVitamContext } from "../App";
import { IpfsContext } from "../contexts/ipfsContext";
import { inputReducer, inputInitialState } from "../reducer/inputReducer";
import { ethers } from "ethers";
import { Container, Box, Heading, Input, Button, Text, Spinner, FormControl, FormLabel } from "@chakra-ui/react";


const Mint = () => {
    const [web3State] = useContext(Web3Context);
    const advitam = useContext(AdVitamContext);
    const { ipfs, addMetadata } = useContext(IpfsContext);
    const [state, dispatch] = useReducer(inputReducer, inputInitialState)
    const {userName, userLastName, address, text} = state
  
    const handleOnClickSend = async () => {
      try {
        const textHash = ethers.utils.id(text);
  
        const metadata = {
          textHash: textHash,
          author: address,
          content: text,
          name: userName,
          lastName: userLastName,
        };
  
        const metadataString = JSON.stringify(metadata);
  
        const cid = await addMetadata(metadataString);
  
        let tx = await advitam.immortalize(
          textHash,
          address,
          text,
          userName,
          userLastName,
          `${cid}/metadata.json`,
          { value: ethers.utils.parseEther("1") }
        );
        await tx.wait();
      } catch (e) {
        console.log(e);
      }
    };
  
  
    return (
      <>
        {ipfs && advitam && web3State.chainId === 4 ? (
          <Container mt="30" mb="30">
            <Box mb="10" textAlign="center">
              <Text>Welcome to Ad-Vitam-Aeternam.</Text>
  
              <Text>Aren't you ever dreamed of being eternal ?</Text>
  
              <Text>
                Ad-Vitam-Aeternam allows you to create a persistent digital-twin
                of yourself, powered by the Blockchain and IPFS (The
                Inter-Planetary-File-System), that means this digital
                representation of yourself will forever be stored on-chain.
                Forever.
              </Text>
            </Box>
  
            <FormControl id="first-name" isRequired>
              <FormLabel>First name</FormLabel>
              <Input
                type="text"
                size="lg"
                colorScheme="purple"
                onChange={(e) => dispatch({type: 'SET_NAME', payload: e.target.value})}
                placeholder="First name"
              />
            </FormControl>
  
            <FormControl id="last-name" isRequired>
              <FormLabel>Last name</FormLabel>
              <Input
                type="text"
                size="lg"
                colorScheme="purple"
                onChange={(e) => dispatch({type: 'SET_ADDRESS', payload: e.target.value})}
                placeholder="Last name"
              />
            </FormControl>
  
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                size="lg"
                colorScheme="purple"
                onChange={(e) => dispatch({type: 'SET_ADDRESS', payload: e.target.value})}
                placeholder="Eth Address"
              />
            </FormControl>
  
            <FormControl id="content" isRequired>
              <FormLabel>Content</FormLabel>
              <Input
                type="text"
                size="lg"
                colorScheme="teal"
                onChange={(e) => dispatch({type: 'SET_TEXT', payload: e.target.value})}
                placeholder="Words"
              />
            </FormControl>
            <Box d="flex" justifyContent="center" mt="10" mb="10">
              <Button colorScheme="purple" onClick={handleOnClickSend}>
                Immortalize
              </Button>
            </Box>
          </Container>
        ) : (
          <Box
            d="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            p="5"
          >
            <Heading>
              Web3 is Loading... Make sure to be connected the Rinkeby Network...
            </Heading>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        )}
      </>
    );
  };

export default Mint
