import React from 'react';
import PropTypes from 'prop-types';
import { Text, Card, Box } from 'grommet';

import { StatusWarning } from 'grommet-icons';

function Error({ type }) {
  return (
    <Box direction="row">
      <Card
        direction="row"
        pad="medium"
        background="backgroundWhite"
        gap="small"
      >
        <StatusWarning color="status-critical" />
        <Text color="status-critical">
          {type === 'connection-lost' ? 'Lost connection. Can\'t update!' : 'Looks like we are having problems, please try again later!'}
        </Text>
      </Card>
    </Box>
  );
}

Error.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Error;
