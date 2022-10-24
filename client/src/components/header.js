import React from 'react';

import {
  Box,
  Heading,
  Text,
} from 'grommet';
import { Money } from 'grommet-icons';

function Header() {
  return (
    <Box
      tag="header"
      align="center"
      pad="large"
      direction="row"
      gap="medium"
      background={'backgroundWhite'}
    >
      <Money size="large" />
      <Box>
        <Heading margin="0px" level="1">Finance</Heading>
        <Text lenel="4">Collection of financial information on listed companies</Text>
      </Box>
    </Box>
  );
}

export default Header;
