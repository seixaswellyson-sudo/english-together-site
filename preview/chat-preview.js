(function(){
var CK="https://pay.kiwify.com.br/zzFq5RR?afid=7FrI0A9X";
var AI_URL="https://text.pollinations.ai/openai";
var SYS=[
"Você é o assistente virtual do site do curso English Together. Fala português brasileiro informal e amigável, como uma pessoa de verdade no chat.",
"Respostas curtas: no máximo 3 frases. Pode cumprimentar de volta e conversar naturalmente.",
"Responda SOMENTE em português brasileiro, nunca em inglês.",
"Vá direto à resposta: nunca narre seu raciocínio, nunca comece com frases como 'we should', 'let me', 'I will' ou similares.",
"Responda SOMENTE com base nestas informações do curso:",
"- Curso English Together, do professor Ezequiel Barcelos, formado em Letras (Português e Inglês), mais de 20 anos ensinando e mais de 9 mil alunos, com alunos em mais de 7 países.",
"- O curso é pensado para brasileiros: serve para iniciantes e não precisa saber inglês antes.",
"- Conteúdo: conversação, pronúncia, vocabulário, inglês para viagens (aeroportos, hotéis, restaurantes), trabalho e situações reais do dia a dia, com explicações simples e exercícios.",
"- A compra é feita pelos botões desta página, no checkout da Kiwify.",
"- REGRA FIRME: nunca informe preço, valores, parcelas ou descontos. Diga que o valor atual e as formas de pagamento aparecem no checkout da Kiwify antes de pagar.",
"- REGRA FIRME: nunca prometa reembolso, garantia ou prazo de cancelamento. Diga que as regras estão nos termos de compra da Kiwify, no checkout.",
"- Não garanta resultados (fluência, prazo de aprendizado). Diga que depende da prática de cada pessoa.",
"- Se não souber algo, admita e sugira ver as Perguntas frequentes da página ou falar no WhatsApp do professor (link no fim da página).",
"- Não invente informações. Não fale de assuntos fora do curso por muito tempo; redirecione com simpatia."
].join("\n");
var QA=[
{k:"iniciante",q:"É para iniciantes?",w:["iniciante","basico","básico","zero","comecar","começar"],a:"Sim! O conteúdo é pensado para brasileiros que querem desenvolver o inglês desde as bases, então pode começar do zero sem problema."},
{k:"saber",q:"Preciso saber inglês?",w:["precisa saber","preciso saber","pre-requisito","nivel","nível","conhecimento"],a:"Não precisa. Você começa estudando vocabulário, frases e estruturas básicas, no seu ritmo."},
{k:"conteudo",q:"O que vou aprender?",w:["aprender","conteudo","conteúdo","modulo","módulo","metodo","método","aula","viagem","trabalho","pronuncia","pronúncia"],a:"São seis frentes: conversação, pronúncia, viagens, trabalho, vocabulário e situações reais. O foco é falar inglês no dia a dia, com explicações simples e exercícios para praticar."},
{k:"preco",q:"Quanto custa?",w:["preco","preço","valor","custa","quanto","pagar","parcel","pix","cartao","cartão","boleto","vezes","duas"],a:"O valor atual e as formas de pagamento (incluindo se há parcelamento) aparecem no checkout da Kiwify, antes de você pagar. Por aqui não consigo confirmar valor nem parcelas.",cta:1},
{k:"confia",q:"É confiável?",w:["confia","golpe","seguro","verdade","real","fake","funciona"],a:"Não posso garantir resultados nem avaliar o curso por você. O que a página informa: o curso é do professor Ezequiel Barcelos, formado em Letras (Português e Inglês), com mais de 20 anos de ensino e mais de 9 mil alunos. O pagamento é feito no checkout da Kiwify, onde você vê os termos antes de pagar."},
{k:"inscricao",q:"Como me inscrevo?",w:["inscri","comprar","compra","matricul","checkout","kiwify","entrar","quero"],a:"É só clicar em um dos botões de compra desta página para abrir o checkout da Kiwify.",cta:1},
{k:"reembolso",q:"Reembolso?",w:["reembolso","cancel","devol","arrepend","garantia","estorno"],a:"As regras de reembolso e cancelamento estão nos termos de compra da Kiwify, que aparecem no checkout. Não consigo afirmar prazo ou direito por aqui; confira lá antes de pagar.",cta:1}
];
var FALL="Hmm, essa eu não tenho certeza. Dá uma olhada nas Perguntas frequentes aqui da página ou escolha um dos assuntos abaixo.";
var GREET=["Opa, tudo certo! Sou o assistente do curso English Together. Pode perguntar o que quiser sobre o curso.","Oi! Tudo ótimo, e você? Quer saber algo sobre o curso?"];
var hist=[];
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function norm(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
var fab=el("button","etc-fab");fab.type="button";fab.setAttribute("aria-label","Abrir chat de dúvidas sobre o curso");fab.setAttribute("aria-expanded","false");
fab.innerHTML='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 11h7M8.5 14h4"/></svg>';
var p=el("section","etc-panel");p.setAttribute("role","dialog");p.setAttribute("aria-label","Dúvidas sobre o curso");
var h=el("div","etc-head");h.appendChild(el("div","etc-av","ET"));
var t=el("div","etc-t");t.appendChild(el("b",0,"Dúvidas sobre o curso"));t.appendChild(el("span",0,"Assistente com IA (gratuito)"));h.appendChild(t);
var x=el("button","etc-x","×");x.type="button";x.setAttribute("aria-label","Fechar chat");h.appendChild(x);
var m=el("div","etc-msgs");m.setAttribute("aria-live","polite");
var chips=el("div","etc-chips");
var f=el("form","etc-form");var inp=el("input");inp.type="text";inp.placeholder="Digite sua dúvida";inp.setAttribute("aria-label","Digite sua dúvida");inp.maxLength=200;var go=el("button",0,"Enviar");go.type="submit";f.appendChild(inp);f.appendChild(go);
var note=el("div","etc-note","Assistente com IA gratuita: respostas geradas com base nesta página. Sua pergunta vai a um serviço de IA para gerar a resposta, então evite dados pessoais.");
[h,m,chips,f,note].forEach(function(n){p.appendChild(n)});
function say(txt,who,cta,ai){var d=el("div","etc-m "+who,txt);if(ai)d.appendChild(el("span","etc-tag","resposta da IA"));if(cta){d.appendChild(document.createTextNode("\n"));var a=el("a",0,"Ir para o checkout");a.href=CK;a.target="_blank";a.rel="noopener";d.appendChild(a)}m.appendChild(d);m.scrollTop=m.scrollHeight}
function typing(on){var e=m.querySelector(".etc-typing");if(e)e.remove();if(on){var d=el("div","etc-m bot etc-typing");d.appendChild(el("span"));d.appendChild(el("span"));d.appendChild(el("span"));m.appendChild(d);m.scrollTop=m.scrollHeight}}
function match(v){var n=norm(v),best=null,sc=0;QA.forEach(function(e){var s=0;e.w.forEach(function(w){if(n.indexOf(norm(w))>-1)s++});if(s>sc){sc=s;best=e}});return best}
function isGreet(v){var n=norm(v).replace(/[^a-z ]/g,"").trim();return /^(oi|ola|opa|hey|hello|hi|eae|eai|bom dia|boa tarde|boa noite)( tudo (bem|certo|bom)|)?[ !]*$/.test(n)||n.length<3}
function answer(e){say(e.q,"me");typing(true);setTimeout(function(){typing(false);say(e.a,"bot",e.cta)},300)}
QA.forEach(function(e){var b=el("button",0,e.q);b.type="button";b.onclick=function(){answer(e)};chips.appendChild(b)});
function ask(v){
  typing(true);
  var msgs=[{role:"system",content:SYS}].concat(hist.slice(-8)).concat([{role:"user",content:v}]);
  var ctrl=new AbortController();var to=setTimeout(function(){ctrl.abort()},15000);
  fetch(AI_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:msgs,model:"openai"}),signal:ctrl.signal})
  .then(function(r){if(!r.ok)throw 0;return r.json()})
  .then(function(j){
    clearTimeout(to);typing(false);
    var a=j&&j.choices&&j.choices[0]&&j.choices[0].message&&j.choices[0].message.content;
    a=(a||"").trim();
    a=a.replace(/^(okay|so|well|let me|we should|i should|i will|i need|the user|first)[\s\S]{0,160}?\.\s*/i,"").trim();
    if(/^(okay|so|well|let me|we should|i should|i will|i need|the user)/i.test(a))a=a.replace(/^[\s\S]{0,160}?\.\s*/,"").trim();
    if(!a)throw 0;
    if(/r\$\s?\d|\d+\s?x\s?de|reembolso garantido|garantia de \d/i.test(a)){var b=match(v)||QA[3];say(b.a,"bot",1);return}
    hist.push({role:"user",content:v},{role:"assistant",content:a});
    say(a,"bot",0,1);
  })
  .catch(function(){
    clearTimeout(to);typing(false);
    var b=match(v);
    if(b)say(b.a,"bot",b.cta);
    else if(isGreet(v))say(GREET[Math.floor(Math.random()*GREET.length)],"bot");
    else say(FALL,"bot");
  });
}
f.onsubmit=function(ev){ev.preventDefault();var v=inp.value.trim();if(!v)return;inp.value="";say(v,"me");ask(v)};
function banner(){var all=document.querySelectorAll("body *");for(var i=0;i<all.length;i++){var e=all[i];if(e===p||p.contains(e)||e===fab)continue;if(e.children.length<14&&/Usamos cookies/.test(e.textContent||"")){var n=e;while(n&&n!==document.body){if(getComputedStyle(n).position==="fixed")return n;n=n.parentElement}}}}
function fit(){if(!p.classList.contains("open"))return;var b=innerWidth<=480?banner():null;var r=b&&b.getBoundingClientRect();if(r&&r.top>=innerHeight-60)b=null;if(b){var bt=Math.max(88,innerHeight-r.top+8);p.style.bottom=bt+"px";p.style.height=Math.max(200,Math.min(560,innerHeight-bt-12))+"px"}else{p.style.bottom="";p.style.height=""}}
new MutationObserver(fit).observe(document.body,{childList:true,subtree:true});addEventListener("resize",fit);if(window.visualViewport)visualViewport.addEventListener("resize",fit);
function open(o){p.classList.toggle("open",o);fab.setAttribute("aria-expanded",String(o));if(o&&!m.children.length)say("Opa! Eu sou o assistente do curso. Pode conversar comigo normalmente: pergunta o que quiser sobre o English Together.","bot");fit();if(o)inp.focus()}
fab.onclick=function(){open(!p.classList.contains("open"))};x.onclick=function(){open(false);fab.focus()};
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&p.classList.contains("open")){open(false);fab.focus()}});
document.body.appendChild(p);document.body.appendChild(fab);
if(location.search.indexOf("chat=open")>-1)open(true);
})();
