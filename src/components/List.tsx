
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

export default class SingleLineGridList extends React.Component<
  {},
  any
  > {
  cl: React.RefObject<unknown>;
  constructor(props: any) {
    super(props);
    this.cl=React.createRef()

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
  public renderElement=()=>{
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
    console.log('tttthis',this);
    return(
      <div className={'Owner'} style={styleRoot.root}>
      <GridList cols={2.5}  ref={this.cl} style={styleRoot.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img data-src={tile.img} alt={tile.title} className="lazy-image" 
            key={tile.img}/>
            <GridListTileBar
              title={tile.title}
              style={styleRoot.titleBar}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
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
    console.log('render',this.cl,document.querySelector('.Owner'));
    const lazyImages:any=document.querySelectorAll('.lazy-image');
    const currentRef:any=this.cl;
    const customNode=currentRef.current;
    // console.log('lazyImages',lazyImages,cl);
    console.log('reee',customNode)
    const options={
      root:customNode,
      rootMargin:'0px 0px 200px 0px'
    }
    function onIntersection(imagesEntities: { forEach: (arg0: (image: any) => void) => void; }){
      console.log('onIntersection',imagesEntities);
      imagesEntities.forEach(image => {
        if(image.isIntersecting){ 
          observer.unobserve(image.target);
          console.log('isIntersecting',image);
          image.target.src=image.target.dataset.src;
          image.target.onload = () => image.target.classList.add('loaded')
        }
      });
    }
    let observer=new IntersectionObserver(onIntersection,options);
    console.log('observer',observer)
    lazyImages.forEach((image: Element) => {
      observer.observe(image);
    });
  }
  render() {
  
    return(
      <this.renderElement/>
    );
}
  }