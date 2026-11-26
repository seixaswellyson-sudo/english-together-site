(function(){
var CK="https://pay.kiwify.com.br/zzFq5RR?afid=7FrI0A9X";
var QA=[
{k:"iniciante",q:"É para iniciantes?",w:["iniciante","basico","básico","zero","comecar","começar"],a:"Sim. O conteúdo é pensado para brasileiros que querem desenvolver o inglês desde as bases."},
{k:"saber",q:"Preciso saber inglês?",w:["precisa saber","preciso saber","pre-requisito","nivel","nível","conhecimento"],a:"Não. Você pode começar estudando vocabulário, frases e estruturas básicas."},
{k:"conteudo",q:"O que vou aprender?",w:["aprender","conteudo","conteúdo","modulo","módulo","metodo","método","aula","viagem","trabalho","pronuncia","pronúncia"],a:"São seis frentes: conversação, pronúncia, viagens, trabalho, vocabulário e situações reais. O foco é falar inglês no dia a dia, com explicações simples e exercícios para praticar."},
{k:"preco",q:"Quanto custa?",w:["preco","preço","valor","custa","quanto","pagar","parcel","pix","cartao","cartão","boleto","vezes","duas"],a:"O valor atual e as formas de pagamento (incluindo se há parcelamento) aparecem no checkout da Kiwify, antes de você pagar. Não consigo confirmar valor nem parcelas por aqui."},
{k:"confia",q:"É confiável?",w:["confia","golpe","seguro","verdade","real","fake","funciona"],a:"Não posso garantir resultados nem avaliar o curso por você. Posso só repetir o que a página informa: o curso é do professor Ezequiel Barcelos, formado em Letras (Português e Inglês), com mais de 20 anos de ensino e mais de 9 mil alunos, segundo a página original do curso. O pagamento é feito no checkout da Kiwify, onde você vê os termos de compra antes de pagar."},
{k:"inscricao",q:"Como me inscrevo?",w:["inscri","comprar","compra","matricul","checkout","kiwify","entrar"],a:"Clique em um dos botões de compra desta página para abrir o checkout da Kiwify.",cta:1},
{k:"reembolso",q:"Reembolso?",w:["reembolso","cancel","devol","arrepend","garantia","estorno"],a:"As regras de reembolso e cancelamento estão nos termos de compra da Kiwify, que aparecem no checkout. Não consigo afirmar prazo ou direito por aqui; confira lá antes de pagar."}
];
var FALL="Não tenho essa resposta confirmada. Veja as Perguntas frequentes e os Termos nesta página, ou escolha um dos assuntos abaixo.";
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function norm(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
var fab=el("button","etc-fab");fab.type="button";fab.setAttribute("aria-label","Abrir chat de dúvidas sobre o curso");fab.setAttribute("aria-expanded","false");
fab.innerHTML='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 11h7M8.5 14h4"/></svg>';
var p=el("section","etc-panel");p.setAttribute("role","dialog");p.setAttribute("aria-label","Dúvidas sobre o curso");
var h=el("div","etc-head");h.appendChild(el("div","etc-av","ET"));
var t=el("div","etc-t");t.appendChild(el("b",0,"Dúvidas sobre o curso"));t.appendChild(el("span",0,"Respostas automáticas"));h.appendChild(t);
var x=el("button","etc-x","×");x.type="button";x.setAttribute("aria-label","Fechar chat");h.appendChild(x);
var m=el("div","etc-msgs");m.setAttribute("aria-live","polite");
var chips=el("div","etc-chips");
var f=el("form","etc-form");var inp=el("input");inp.type="text";inp.placeholder="Digite sua dúvida";inp.setAttribute("aria-label","Digite sua dúvida");inp.maxLength=200;var go=el("button",0,"Enviar");go.type="submit";f.appendChild(inp);f.appendChild(go);
var note=el("div","etc-note","Chat automático: respostas prontas, baseadas nesta página. Sua mensagem não é enviada nem guardada.");
[h,m,chips,f,note].forEach(function(n){p.appendChild(n)});
function say(txt,who,cta){var d=el("div","etc-m "+who,txt);if(cta){d.appendChild(document.createTextNode("\n"));var a=el("a",0,"Ir para o checkout");a.href=CK;a.target="_blank";a.rel="noopener";d.appendChild(a)}m.appendChild(d);m.scrollTop=m.scrollHeight}
function answer(e,fromChip){say(e.q,"me");setTimeout(function(){say(e.a,"bot",e.cta)},250)}
QA.forEach(function(e){var b=el("button",0,e.q);b.type="button";b.onclick=function(){answer(e)};chips.appendChild(b)});
f.onsubmit=function(ev){ev.preventDefault();var v=inp.value.trim();if(!v)return;inp.value="";var n=norm(v),best=null,sc=0;QA.forEach(function(e){var s=0;e.w.forEach(function(w){if(n.indexOf(norm(w))>-1)s++});if(s>sc){sc=s;best=e}});say(v,"me");setTimeout(function(){best?say(best.a,"bot",best.cta):say(FALL,"bot")},250)};
function banner(){var all=document.querySelectorAll("body *");for(var i=0;i<all.length;i++){var e=all[i];if(e===p||p.contains(e)||e===fab)continue;if(e.children.length<14&&/Usamos cookies/.test(e.textContent||"")){var n=e;while(n&&n!==document.body){if(getComputedStyle(n).position==="fixed")return n;n=n.parentElement}}}return null}
function fit(){if(!p.classList.contains("open"))return;var b=innerWidth<=480?banner():null;var r=b&&b.getBoundingClientRect();if(r&&r.top>=innerHeight-60)b=null;if(b){var bt=Math.max(88,innerHeight-r.top+8);p.style.bottom=bt+"px";p.style.height=Math.max(200,Math.min(560,innerHeight-bt-12))+"px"}else{p.style.bottom="";p.style.height=""}}
new MutationObserver(fit).observe(document.body,{childList:true,subtree:true});addEventListener("resize",fit);if(window.visualViewport)visualViewport.addEventListener("resize",fit);
function open(o){p.classList.toggle("open",o);fab.setAttribute("aria-expanded",String(o));if(o&&!m.children.length)say("Olá! Eu respondo dúvidas comuns sobre o curso, com base nas informações desta página. Escolha um assunto ou digite sua pergunta.","bot");fit();if(o)inp.focus()}
fab.onclick=function(){open(!p.classList.contains("open"))};x.onclick=function(){open(false);fab.focus()};
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&p.classList.contains("open")){open(false);fab.focus()}});
document.body.appendChild(p);document.body.appendChild(fab);
if(location.search.indexOf("chat=open")>-1)open(true);
})();
