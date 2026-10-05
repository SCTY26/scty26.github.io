(function(){
  var svg=document.getElementById('topo');if(!svg)return;
  var NS='http://www.w3.org/2000/svg',g=document.createElementNS(NS,'g');
  g.setAttribute('fill','none');g.setAttribute('stroke','currentColor');g.setAttribute('stroke-width','1');
  for(var i=0;i<22;i++){
    var R=40+i*26,k=i*0.15,ph=0.35+i*0.045,d='';
    for(var j=0;j<120;j++){
      var t=2*Math.PI*j/120;
      var r=R*(1+0.10*Math.sin(3*t+ph)+0.06*Math.sin(5*t+2.1*ph+k)+0.035*Math.sin(8*t+0.7*ph));
      d+=(j?'L':'M')+(500+r*Math.cos(t)*1.15).toFixed(1)+','+(400+r*Math.sin(t)*0.9).toFixed(1);
    }
    var p=document.createElementNS(NS,'path');p.setAttribute('d',d+'Z');g.appendChild(p);
  }
  svg.appendChild(g);
})();
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    els.forEach(function(e){e.classList.add('in')});return;
  }
  document.documentElement.classList.add('js');
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:.12});
  els.forEach(function(e){io.observe(e)});
  var nav=document.getElementById('nav');
  function onS(){nav.classList.toggle('solid',window.scrollY>40)}
  window.addEventListener('scroll',onS,{passive:true});onS();
})();
