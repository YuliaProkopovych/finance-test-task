import React from 'react';
import { Grommet, Box } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import PropTypes from 'prop-types';

const theme = deepMerge(grommet, {
  global: {
    colors: {
      increasingText: '#04400b',
      decreasingText: '#9e0000',
      increasingBackground: '#ccff99',
      decreasingBackground: '#ffa9a9',
      background: '#ccc',
      backgroundWhite: '#f0f0f0',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
  textInput: {
    extend: () => `
    &:focus {
      box-shadow: none;
    }
  `,
  },
  button: {
    default: {
      background: {
        color: '#ccc',
      },
      border: {
        color: '#888',
        radius: '4px',
        width: '2px',
      },
    },
    extend: `
      &:hover {
        box-shadow: none;
        background-color: #eee;
      }
      `,
  },
});

function ThemedContainer({ children }) {
  return (
    <Grommet theme={theme} full>
      <Box background="background" height={{ min: '100%' }} direction="column" align="stretch">
        <Box fill="horizontal" flex={{ grow: 1 }} >
          {children}
        </Box>
      </Box>
    </Grommet>
  );
}

ThemedContainer.propTypes = {
  children: PropTypes.element,
};

ThemedContainer.defaultProps = {
  children: null,
};

export default ThemedContainer;
