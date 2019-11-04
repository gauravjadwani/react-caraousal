
import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import tileData from './../store1.json';
import { render } from 'react-dom';
import { Button } from '@material-ui/core';
import { thisExpression } from '@babel/types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";

export default class SingleLineGridList extends React.Component<
any,
  any
  > {
  cl: React.RefObject<unknown>;
  constructor(props: any) {
    super(props);
    this.cl=React.createRef()
    // console.log('thiss',this.props.data);
    this.state={
      data:[],
      holder:{},
      dataHolder:'',
      loading:true,
      defaultUrl:'https://getuikit.com/v2/docs/images/placeholder_200x100.svg'
    }
  }
  public leftSmoothScroll(target:any){
    target=target.current;
      let scrollContainer:any = target;
      do { //find scroll container
          // scrollContainer = scrollContainer.childNodes[0];
          if (!scrollContainer) return;
          scrollContainer.scrollLeft += 50;
      } while (scrollContainer.scrollLeft == 0);
  
      var targetY = 0;
      do { //find the top of target relatively to the container
          if (target == scrollContainer) break;
          targetY += target.offsetTop;
      } while (target = target.offsetParent);
  
      function scroll(c:any, a:any, b:any, i:any) {
          i++; 
          if (i > 30) 
            return;
          console.log('c.left',c.left)
          c.scrollLeft = a + (b + a) / 30 * i;
          setTimeout(function(){ scroll(c, a, b, i); }, 20);
      }
      // start scrolling
      console.log('scrollinggg',scrollContainer,targetY)
      scroll(scrollContainer, scrollContainer.scrollLeft, targetY, 0);
  }
  public renderElement=(props:any)=>{
    const styleRoot:any={
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#fff',
      },
      gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
      title: {
        color: '#fff',
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
    };
    return(
    <div className={'Owner'} style={styleRoot.root} data-albumid={props.id}>
      <GridList cols={2.5}  ref={this.cl} style={styleRoot.gridList}>
      {['1','2','3','4'].map((tile) => (
    <GridListTile key={tile || 'key'}>
      <img data-src={tile  || 'key'} alt={tile  || 'key'} className="lazy-image" 
      key={tile  || 'key'} data-albumid={props.id} src={this.state.defaultUrl}/>
      <GridListTileBar
        title={ 'key'}
        style={styleRoot.titleBar}
        actionIcon={
          <IconButton aria-label={`star ${'key'}`}>
            <StarBorderIcon style={styleRoot.title}/>
          </IconButton>
        }
      />
    </GridListTile>
  ))}
      </GridList>
      <button onClick={()=>this.leftSmoothScroll(this.cl)} className={'Right-Scroll-Button'}>left</button>
    </div>

    )
      }
  public componentDidMount(){

    let tempThis=this;
    // axios.get('https://jsonplaceholder.typicode.com/albums')
    // .then(async function (response) {
    //   const getArray=[];
    //   console.log('response',response);
    //   // response.data.splice(10,90);
    //   console.log('came',tempThis.state.dataHolder);
    //   tempThis.setState({dataHolder:response.data});
    // })

    // console.log('render',this.cl,document.querySelector('.HomeComponent'));
    // const home=document.querySelector('.HomeComponent');
    const lazyImages:any=document.querySelectorAll('.lazy-image');
    const currentRef:any=this.cl;
    const customNode=currentRef.current;
    // console.log('lazyImages',lazyImages,cl);
    console.log('reee',customNode)
    const options={
      root:document.querySelector('.Owner'),
      rootMargin:'0px 0px 0px 0px'
    }
    function onIntersection(imagesEntities: { forEach: (arg0: (image: any) => void) => void; }){
      // console.log('onIntersectionImage',imagesEntities);
      imagesEntities.forEach(image => {
        if(image.isIntersecting){ 
          observer.unobserve(image.target);
          console.log('isIntersectingImage',image);
          // image.target.src=image.target.dataset.src;
          // let tempThis=this;
          // axios.get('https://jsonplaceholder.typicode.com/photos?albumId=1')
          // .then(async function (response) {
          //   console.log('responseresponseresponse',response.data)
          // })
          // image.target.onload = () => image.target.classList.add('loaded')
        }
      });
    }
    let observer=new IntersectionObserver(onIntersection,options);
    console.log('observer',observer)
    lazyImages.forEach((image: Element) => {
      observer.observe(image);
    });
  //   window.addEventListener("scroll", function (event) {
  //     var scroll = this.scrollY;
  //     console.log('scroll',this)
  // });


  //-------------------



  const lazyComponent:any=[...document.querySelectorAll('.Owner .lazy-image')];
  // console.log('gaurav',document.querySelectorAll('.lazy-image'));
  const optionss={
    rootMargin:"440px 180px"
  }
  //  const holder:any={};
  //  const   =this;
  //  console.log('teee',this);
  //  window.holder=holder;
  function onIntersectionn(componentEntities: { forEach: (arg0: (image: any) => void) => void; }){
    console.log('imagesEntitiesHome',componentEntities);
    // const tempThis:any=this;

    componentEntities.forEach(function(component:any){
      // console.log('owner intersecting',)
      if(component.isIntersecting){ 
        // observer.unobserve(image.target);
        const albumId=component.target.dataset['albumid'];
        console.log('isIntersectingcomponent',component,albumId);
        const holder=tempThis.state.holder;
        // if(!holder[albumId]){
        //   console.log('ajax',albumId,holder[albumId]);
        //   console.log('fef',tempThis.state);
          
        //   holder[albumId]=true;
        //   tempThis.setState({holder:holder});
          axios.get('https://jsonplaceholder.typicode.com/photos?albumId='+albumId)
          .then(async function (response) {
            console.log('responseresponseresponse',albumId,response.data)
            const albumData=tempThis.state.data;
            albumData[albumId]=response.data;
            tempThis.setState({data:albumData});
          })
        // }
        // image.target.src=image.target.dataset.src;
        // image.target.onload = () => image.target.classList.add('loaded')
      }
    });
  }
  let observerr=new IntersectionObserver(onIntersectionn,optionss);
  console.log('observer',observerr)
  lazyComponent.forEach((component: Element) => {
    console.log('IntersectionObserverrrr',component);
    observerr.observe(component);
  });

  }
  render() {
    console.log('thisrender',this.props.data.id);
    return(
      <this.renderElement id={this.props.data.id}/>
    );
    // if(this.state.dataHolder === ''){
    //   return(
    //     <div>loading.....</div>
    //   );
    // }else{
    //   console.log('dataholder',this.state.dataHolder)
    //   return(
    //     <div>
    //   {
    //     this.state.dataHolder.map((data:any) => (
    //       <this.renderElement id={data.id} key={data.id}/>
    //     )
    //     )
    //   }
    //   </div>
      
    //   );
    // }
}
  }

  // {this.props.data.map((tile: { id: string | number | undefined; url: string | number | undefined; title: string; img: string | number | undefined; }) => (
  //   <GridListTile key={tile.url}>
  //     <img data-src={tile.url} alt={tile.title} className="lazy-image" 
  //     key={tile.img} data-id={tile.id }/>
  //     <GridListTileBar
  //       title={tile.title}
  //       style={styleRoot.titleBar}
  //       actionIcon={
  //         <IconButton aria-label={`star ${tile.title}`}>
  //           <StarBorderIcon style={styleRoot.title}/>
  //         </IconButton>
  //       }
  //     />
  //   </GridListTile>
  // ))}