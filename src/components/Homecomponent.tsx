import React from 'react';
import List from './List';

class CustomTable extends React.Component<
  any,
  {
  }
> {
  constructor(props:any){
    super(props);

  }
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       chancesRemaining: CHANCES,
//       error: '',
//       message: 'playing',
//       tInterval: 0,
//       time: '00:00:00',
//       value: randomise(40),
//     };
//   }
  public render() {
    return (
      <div className="HomeComponent">
          <List/>
          <List/>
      </div>
    );
  }

}
export default CustomTable;