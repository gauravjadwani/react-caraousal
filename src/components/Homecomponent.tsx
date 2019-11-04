import React from 'react';
import List from './List';
import axios from "axios";
import data from "../store.json";
// var _ = require('lodash');
import _ from "lodash";

class CustomTable extends React.Component<
  any,
  any
> {
  constructor(props:any){
    super(props);
    this.state={
      dataHolder:'',
      loading:true
    }
  }
  //  async componentDidMount(){
  //    let tempThis=this;
  //   axios.get('https://jsonplaceholder.typicode.com/albums')
  //   .then(async function (response) {
  //     const getArray=[];
  //     console.log('response',response);
  //     // for(let i=0;i<response.data.length;i++){
  //     //   getArray.push(axios.get('https://jsonplaceholder.typicode.com/photos?albumId='+response.data[i].id))
  //     // }
  //     // const res = await Promise.all(getArray);
  //     // console.log('gaurav',res);
  //     tempThis.setState({dataHolder:response.data,loading:false});
  //   })
  // }

  public componentDidMount(){
       let tempThis=this;
      axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(async function (response) {
        const getArray=[];
        console.log('response',response);
        // for(let i=0;i<response.data.length;i++){
        //   getArray.push(axios.get('https://jsonplaceholder.typicode.com/photos?albumId='+response.data[i].id))
        // }
        // const res = await Promise.all(getArray);
        // console.log('gaurav',res);
        response.data.splice(10,90);
        tempThis.setState({dataHolder:response.data,loading:false});
      })




  //     let lazyImages:any = [...document.querySelectorAll('.Owner')]
  //     let inAdvance = 300

  // function lazyLoad() {
  //   console.log('lazyImageslazyImages',lazyImages)
  //     lazyImages.forEach(function(image:any){
  //       // let i:any=image
  //       // console.log('image.onload ',i.offsetTop)
  //         if (image.offsetTop < window.innerHeight + window.pageYOffset + inAdvance) {
  //           console.log('progessive window',image);
  //         }
  //     })

  //     // if all loaded removeEventListener
  // }

  // lazyLoad();

  // window.addEventListener('scroll', _.throttle(lazyLoad, 16))
  // window.addEventListener('resize', _.throttle(lazyLoad, 16))




  // let options = {
  //   root: document.querySelector('.HomeComponent'),
  //   rootMargin: '0px',
  //   threshold: 1.0
  // }
  // function foo(ff:any){
  //   console.log('ffffffffff',ff)
  // }
  // let observer = new IntersectionObserver(foo, options);
  }

  public render() {
    // console.log('this.state.dataHolder',this.state.dataHolder);
    return (
      (this.state.loading)?('loading'):(<div className="HomeComponent">
      {this.state.dataHolder.map((item:any)=>
          <List data={item}/>
        )
      }
    </div>)
    );
  }

}
export default CustomTable;