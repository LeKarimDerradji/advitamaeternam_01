import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import  Mint  from './Mint';
import Info from './Info';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const Dapp = () => {
  return (
    <Tabs isFitted variant="enclosed" colorScheme="teal">
      <TabList mb="1em">
        <Tab>Immortalize</Tab>
        <Tab>Consult Data</Tab>
      </TabList>
      <TabPanels>
          <TabPanel>
            <Header />
            <Mint />
            <Footer />
          </TabPanel>
          <TabPanel>
            <Header />
            <Info /> 
            <Footer />
          </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Dapp;
