import React from 'react';
import { Alert } from 'epm-ui-react';

import 'epm-ui-css';

export default ( props ) => {

  let alerts = (
      <div>
        <Alert message="这是个 Warning Alert" type="warning" />
        <Alert message="这是个 Info Alert" type="info" />
        <Alert message="这是个 Error Alert" type="error" />
      </div>
  );

  if ( props.one ) {
    alerts = (
        <div>
          <Alert message="这是个 Success Alert" type="success" />
        </div>
    );
  }

  return alerts;

};