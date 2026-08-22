(function(){
  var btn=document.getElementById('fchatBtn');
  var wrap=document.getElementById('fchat');
  if(!btn)return;

  btn.addEventListener('click',function(){
    if(wrap.classList.contains('open-opts')||wrap.classList.contains('open-contact')){
      wrap.classList.remove('open-opts','open-contact');
      btn.setAttribute('aria-expanded','false');
    } else {
      wrap.classList.add('open-opts');
      btn.setAttribute('aria-expanded','true');
    }
  });

})();