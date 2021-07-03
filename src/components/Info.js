import { useState, useContext } from 'react';
import { Web3Context } from 'web3-hooks';
import { IpfsContext } from '../contexts/ipfsContext';
import { AeternamContext } from '../App';
import {
  Container,
  Box,
  Heading,
  Input,
  Button,
  Text,
  Spinner,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

const Info = () => {
  const [web3State] = useContext(Web3Context);
  const aeternam = useContext(AeternamContext);
  const { ipfs, getMetadataFromCid } = useContext(IpfsContext);
  const [tokenID, setTokenID] = useState();
  const [uri, setTokenURI] = useState();
  const [cid, setCID] = useState();
  const [metadata, setMetadata] = useState();

  const handleClickGetURI = async () => {
    const tx = await aeternam.tokenURI(tokenID);
    setTokenURI(tx);
    console.log(uri);
  };

  const handleOnClickResolveCid = async () => {
    let metadataFromCid = await getMetadataFromCid(cid);
    setMetadata(metadataFromCid);
  };

  return (
    <>
      {ipfs && web3State.chainId === 4 ? (
        <Container mt="30" mb="30">
          <Box mb="10" textAlign="center">
            <Text fontSize="30px">
              Here you can retrive the data that you immortalized, in the form
              of a cid, uri or the address of your nft. To find your token ID,
              you can go on etherscan.
            </Text>
          </Box>

          <FormControl id="uriFromTokenID" isRequired>
            <FormLabel>URI from TokenID</FormLabel>
            <Input
              type="text"
              size="lg"
              colorScheme="purple"
              placeholder="TokenID"
              onChange={(e) => setTokenID(Number(e.target.value))}
            />
          </FormControl>
          <Button
            mt="5px=
            "
            colorScheme="blue"
            onClick={handleClickGetURI}
          >
            Get URI
          </Button>
          <Text>{uri}</Text>

          <FormControl id="metadataFromCID" isRequired>
            <FormLabel>Metadata from Cid</FormLabel>
            <Input
              type="text"
              size="lg"
              colorScheme="purple"
              placeholder="IPFS CID"
              onChange={(e) => setCID(e.target.value)}
            />
          </FormControl>
          <Button
            mt="5px=
            "
            colorScheme="blue"
            onClick={handleOnClickResolveCid}
          >
            Get Metadata From IPFS CID
          </Button>

          <Text>Metadata : {metadata}</Text>
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

export default Info;
