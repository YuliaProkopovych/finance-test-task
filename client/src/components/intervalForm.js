import React, { useState } from 'react';

import { Box, TextInput, Button, Card, FormField, Form } from 'grommet';
import setNewInterval from '../utils/setSocketInterval';

function IntervalForm() {
  const [interval, setInterval] = useState(5000);

  return (
    <Box direction="row">
      <Card
        align="center"
        gap="medium"
        justify="start"
        background="backgroundWhite"
        pad="medium"
      >
        <Form validate="blur" onSubmit={() => (setNewInterval(interval))}>
        <FormField
          label="Set custom update interval (ms)"
          name="interval"
          validate={{
            regexp: new RegExp('^[0-9]+$'),
            message: 'numbers only',
            status: 'error'
          }}
        >
        <Box direction="row" gap="medium">
          <Box width={{ max: '120px' }}>
            <TextInput
              name="interval"
              placeholder="Set interval"
              value={interval}
              onChange={(event) => setInterval(event.target.value)}
            />
          </Box>
          <Button type="submit" label="Set interval" />
        </Box>
        </FormField>
        </Form>
      </Card>
    </Box>
  );
}

export default IntervalForm;
