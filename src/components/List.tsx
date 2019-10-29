
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


let cl:any = React.createRef();
function SingleGridList() {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  })
);
  const classes = useStyles();

  return (
      <div className={classes.root+' Owner'}>
        <GridList   className={classes.gridList} cols={2.5}  ref={cl}>
          {tileData.map(tile => (
            <GridListTile key={tile.img}>
              <img data-src={tile.img} alt={tile.title} className="lazy-image" key={tile.img}/>
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <button onClick={()=>SmoothScroll(cl)}>clickme</button>
      </div>
    );
}

function SmoothScroll(target:any){
  console.log('clicked',target)
  target=target.current;
  console.log('scrollContainer.childNodes[0]',target.childNodes[0])
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
        console.log(c.left)
        c.scrollLeft = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    // scroll(scrollContainer, scrollContainer.scrollLeft, targetY, 0);
}


export default class SingleLineGridList extends React.Component<
  any,
  {
  }
  > {
  constructor(props: any) {
    super(props);

  }
  public componentDidMount(){
    const lazyImages:any=document.querySelectorAll('.lazy-image');
    console.log('lazyImages',lazyImages,cl);
    console.log('reee',document.querySelector('.Owner'))
    const options={
      root:document.querySelector('.Owner'),
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
  // SmoothScroll(target:any){
  //   console.log('clicked',target)
  // target=target.current;
  // console.log('scrollContainer.childNodes[0]',target.childNodes[0])
  //   let scrollContainer:any = target;
  //   do { //find scroll container
  //       // scrollContainer = scrollContainer.childNodes[0];
  //       if (!scrollContainer) return;
  //       scrollContainer.scrollLeft += 50;
  //   } while (scrollContainer.scrollLeft == 0);

  //   var targetY = 0;
  //   do { //find the top of target relatively to the container
  //       if (target == scrollContainer) break;
  //       targetY += target.offsetTop;
  //   } while (target = target.offsetParent);

  //   function scroll(c:any, a:any, b:any, i:any) {
  //       i++; 
  //       if (i > 30) 
  //         return;
  //       console.log(c.left)
  //       c.scrollLeft = a + (b - a) / 30 * i;
  //       setTimeout(function(){ scroll(c, a, b, i); }, 20);
  //   }
  //   // start scrolling
  //   // scroll(scrollContainer, scrollContainer.scrollLeft, targetY, 0);
  // }
  render() {
    return(
      <SingleGridList/>
    );
}
  }