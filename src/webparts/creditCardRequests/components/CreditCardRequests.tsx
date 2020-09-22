import * as React from 'react';
import { ICreditCardRequestsProps } from './ICreditCardRequestsProps';
import { Routes } from './Routes';

import "./globalStyles.module.scss";
import { Provider } from '../Utils/Context';

export default class CreditCardRequests extends React.Component<ICreditCardRequestsProps, {}> {
  public constructor(context: ICreditCardRequestsProps){
    super(context);
  }

  public render(): React.ReactElement<ICreditCardRequestsProps> {
    return (<Provider><Routes /></Provider>);
  }
}
