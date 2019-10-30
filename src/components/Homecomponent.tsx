import React from 'react';
import List from './List';
import axios from "axios";

class CustomTable extends React.Component<
  any,
  any
> {
  constructor(props:any){
    super(props);
    this.state={
      dataHolder:[]
    }
  }
   async componentDidMount(){
     let tempThis=this;
    axios.get('https://jsonplaceholder.typicode.com/albums')
    .then(async function (response) {
      const getArray=[];
      for(let i=0;i<response.data.length;i++){
        getArray.push(axios.get('https://jsonplaceholder.typicode.com/photos?albumId='+response.data[i].id))
      }
      const res = await Promise.all(getArray);
      console.log('gaurav',res);
      tempThis.setState({dataHolder:res});
    })
  }
  public render() {
    return (
      <div className="HomeComponent">
        {
          this.state.dataHolder.map(
            (number:any) =>
            <List data={number.data}/>
          )
        }

      </div>
    );
  }

}
export default CustomTable;