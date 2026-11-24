(()=>{
'use strict';
const rates={'0.3':[100,50,85],'1.0':[75,25,70],'2.0':[45,5,40]};
const keys=['original','randomised','conditioned'];
const names=['Original PPO','Domain Randomisation','Friction Conditioned PPO'];
const $=id=>document.getElementById(id);
const frictionButtons=[...document.querySelectorAll('[data-friction]')];
frictionButtons.forEach(button=>button.addEventListener('click',()=>{
 const friction=button.dataset.friction;
 frictionButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 rates[friction].forEach((rate,i)=>{$('bar-'+keys[i]).style.width=rate+'%';$('value-'+keys[i]).textContent=rate+'%';});
 $('comparison-announcement').textContent=`At friction ${friction}: ${rates[friction].map((rate,i)=>names[i]+' '+rate+'%').join(', ')}.`;
}));
const metrics={distance:{name:'forward distance',unit:'m',mean:15.705,low:8.256,high:23.154,min:-5,max:30},speed:{name:'forward speed',unit:'m/s',mean:.232,low:.041,high:.423,min:-.1,max:.5}};
const metricButtons=[...document.querySelectorAll('[data-metric]')];
metricButtons.forEach(button=>button.addEventListener('click',()=>{
 const m=metrics[button.dataset.metric],x=value=>24+(value-m.min)/(m.max-m.min)*392;
 metricButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 $('metric-label').textContent='Mean paired improvement in '+m.name;
 $('ci-number').replaceChildren(document.createTextNode('+'+m.mean.toFixed(3)+' '));
 const unit=document.createElement('span');unit.textContent=m.unit;$('ci-number').append(unit);
 $('ci-bounds').textContent=`${m.low.toFixed(3)} to ${m.high.toFixed(3)} ${m.unit}`;
 for(const [id,attrs] of Object.entries({'ci-zero':{x1:x(0),x2:x(0)},'ci-range':{x1:x(m.low),x2:x(m.high)},'ci-low-cap':{x1:x(m.low),x2:x(m.low)},'ci-high-cap':{x1:x(m.high),x2:x(m.high)},'ci-dot':{cx:x(m.mean)},'tick-zero':{x:x(0)}}))for(const [attr,value] of Object.entries(attrs))$(id).setAttribute(attr,value);
 $('tick-min').textContent=String(m.min).replace('-','−');$('tick-max').textContent=m.max+' '+m.unit;
 $('ci-title').textContent=m.name+', conditioned minus randomised PPO';
 const description=`Mean improvement +${m.mean.toFixed(3)} ${m.unit}. 95% confidence interval ${m.low.toFixed(3)} to ${m.high.toFixed(3)} ${m.unit}. The interval is above zero.`;
 $('ci-desc').textContent=description;$('metric-announcement').textContent=description;
}));
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.ppo-info[open]').forEach(el=>el.removeAttribute('open'));});
document.addEventListener('click',event=>document.querySelectorAll('.ppo-info[open]').forEach(el=>{if(!el.contains(event.target))el.removeAttribute('open');}));
})();
