import React from 'react';
import { Text, Card, Spinner, Box } from 'grommet';

function Loading() {
  return (
    <Box direction="row">
      <Card
        direction="row"
        pad="medium"
        background="backgroundWhite"
        gap="small"
      >
        <Spinner />
        <Text>
          Loading, please wait...
        </Text>
      </Card>
    </Box>
  );
}

export default Loading;
