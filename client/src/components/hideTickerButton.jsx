import React from 'react';
import PropTypes from 'prop-types';

import { Box, Tip } from 'grommet';
import { FormView, Hide } from 'grommet-icons';

function HideTickerButton({ hidden, onTickerSwitch }) {
  return (
    <Tip
      content={hidden ? 'Start following updates' : 'Stop following updates'}
    >
      <Box
        onClick={() => onTickerSwitch()}
        focusIndicator={false}
      >
        { hidden ? <FormView /> : <Hide />}
      </Box>
    </Tip>
  );
}

HideTickerButton.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onTickerSwitch: PropTypes.func.isRequired,
};

export default HideTickerButton;
