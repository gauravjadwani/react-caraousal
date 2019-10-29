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
      </div>
    );
  }
  public componentDidMount(){
    const lazyImages:any=document.querySelectorAll('.lazy-image');
    console.log('lazyImages',lazyImages)
    const options={
      root:document.querySelector('.makeStyles-gridList-2'),
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
}
export default CustomTable;