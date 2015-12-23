function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value){
    if (!element.className){
        element.className = value;
    }else{
        var newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}



function moveElement(elementID,final_x,final_y,interval){
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    
    var elem = document.getElementById(elementID);
    if (elem.movement){
        clearTimeout(elem.movement);
    }
    if (!elem.style.left){
        elem.style.left = "0px";
    }
    if (!elem.style.top){
        elem.style.top = "0px";
    }
    
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var distance = 0;
    
    if ((xpos == final_x)&&(ypos == final_y)) return true;
    
    if (xpos < final_x){
        distance= Math.ceil((final_x - xpos)/10);
        xpos = xpos + distance;
        
    }
    if (xpos > final_x){
        distance = Math.ceil((xpos - final_x)/10);
        xpos = xpos - distance;
        
    }
    if (ypos < final_y){
        distance = Math.ceil((final_y - ypos)/10);
        ypos = ypos + distance;
    }
    if (ypos > final_y){
        distance = Math.ceil((ypos - final_y)/10);
        ypos = ypos - distance;
    }
    
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow(){
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("intro")) return false;
    
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("id","preview");
    preview.setAttribute("src","images/pinjie.jpg");
    preview.setAttribute("alt","a glimpse of what awaits you");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    
    var links = document.getElementsByTagName("a");
    var destination;
    for (var i=0; i<links.length; i++){
            destination = links[i].getAttribute("href");
            if (destination.indexOf("index.html") != -1){
                links[i].onmouseover =function(){
                    moveElement("preview",0,0,5);}
            }
            if (destination.indexOf("about.html") != -1){
                links[i].onmouseover = function(){
                    moveElement("preview",-150,0,5);}
            }
            if (destination.indexOf("photos.html") != -1){
                links[i].onmouseover = function(){
                    moveElement("preview",-300,0,5);}
            }
            if (destination.indexOf("game.html") != -1){
                links[i].onmouseover = function(){
                    moveElement("preview",-450,0,5);}
            }
            if (destination.indexOf("contact.html") != -1){
                links[i].onmouseover = function(){
                    moveElement("preview",-600,0,5);}
            }
        
    }
    /*links[0].onmouseover = moveElement("preview",0,0,5);
    links[1].onmouseover = moveElement("preview",-150,0,5);
    links[2].onmouseover = moveElement("preview",-300,0,5);
    links[3].onmouseover = moveElement("preview",-450,0,5);
    links[4].onmouseover = moveElement("preview",-600,0,5);
    */
    
    
}


function showSection(cla){
    var sections = document.getElementsByTagName("section");
    for (var i=0; i<sections.length; i++){
        if (sections[i].getAttribute("class") != cla){
            sections[i].style.display = "none";
        }else{
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav(){
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i<links.length; i++){
        var sectionID = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionID)) continue;
        links[i].destination = sectionID;
        links[i].onclick = function(){
            showSection(this.destination);
            return false;
        }
    }
}

function showPic(whichPic){
    if (!document.getElementById("placeholder")) return true;
    var source = whichPic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if (!document.getElementById("description")) return false;
    
    if (whichPic.getAttribute("title")){
        var text = whichPic.getAttribute("title");
    }else{
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3){
        description.firstChild.nodeValue = text;
    }
    return false;
}

function preparePlaceholder(){
    if (!document.getElementsByName) return false;
    if (!document.getElementById) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById("imagegallery")) return false;
    
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","../images/placeholder.png");
    placeholder.setAttribute("alt","my image gallery");
    
    var description = document.createElement("p");
    description.setAttribute("id","description");
    
    var desc_text = document.createTextNode("Choose an image");
    description.appendChild(desc_text);
    
    var gallery = document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

function prepareGallery(){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i=0; i<links.length; i++){
        links[i].onclick = function(){
            return showPic(this);
        }
    }
}


function stripeTables(){
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i=0; i<tables.length; i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j=0; j<rows.length; j++){
            if (odd == true){
                addClass(rows[j],"odd");
                odd = false;
            }else{
                odd = true;
            }
        }
    }
}//标记偶数行


function highlightRows(){
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i=0; i<rows.length; i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function(){
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function(){
            this.className = this.oldClassName;
        }
    }
}

function focusLabels(){
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByName("label");
    for (var i=0; i<labels.length; i++){
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function(){
            var id = labels[i].getAttribute("for");
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}





window.onload = function(){
    prepareSlideshow();
    prepareInternalnav();
    preparePlaceholder();
    prepareGallery();
    stripeTables();
    highlightRows();
    focusLabels();
}
