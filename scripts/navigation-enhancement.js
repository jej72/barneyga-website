/* Barney keyboard navigation enhancement — 2026-10-14.
 * Keep this source when regenerating the Material bundle. */
(()=>{
  const drawer=document.getElementById('__drawer'), search=document.getElementById('__search');
  const sidebar=document.querySelector('.md-sidebar--primary'), panel=document.querySelector('[data-md-component="search"]');
  if(!drawer||!sidebar||!search||!panel)return;
  const mobile=matchMedia('(max-width: 76.234375em)'), smallSearch=matchMedia('(max-width: 59.984375em)');
  const menu=document.querySelector('.md-header label[for="__drawer"]'), searchButton=document.querySelector('.md-header label[for="__search"]');
  let previousSearch=null;
  sidebar.id=sidebar.id||'barney-navigation'; panel.id=panel.id||'barney-search';
  function activate(control,value){control.checked=value;control.dispatchEvent(new Event('change',{bubbles:true}));}
  function labelButton(label,name,control){if(!label)return;label.setAttribute('role','button');label.tabIndex=0;label.setAttribute('aria-label',name);if(control)label.setAttribute('aria-controls',control);label.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopImmediatePropagation();label.click();}});}
  labelButton(menu,'Open navigation',sidebar.id);labelButton(searchButton,'Open search',panel.id);
  const close=sidebar.querySelector('label[for="__drawer"]');labelButton(close,'Close navigation',sidebar.id);
  sidebar.querySelectorAll('label[for]').forEach(label=>{if(label===close)return;const input=document.getElementById(label.htmlFor);if(input?.type==='checkbox'){labelButton(label,label.textContent.trim(),null);const sync=()=>{label.setAttribute('aria-expanded',String(input.checked));const child=input.parentElement.querySelector(':scope > nav');if(child&&input.parentElement.classList.contains('md-nav__item--nested')){child.inert=!input.checked;child.setAttribute('aria-expanded',String(input.checked));}};input.addEventListener('change',sync);sync();}});
  function sync(){sidebar.querySelectorAll('label[role="button"]').forEach(e=>{const group=e.parentElement?.classList.contains('md-nav__item--nested');e.tabIndex=mobile.matches||group?0:-1;});sidebar.inert=mobile.matches&&!drawer.checked;panel.inert=smallSearch.matches&&!search.checked;menu?.setAttribute('aria-expanded',String(drawer.checked));searchButton?.setAttribute('aria-expanded',String(search.checked));}
  function visible(element){if(!element?.isConnected||element.closest('[inert]'))return false;const r=element.getBoundingClientRect();return r.width>0&&r.height>0&&r.right>0&&r.left<innerWidth;}
  function restoreSearch(){let target=visible(previousSearch)?previousSearch:smallSearch.matches?searchButton:panel.querySelector('input');requestAnimationFrame(()=>target?.focus());}
  drawer.addEventListener('change',()=>{sync();if(!drawer.checked&&sidebar.contains(document.activeElement))menu?.focus();});
  search.addEventListener('change',()=>{if(search.checked){const focused=document.activeElement;if(!panel.contains(focused))previousSearch=focused;}else if(panel.contains(document.activeElement)){restoreSearch();}sync();});
  document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(search.checked){event.preventDefault();event.stopImmediatePropagation();activate(search,false);restoreSearch();}else if(drawer.checked&&mobile.matches){event.preventDefault();event.stopImmediatePropagation();activate(drawer,false);menu?.focus();}},true);
  mobile.addEventListener('change',sync);smallSearch.addEventListener('change',sync);sync();
})();
