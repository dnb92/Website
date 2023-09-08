export class DraggableElement{
    static dragElement(dragger,draggee) {

        
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
                draggee.style.height = (window.innerHeight - y) + "px";
                
            }
          
         // dragger.style.left = x + "px";
          
        
      
        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
          if (y < (window.innerHeight / 2)){
            dragger.style.top = 360 + "px";
            draggee.style.top = 400 +"px";
            draggee.style.height = 640 + "px";
          }else if (y < window.innerHeight){
            dragger.style.top = window.innerHeight - 40 + "px";
            draggee.style.top = window.innerHeight - 20 +"px";
            draggee.style.height = 10 + "px";
          }
          
        }
      }
}

//NOTE: This was copied from https://www.w3schools.com/howto/howto_js_draggable.asp and modified to suit.
