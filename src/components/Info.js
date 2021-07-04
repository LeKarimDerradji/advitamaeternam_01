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
  Image,
} from '@chakra-ui/react';

const Info = () => {
  const [web3State] = useContext(Web3Context);
  const aeternam = useContext(AeternamContext);
  const { ipfs, getMetadataFromCid, getURLofImageFromCid} = useContext(IpfsContext);
  const [tokenID, setTokenID] = useState();
  const [uri, setTokenURI] = useState();
  const [cid, setCID] = useState();
  const [metadata, setMetadata] = useState();
  const [file, setFile] = useState()
  const [imageURL, setImageURL] = useState();
  const [metadataObject, setMetadataObject] = useState()

  const handleClickGetURI = async () => {
    const tx = await aeternam.tokenURI(tokenID);
    setTokenURI(tx);
  };

  const handleOnClickResolveCid = async () => {
    let metadataFromCid = await getMetadataFromCid(cid);
    setMetadata(metadataFromCid);
  };

  const handleGetMetadataFromId = async () => {
   const metadataURI = await aeternam.tokenURI(tokenID);
    console.log(metadataURI)
    let metadata = metadataURI.replace(/^ipfs:\/\//, 'https://dweb.link/ipfs/');
    console.log('after replace' + metadata)
    metadata = await fetch(metadata);
    console.log('after fetch' +metadata)
    metadata = await metadata.json();
    console.log('after .json' + metadata.name)
    setMetadataObject(metadata)
    if(metadata.image) {
      const imageURL = await getURLofImageFromCid(metadata.image)
      console.log(imageURL)
      setImageURL(imageURL)
    }
   
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

          <FormControl id="metadataFromTokenID" isRequired>
            <FormLabel>Metadata from Token ID</FormLabel>
            <Input
              type="text"
              size="lg"
              colorScheme="purple"
              placeholder="Token ID"
              onChange={(e) => setTokenID(e.target.value)}
            />
          </FormControl>
          <Button
            mt="5px=
            "
            colorScheme="blue"
            onClick={handleGetMetadataFromId}
          >
            Get Metadata From Token ID
          </Button>
          <Text>Name : {metadataObject ? metadataObject.name : ''}</Text>
          <Text>Last name : {metadataObject ? metadataObject.lastName : ''}</Text>
          <Text>Author's address : {metadataObject ? metadataObject.author : ''}</Text>
          <Text>Content : {metadataObject ? metadataObject.content : ''}</Text>
          <Image src={imageURL}></Image>
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
