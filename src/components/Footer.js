import {Box, Link} from '@chakra-ui/react'

import React from 'react'

const Footer = () => {
    return (
        <Box mb='0' as='footer' bg='teal' textAlign='center'>
            <Link fontSize='4xl' href='#' isExternal>Contact-Me</Link>
        </Box>
    )
}

export default Footer