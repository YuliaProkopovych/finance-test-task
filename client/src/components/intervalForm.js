import React, { useState } from 'react';

import { Box, TextInput, Button } from 'grommet';
import setNewInterval from '../utils/setSocketInterval';

function IntervalForm() {
  const [interval, setInterval] = useState(5000);
  return (
    <Box direction="row" align="center" gap="medium" justify="start">
      <Box width={{ max: '120px' }}>
        <TextInput
          placeholder="Set interval"
          value={interval}
          onChange={event => setInterval(event.target.value)}
        />
      </Box>
      <Button type="submit" label="Set interval" onClick={() => (setNewInterval(interval))} />
    </Box>
  )
}

export default IntervalForm;
