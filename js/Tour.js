AFRAME.registerComponent("tour", {
  schema:{
    state:{type:'string',default:'places-list'},
    selectedCard: {type:'string',defualt:'#card1'}
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards()
  },
  tick:function(){
    const {state} = this.el.getAttribute('tour')
    if(state==='view'){
      this.hideEl([this.placesContainer])
      this.showView()
    }

  },
  hideEl:function(elList){
    elList.map(el=>{
      el.setAttribute('visible',false)
    })
  },
  showView:function(){
    const{selectedCard} = this.data
    console.log(selectedCard)
    const skyEl = document.querySelector('#main-container')
    skyEl.setAttribute('material',{'src': `./images/${selectedCard}/IMG_5380.jpg`, color: "white"})
  },
  createCards: function () {
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png",
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "./assets/thumbnails/budapest.jpg",
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "./assets/thumbnails/eiffel_tower.jpg",
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "./assets/thumbnails/new_york_city.png",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position,item.id)
      // Thumbnail Element
      const thumbnailEl = this.createThumbnail(item)
      borderEl.appendChild(thumbnailEl)
      // Title Text Element
      const textEl = this.createText(position,item)
      borderEl.appendChild(textEl)
      
      this.placesContainer.appendChild(borderEl);
    }
  },
  
  createBorder: function(position,id){
    const entityEl = document.createElement('a-entity')
    entityEl.setAttribute('id',id)
    entityEl.setAttribute('visible',true)
    entityEl.setAttribute('geometry',{primitive:'ring',radiusInner:9,radiusOuter:10})
    entityEl.setAttribute('position',position)
    entityEl.setAttribute('material',{color:'#0077CC',opacity:1})

    entityEl.setAttribute("cursor-listener",{})

    return entityEl
  },
  
  createThumbnail: function(item){
    const entityEl = document.createElement('a-entity')
    entityEl.setAttribute('visible',true)
    entityEl.setAttribute('geometry',{primitive:'circle',radius:9})
    entityEl.setAttribute('material',{src:item.url})

      return entityEl
  },

  createText: function(position,item){
    const entityEl = document.createElement('a-entity')
    
    entityEl.setAttribute('visible',true)
    const positionEl = position
    positionEl.y = -20
    entityEl.setAttribute('position',positionEl)
    entityEl.setAttribute('text',{font:'exo2bold',align:'center',width:70,color:'#e65100',value:item.title})
    return entityEl
  }
});
