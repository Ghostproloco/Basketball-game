// ===== Escudos generados (SVG) · sin imágenes externas, sin fondo, nunca fallan =====
(()=>{
const SHAPES=[
 'M8 8H92V58C92 86 66 100 50 108C34 100 8 86 8 58Z',
 'M10 12Q50 0 90 12V55Q90 90 50 108Q10 90 10 55Z',
 'M50 3L93 19V62L50 109L7 62V19Z',
 'M6 8H94V68L50 108L6 68Z',
 'M50 5A47 47 0 1 1 49.9 5Z'
];
const TEAM_ICON=['bat','bat','wing','clover','cat','comet','compass','swords','wolf','spiral','bee','tiger','fish','devil','bear','star','comet','crown','sword','mountain','castle','wing','wing','anchor','wave','spiral','tower','shark','bear','fleur','flame','wave','spiral','keys','mountain','wolf','star','rocket','beetle','spider','V','flame','helmet','spiral','shoe','comet','cross','wing','bear','eclipse'];
const D='#0b0d1a';
// cada icono se dibuja en una caja 24x24. F = relleno claro, A = acento
const ICON={
 star:(F,A)=>`<polygon points="12,1.8 14.9,8.5 22.1,9.2 16.6,14 18.3,21.2 12,17.4 5.7,21.2 7.4,14 1.9,9.2 9.1,8.5" fill="${F}"/>`,
 crown:(F,A)=>`<path d="M3 17.5L1.8 7L8 11.5L12 4L16 11.5L22.2 7L21 17.5Z" fill="${F}"/><rect x="3" y="19" width="18" height="2.8" rx="1" fill="${A}"/><circle cx="12" cy="4" r="1.5" fill="${A}"/>`,
 wing:(F,A)=>`<path d="M2.5 20C3 11 8.5 5 21.5 2.5C19.8 6.5 18.5 8.5 16.5 9.8C18.8 9.9 20.3 9.4 21.5 8.8C20 13 17.5 15 14.2 15.6C16 16.2 17.6 16.2 18.8 15.8C16.7 19 12.5 20.3 8 19.6C9.4 20.6 10.6 20.8 11.8 20.8C8.2 22.4 5 22.2 2.5 20Z" fill="${F}"/><path d="M6 17C8 12 12 8.5 17 6.5" stroke="${A}" stroke-width="1.1" fill="none"/>`,
 bat:(F,A)=>`<path d="M12 8.5L10.2 4L9 8.4C7 6.2 3 6.2 1 9.4C3 9.6 4 10.6 4.6 12.2C6 11.2 7.6 11.6 8.6 13.2C9.6 12.2 10.8 12.4 12 15.4C13.2 12.4 14.4 12.2 15.4 13.2C16.4 11.6 18 11.2 19.4 12.2C20 10.6 21 9.6 23 9.4C21 6.2 17 6.2 15 8.4L13.8 4Z" fill="${F}"/><circle cx="10.4" cy="10" r=".9" fill="${A}"/><circle cx="13.6" cy="10" r=".9" fill="${A}"/>`,
 clover:(F,A)=>`<circle cx="12" cy="6.8" r="4.4" fill="${F}"/><circle cx="6.8" cy="12" r="4.4" fill="${F}"/><circle cx="17.2" cy="12" r="4.4" fill="${F}"/><circle cx="12" cy="17.2" r="4.4" fill="${F}"/><rect x="10.8" y="9.6" width="2.4" height="4.8" fill="${F}"/><path d="M13 19 Q14.5 21 17 22.2" stroke="${A}" stroke-width="1.8" fill="none"/>`,
 cat:(F,A)=>`<path d="M2.8 2.5L9 6.8Q12 6.2 15 6.8L21.2 2.5L21.8 12.5Q21.8 21.8 12 21.8Q2.2 21.8 2.2 12.5Z" fill="${F}"/><ellipse cx="8.4" cy="12.5" rx="1.7" ry="2" fill="${A}"/><ellipse cx="15.6" cy="12.5" rx="1.7" ry="2" fill="${A}"/><path d="M10.4 16.4h3.2L12 18.2Z" fill="${A}"/>`,
 tiger:(F,A)=>`<path d="M2.8 2.5L9 6.8Q12 6.2 15 6.8L21.2 2.5L21.8 12.5Q21.8 21.8 12 21.8Q2.2 21.8 2.2 12.5Z" fill="${F}"/><path d="M12 7.5v3M9 8.2l.8 2.6M15 8.2l-.8 2.6M3.6 12.5h3M17.4 12.5h3" stroke="${A}" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="8.4" cy="13.2" rx="1.5" ry="1.8" fill="${A}"/><ellipse cx="15.6" cy="13.2" rx="1.5" ry="1.8" fill="${A}"/><path d="M10.4 17h3.2L12 18.6Z" fill="${A}"/>`,
 bear:(F,A)=>`<circle cx="5.6" cy="5.6" r="3.6" fill="${F}"/><circle cx="18.4" cy="5.6" r="3.6" fill="${F}"/><ellipse cx="12" cy="13" rx="9.2" ry="8.6" fill="${F}"/><ellipse cx="12" cy="16" rx="3.8" ry="2.8" fill="${A}" opacity=".35"/><circle cx="8.2" cy="11.5" r="1.5" fill="${A}"/><circle cx="15.8" cy="11.5" r="1.5" fill="${A}"/><ellipse cx="12" cy="15" rx="1.7" ry="1.2" fill="${A}"/>`,
 wolf:(F,A)=>`<path d="M2.2 1.8L9 7.4H15L21.8 1.8L21.2 13L15.6 21.8H8.4L2.8 13Z" fill="${F}"/><path d="M6.4 11.2L10.6 12.6L9.6 14.4Z M17.6 11.2L13.4 12.6L14.4 14.4Z" fill="${A}"/><path d="M10.2 18h3.6L12 20Z" fill="${A}"/>`,
 devil:(F,A)=>`<path d="M3 1C3.5 5 5 7 7 8L5.5 11Q4.5 19 12 22Q19.5 19 18.5 11L17 8C19 7 20.5 5 21 1C17.5 3 15 4.5 12 5.2C9 4.5 6.5 3 3 1Z" fill="${F}"/><path d="M6.8 12.2L10.6 13.4L9.6 15Z M17.2 12.2L13.4 13.4L14.4 15Z" fill="${A}"/>`,
 comet:(F,A)=>`<path d="M14 10C9 9 5 5.5 1.8 1.8C4.4 6.4 5.2 9.2 7 11.8C4.8 11.6 3 12 1.6 12.8C5 13.2 7.4 14.4 9.2 16.6Z" fill="${A}"/><circle cx="15.4" cy="15.4" r="6.6" fill="${F}"/><circle cx="13.6" cy="13.8" r="1.5" fill="${A}" opacity=".7"/><circle cx="17.6" cy="17" r="1.1" fill="${A}" opacity=".7"/>`,
 compass:(F,A)=>`<circle cx="12" cy="12" r="9.6" fill="none" stroke="${F}" stroke-width="2.4"/><polygon points="12,3.6 14.6,12 12,20.4 9.4,12" fill="${F}"/><polygon points="12,3.6 14.6,12 9.4,12" fill="${A}"/><circle cx="12" cy="12" r="1.5" fill="${D}"/>`,
 swords:(F,A)=>`<g stroke-linecap="round"><path d="M4.5 4.5L19.5 19.5M19.5 4.5L4.5 19.5" stroke="${D}" stroke-width="4.4"/><path d="M4.5 4.5L19.5 19.5M19.5 4.5L4.5 19.5" stroke="${F}" stroke-width="2.4"/><path d="M13.5 17L17 13.5M10.5 17L7 13.5" stroke="${A}" stroke-width="2.6"/></g>`,
 sword:(F,A)=>`<path d="M12 1.5L14.4 5V15H9.6V5Z" fill="${F}"/><rect x="5" y="15" width="14" height="2.6" rx="1.2" fill="${A}"/><rect x="10.8" y="17.6" width="2.4" height="3.6" fill="${F}"/><circle cx="12" cy="21.6" r="1.6" fill="${A}"/>`,
 spiral:(F,A)=>`<path d="M12 12C12 10 14.6 10 14.6 12.6C14.6 15.6 9.4 15.6 9.4 11.4C9.4 7.2 17.2 7.2 17.2 12.6C17.2 18.4 6.8 18.4 6.8 10.8C6.8 4 20.2 4 20.2 12.4" fill="none" stroke="${D}" stroke-width="4.6" stroke-linecap="round"/><path d="M12 12C12 10 14.6 10 14.6 12.6C14.6 15.6 9.4 15.6 9.4 11.4C9.4 7.2 17.2 7.2 17.2 12.6C17.2 18.4 6.8 18.4 6.8 10.8C6.8 4 20.2 4 20.2 12.4" fill="none" stroke="${F}" stroke-width="2.4" stroke-linecap="round"/>`,
 bee:(F,A)=>`<ellipse cx="6.4" cy="9.2" rx="4.8" ry="2.7" transform="rotate(-28 6.4 9.2)" fill="${A}"/><ellipse cx="17.6" cy="9.2" rx="4.8" ry="2.7" transform="rotate(28 17.6 9.2)" fill="${A}"/><ellipse cx="12" cy="14.4" rx="4.2" ry="6.6" fill="${F}"/><circle cx="12" cy="6.6" r="2.9" fill="${F}"/><path d="M8 12.6h8M8 15.8h8M8.6 18.6h6.8" stroke="${D}" stroke-width="1.6"/><path d="M10.6 4.4L9 2M13.4 4.4L15 2" stroke="${F}" stroke-width="1.2"/><path d="M12 21.4v2" stroke="${D}" stroke-width="1.6"/>`,
 beetle:(F,A)=>`<ellipse cx="12" cy="14" rx="6.2" ry="7.6" fill="${F}"/><circle cx="12" cy="5.6" r="3" fill="${F}"/><path d="M12 8.6V21.6" stroke="${D}" stroke-width="1.4"/><path d="M5.8 11L2 8.6M5.6 15L1.6 15.6M6.4 18.8L3 21.6M18.2 11L22 8.6M18.4 15L22.4 15.6M17.6 18.8L21 21.6" stroke="${F}" stroke-width="1.6" stroke-linecap="round"/><path d="M10.2 3L8.4 1M13.8 3L15.6 1" stroke="${F}" stroke-width="1.2"/><circle cx="9" cy="13" r="1.2" fill="${A}"/><circle cx="15" cy="13" r="1.2" fill="${A}"/>`,
 spider:(F,A)=>`<g stroke="${F}" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M9 11L3.4 6.6L1.6 9.6M9 12.6L2 12.8L1.4 16.4M9.4 14.4L4.4 18.4L5 21.6M10 15.8L7.6 21.4"/><path d="M15 11L20.6 6.6L22.4 9.6M15 12.6L22 12.8L22.6 16.4M14.6 14.4L19.6 18.4L19 21.6M14 15.8L16.4 21.4"/></g><ellipse cx="12" cy="15.4" rx="4.2" ry="5.4" fill="${F}"/><circle cx="12" cy="8.6" r="2.7" fill="${F}"/><path d="M12 12.4l1.4 2.2L12 17.4l-1.4-2.8Z" fill="${A}"/>`,
 fish:(F,A)=>`<path d="M1.6 12C5 5.6 12.4 4.4 17 9.4L22.6 5.6L21 12L22.6 18.4L17 14.6C12.4 19.6 5 18.4 1.6 12Z" fill="${F}"/><circle cx="6.4" cy="11" r="1.2" fill="${A}"/><path d="M12 7.6C13.4 10 13.4 14 12 16.4" stroke="${A}" stroke-width="1.2" fill="none"/>`,
 shark:(F,A)=>`<path d="M2 17.6C8.4 17 10.6 9 12.6 2C14.4 9.4 17.4 16 22 17.6Z" fill="${F}"/><path d="M1.6 20.4Q4.2 18.6 6.8 20.4T12 20.4T17.2 20.4T22.4 20.4" stroke="${F}" stroke-width="1.9" fill="none"/><path d="M12.6 7.4C12.8 11 13.4 13.4 14.6 15.8" stroke="${A}" stroke-width="1.1" fill="none"/>`,
 mountain:(F,A)=>`<path d="M0.8 21L8.4 6L12.6 13.4L15.4 9.4L23.2 21Z" fill="${F}"/><path d="M8.4 6L10.8 10.8L8.4 9.6L6.2 10.8Z M15.4 9.4L17 12L15.4 11.2L13.8 12Z" fill="${A}"/>`,
 castle:(F,A)=>`<path d="M2.6 21.4V7.2H5.8V9.6H7.8V7.2H10.2V9.6H13.8V7.2H16.2V9.6H18.2V7.2H21.4V21.4Z" fill="${F}"/><path d="M9.8 21.4V16.2A2.2 2.2 0 0 1 14.2 16.2V21.4Z" fill="${A}"/><rect x="4.6" y="12" width="1.8" height="3.2" fill="${A}"/><rect x="17.6" y="12" width="1.8" height="3.2" fill="${A}"/>`,
 tower:(F,A)=>`<path d="M6.6 21.6V7.4H4.4V2.6H8V4.8H10.4V2.6H13.6V4.8H16V2.6H19.6V7.4H17.4V21.6Z" fill="${F}"/><path d="M10.2 21.6V16.6A1.8 1.8 0 0 1 13.8 16.6V21.6Z" fill="${A}"/><rect x="10.8" y="9" width="2.4" height="4" rx="1.1" fill="${A}"/>`,
 anchor:(F,A)=>`<g stroke-linecap="round" fill="none"><g stroke="${D}" stroke-width="4.6"><circle cx="12" cy="4.6" r="2.2"/><path d="M12 6.8V20.4M7.8 10.6H16.2M3.8 14.4C4 18.8 8 21 12 21C16 21 20 18.8 20.2 14.4"/></g><g stroke="${F}" stroke-width="2.4"><circle cx="12" cy="4.6" r="2.2"/><path d="M12 6.8V20.4M7.8 10.6H16.2M3.8 14.4C4 18.8 8 21 12 21C16 21 20 18.8 20.2 14.4"/></g></g>`,
 wave:(F,A)=>`<path d="M1.6 18C3 8.6 10.4 3.4 17 5.6C12.8 6.6 11.8 10 13.8 12C16.2 9.6 19.6 10.2 22.4 13.2V20.4H1.6Z" fill="${F}"/><path d="M1.6 20.4V18.4Q5 15.4 8 18.4T14.4 18.4T22.4 18.4V20.4Z" fill="${A}"/>`,
 fleur:(F,A)=>`<path d="M12 1.6C15.2 5.6 15.2 10.4 12 14.4C8.8 10.4 8.8 5.6 12 1.6Z" fill="${F}"/><path d="M2.6 8.6C6 5.8 10.6 8 11.4 14.4C7 14.6 3.8 13.2 2.6 8.6Z" fill="${F}"/><path d="M21.4 8.6C18 5.8 13.4 8 12.6 14.4C17 14.6 20.2 13.2 21.4 8.6Z" fill="${F}"/><rect x="7.4" y="15" width="9.2" height="2.4" rx="1" fill="${A}"/><path d="M8.6 17.4L12 22.4L15.4 17.4Z" fill="${F}"/>`,
 keys:(F,A)=>`<g stroke-linecap="round" fill="none"><g stroke="${D}" stroke-width="4.4"><path d="M6.6 7.6L18 20.4M17.4 7.6L6 20.4"/><circle cx="5.6" cy="5.6" r="2.8"/><circle cx="18.4" cy="5.6" r="2.8"/></g><g stroke="${F}" stroke-width="2.3"><path d="M6.6 7.6L18 20.4M17.4 7.6L6 20.4"/><circle cx="5.6" cy="5.6" r="2.8"/><circle cx="18.4" cy="5.6" r="2.8"/></g><path d="M15.6 17.8L18.6 17M8.4 17.8L5.4 17" stroke="${A}" stroke-width="2.2"/></g>`,
 rocket:(F,A)=>`<path d="M12 1.6C16.6 5.8 16.8 12 15.4 16.6H8.6C7.2 12 7.4 5.8 12 1.6Z" fill="${F}"/><polygon points="8.8,11.6 3.6,18.4 8.8,16.6" fill="${A}"/><polygon points="15.2,11.6 20.4,18.4 15.2,16.6" fill="${A}"/><circle cx="12" cy="9.4" r="2.3" fill="${D}"/><polygon points="9.6,17.4 12,23 14.4,17.4" fill="${A}"/>`,
 V:(F,A)=>`<polygon points="2.6,3.6 8.6,3.6 12,14 15.4,3.6 21.4,3.6 14.6,21.4 9.4,21.4" fill="${F}"/><polygon points="12,14 15.4,3.6 21.4,3.6 14.6,21.4 12,21.4" fill="${A}" opacity=".45"/>`,
 flame:(F,A)=>`<path d="M12 1.6C13.2 7 18.4 9 18.4 15C18.4 19.2 15.6 22.4 12 22.4C8.4 22.4 5.6 19.2 5.6 15C5.6 12 7.8 10 8.8 7.6C9.6 9.8 10.6 10.8 11.6 10.8C11 7.6 10.8 4.6 12 1.6Z" fill="${F}"/><path d="M12 12.6C12.6 15 14.6 15.8 14.6 18C14.6 19.8 13.4 21 12 21C10.6 21 9.4 19.8 9.4 18C9.4 16.6 10.6 15.6 11 14.2C11.4 14.8 11.8 15 12 15Z" fill="${A}"/>`,
 helmet:(F,A)=>`<path d="M3.6 21.6V11C3.6 6 7.4 2.6 12 2.6C16.6 2.6 20.4 6 20.4 11V21.6H16.8V15H7.2V21.6Z" fill="${F}"/><rect x="6.4" y="10.2" width="11.2" height="3" rx="1" fill="${A}"/><path d="M12 2.6V9" stroke="${A}" stroke-width="1.4"/>`,
 shoe:(F,A)=>`<path d="M5.4 21.6V10.4C5.4 2.6 18.6 2.6 18.6 10.4V21.6" fill="none" stroke="${D}" stroke-width="6.2" stroke-linecap="round"/><path d="M5.4 21.6V10.4C5.4 2.6 18.6 2.6 18.6 10.4V21.6" fill="none" stroke="${F}" stroke-width="3.8" stroke-linecap="round"/><circle cx="5.4" cy="14.4" r=".9" fill="${A}"/><circle cx="6.6" cy="8.8" r=".9" fill="${A}"/><circle cx="12" cy="5.4" r=".9" fill="${A}"/><circle cx="17.4" cy="8.8" r=".9" fill="${A}"/><circle cx="18.6" cy="14.4" r=".9" fill="${A}"/>`,
 cross:(F,A)=>`<path d="M9.4 1.8H14.6V9.4H22.2V14.6H14.6V22.2H9.4V14.6H1.8V9.4H9.4Z" fill="${F}"/><circle cx="12" cy="12" r="2.2" fill="${A}"/>`,
 eclipse:(F,A)=>`<g stroke="${F}" stroke-width="1.8" stroke-linecap="round"><path d="M12 1.4V4M12 20V22.6M1.4 12H4M20 12H22.6M4.5 4.5L6.3 6.3M17.7 17.7L19.5 19.5M19.5 4.5L17.7 6.3M6.3 17.7L4.5 19.5"/></g><circle cx="12" cy="12" r="6.8" fill="${F}"/><circle cx="14" cy="11" r="5.9" fill="${D}"/>`
};
const hex=h=>{h=(h||'#3687d8').replace('#','');if(h.length==3)h=h.split('').map(c=>c+c).join('');return[0,2,4].map(i=>parseInt(h.substr(i,2),16)||0)};
const mix=(h,t,k)=>{const a=hex(h),b=hex(t);return'#'+a.map((v,i)=>Math.round(v+(b[i]-v)*k).toString(16).padStart(2,'0')).join('')};
const lum=h=>{const[r,g,b]=hex(h);return(r*299+g*587+b*114)/1000};
const cache={};
function crestSVG(i,col){
 i=((+i||0)%50+50)%50;col=col||'#3687d8';
 const k=i+col;if(cache[k])return cache[k];
 const P=col,P2=mix(col,'#000000',.45),PL=mix(col,'#ffffff',.35),sh=SHAPES[i%5],pat=(i*3+1)%6,trim=i%3==0?'#ffd23d':i%3==1?'#f4f7ff':'#ffb23d';
 const fill=lum(P)>170?mix(P,'#000000',.15):P;
 const ic=(ICON[TEAM_ICON[i]]||ICON.star)('#fff7dd',trim);
 const PAT=[
  '',
  `<rect x="50" y="0" width="60" height="120" fill="${P2}"/>`,
  `<rect x="0" y="40" width="120" height="26" fill="${P2}"/>`,
  `<path d="M-4 30L50 70L104 30V52L50 92L-4 52Z" fill="${P2}"/>`,
  `<path d="M-4 90L-4 62L84 -4H110V22Z" fill="${P2}"/>`,
  `<rect x="0" y="0" width="120" height="34" fill="${P2}"/>`][pat];
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 112" width="100" height="112"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${PL}"/><stop offset=".45" stop-color="${fill}"/><stop offset="1" stop-color="${P2}"/></linearGradient><clipPath id="c"><path d="${sh}"/></clipPath></defs>`+
 `<path d="${sh}" fill="url(#g)"/><g clip-path="url(#c)">${PAT}<ellipse cx="30" cy="14" rx="40" ry="14" fill="#fff" opacity=".13"/></g>`+
 `<path d="${sh}" fill="none" stroke="${D}" stroke-width="6" stroke-linejoin="round"/><path d="${sh}" fill="none" stroke="${trim}" stroke-width="2.6" stroke-linejoin="round" transform="translate(50 56) scale(.9) translate(-50 -56)"/>`+
 `<circle cx="50" cy="55" r="31" fill="${D}" opacity=".42"/><g transform="translate(50 55) scale(2.7) translate(-12 -12)" stroke="${D}" stroke-width=".9" stroke-linejoin="round" paint-order="stroke">${ic}</g></svg>`;
 return cache[k]=svg;
}
function crest(i,col){return'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(crestSVG(i,col))}
window.crestSVG=crestSVG;window.crest=crest;window.CREST_ICONS=TEAM_ICON;
})();
