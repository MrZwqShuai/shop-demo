import * as React from 'react';

interface Props {}
export default class GuessAreaComponent extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return <div className="guess-area-wrapper">猜你喜欢</div>;
  }
}
