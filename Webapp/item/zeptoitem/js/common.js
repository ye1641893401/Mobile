function $(dom){
   if(typeof(dom) !== 'string') return;
   if(dom.charAt(0) === '.'){
       dom = dom.substr(1)
      return document.getElementsByClassName(dom)
   }else if(dom.charAt(0) === '#'){
    dom = dom.substr(1)
    return document.getElementById(dom)
   }else{
    return document.getElementsByTagName(dom)
   }
}





