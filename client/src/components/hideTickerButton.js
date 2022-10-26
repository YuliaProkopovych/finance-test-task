import React from 'react';
import PropTypes from 'prop-types';

import { Box } from 'grommet';
import { FormView, Hide } from 'grommet-icons';

function HideTickerButton({ hidden, onTickerSwitch }) {
  return (
    <Box
      onClick={() => onTickerSwitch()}
      focusIndicator={false}
    >
      { hidden ? <FormView /> : <Hide />}
    </Box>
  )
}


HideTickerButton.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onTickerSwitch: PropTypes.func.isRequired,
}

export default HideTickerButton;
