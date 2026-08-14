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

  var optsClose=document.getElementById('fchatOptsClose');
  if(optsClose) optsClose.addEventListener('click',function(){
    wrap.classList.remove('open-opts','open-contact');
    btn.setAttribute('aria-expanded','false');
  });

  var optContact=document.getElementById('fchatOptContact');
  if(optContact) optContact.addEventListener('click',function(){
    wrap.classList.remove('open-opts','open-chat');
    wrap.classList.add('open-contact');
  });

  var contactWinClose=document.getElementById('fchatContactWinClose');
  if(contactWinClose) contactWinClose.addEventListener('click',function(){
    wrap.classList.remove('open-opts','open-chat','open-contact');
    btn.setAttribute('aria-expanded','false');
  });

  var radioEmail=document.getElementById('fchatRadioEmail');
  var radioTel=document.getElementById('fchatRadioTel');
  var cwinInp=document.getElementById('fchatCwinInp');
  function updateKanal(){
    var isTel=radioTel&&radioTel.checked;
    if(cwinInp){cwinInp.type=isTel?'tel':'email';cwinInp.placeholder=isTel?'Ihre Telefonnummer':'Ihre E-Mail-Adresse';}
    var lE=document.getElementById('fchatRadioEmailLabel');
    var lT=document.getElementById('fchatRadioTelLabel');
    if(lE) lE.classList.toggle('selected',!isTel);
    if(lT) lT.classList.toggle('selected',isTel);
  }
  if(radioEmail) radioEmail.addEventListener('change',updateKanal);
  if(radioTel) radioTel.addEventListener('change',updateKanal);

  var pageName=(wrap&&wrap.dataset&&wrap.dataset.page)||'Amplifyr Website';
  var cwinSubmit=document.getElementById('fchatCwinSubmit');
  if(cwinSubmit) cwinSubmit.addEventListener('click',function(){
    var kanal=radioTel&&radioTel.checked?'Telefon':'E-Mail';
    var adresse=cwinInp?cwinInp.value.trim():'';
    var kommentar=document.getElementById('fchatCwinTa')?document.getElementById('fchatCwinTa').value.trim():'';
    if(!adresse) return;
    var fd=new FormData();
    fd.append('access_key','b2ceddc6-fafb-4bf4-a388-89d6cdd745cb');
    fd.append('subject','Kontaktanfrage \u2014 Ihr Handwerksbetrieb');
    fd.append('Kanal',kanal);fd.append('Adresse',adresse);fd.append('Kommentar',kommentar);
    fd.append('Unternehmensname',pageName);
    cwinSubmit.disabled=true;cwinSubmit.textContent='Wird gesendet\u2026';
    fetch('https://api.web3forms.com/submit',{method:'POST',body:fd})
      .then(function(r){return r.json();})
      .then(function(d){
        if(d.success){
          var f=document.getElementById('fchatCwinForm');var ok=document.getElementById('fchatCwinOk');
          if(f) f.style.display='none';if(ok) ok.style.display='flex';
        } else {cwinSubmit.disabled=false;cwinSubmit.textContent='Absenden \u2192';}
      }).catch(function(){cwinSubmit.disabled=false;cwinSubmit.textContent='Absenden \u2192';});
  });
})();