import {Container, Heading } from '@chakra-ui/react'

import React from 'react'

const Header = () => {
    
    return (
        <>
        <Container maxWidth='100%' bg='teal' textAlign='center' pt="28" pb="10">
            <Heading fontSize='9xl'>Ad vitam æternam</Heading>
        </Container>
        </>
    )
}

export default Header
