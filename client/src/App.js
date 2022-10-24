import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import Tickers from './features/tickers'

const theme = deepMerge(grommet, {
  global: {
    colors: {
      increasingText: '#04400b',
      decreasingText: '#9e0000',
      increasingBackground: '#ccff99',
      decreasingBackground: '#ffa9a9',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
});

function App() {
  return (
    <Grommet theme={theme}>
      <Tickers />
    </Grommet>
  );
}

export default App;
