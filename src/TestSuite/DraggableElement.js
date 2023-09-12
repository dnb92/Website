export class DraggableElement{
    static dragElement(dragger,draggee,ancestor) {

        
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, x=0,y=0;
        if (document.getElementById(draggee)) {
          // if present, the header is where you move the DIV from:
          document.getElementById(draggee).onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV:
          dragger.onmousedown = dragMouseDown;
        }
      
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
      
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          x = (dragger.offsetLeft - pos1);
          y = (dragger.offsetTop - pos2);
          var draggeeElementHeightAdjustedY = (y - (window.innerHeight) );
          
            
                dragger.style.top = y + "px";
                draggee.style.top = (y + 40) +"px";
                //draggee.style.bottom = "0px";
                
                
                //draggee.style.height = (window.innerHeight - y) + "px";
                draggee.style.height = "auto";
                //draggee.style.height = (window.innerHeight - y) + "px";
                //draggee.style.height = "content";
                
                
            }
          
         // dragger.style.left = x + "px";
          
        
      
        function closeDragElement() {
          
            
            //draggee.style.top = 380 +"px";
            //draggee.style.height = 50 + "px";
          
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
          var currentPosition = Math.abs(y);
          
          var minHeight = 300;
          var midHeight = Math.round(window.innerHeight / 2);
          var maxHeight = Math.round(window.innerHeight * 0.85);
          console.log(Math.abs(y));
          console.log(minHeight);
         
          if( currentPosition < minHeight){
            dragger.style.top = -40 + "px";
            draggee.style.top = -20 + "px";
          } else if (currentPosition > midHeight && currentPosition < maxHeight){
            dragger.style.top = -midHeight + "px";
            draggee.style.top = -midHeight + 40 + "px";
          } else if (currentPosition > maxHeight || currentPosition < maxHeight && currentPosition > (maxHeight * 0.8)){
            dragger.style.top = -maxHeight + "px";
            draggee.style.top = -maxHeight + 40 + "px";
          } else if (currentPosition > minHeight && currentPosition < midHeight ){
            dragger.style.top = -minHeight + "px";
            draggee.style.top = -minHeight+40 + "px";
          }
          
          
         
          
        }
      }
}

//NOTE: This was copied from https://www.w3schools.com/howto/howto_js_draggable.asp and modified to suit.
