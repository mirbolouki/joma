/* ==========================================================================
   لیوان آب — یک لیوان شیشه‌ای واقعی، با آبِ موج‌دار داخل خودش
   ساختار: بدنهٔ شیب‌دار + لبهٔ بیضی + برق شیشه + ته ضخیم + سایه
   ========================================================================== */

/* سطح آب: دو موجِ سینوسی، با دورهٔ ۲۰ و دامنهٔ متفاوت */
function waveD(amp,phase,y0){
  var y=((y0||20.4)+(phase||0)).toFixed(1), d='M-70 '+y, x=-70;
  while(x<70){ d+=' q5 -'+amp+' 10 0 t10 0'; x+=20; }
  return d+' V64 H-70 Z';
}

/* ============================================================
   لیوان — تامبلر شیشه‌ای (مرجع: تصویر مالک)
   دهانهٔ بیضی · بدنهٔ تقریباً راست با شیب ملایم · ته ضخیم
   آب داخل حفرهٔ داخلی بریده می‌شود؛ دیوارهٔ شیشه دورش دیده می‌شود.
   ============================================================ */
var GL_TOP=5.4, GL_BOT=50.0;          /* لبه و کف خارجی — بلندتر، مثل تامبلر */
var GL_HW_TOP=16.6, GL_HW_BOT=15.6;   /* نیم‌عرض بیرونی — شیب ملایم، نه کاپ */
var GL_IHW_TOP=14.9, GL_IHW_BOT=14.0; /* نیم‌عرض حفرهٔ داخلی */
var GL_CX=22;

/* نیم‌عرض حفره در ارتفاع y — برای هم‌اندازه بودن سطح آب با لیوان */
function cavHW(y){
  var k=(y-GL_TOP)/(GL_BOT-GL_TOP);
  return GL_IHW_TOP-(GL_IHW_TOP-GL_IHW_BOT)*k;
}
function cavPath(){
  return 'M'+(GL_CX-GL_IHW_TOP)+' '+GL_TOP+
    ' L'+(GL_CX-GL_IHW_BOT+0.6)+' '+(GL_BOT-2.2)+
    ' Q'+(GL_CX-GL_IHW_BOT)+' '+GL_BOT+' '+(GL_CX-GL_IHW_BOT+3.4)+' '+GL_BOT+
    ' H'+(GL_CX+GL_IHW_BOT-3.4)+
    ' Q'+(GL_CX+GL_IHW_BOT)+' '+GL_BOT+' '+(GL_CX+GL_IHW_BOT-0.6)+' '+(GL_BOT-2.2)+
    ' L'+(GL_CX+GL_IHW_TOP)+' '+GL_TOP+
    /* برگشت روی خط لبهٔ جلویی — کمان بیضی داخلی */
    ' A'+GL_IHW_TOP+' 3.1 0 0 1 '+(GL_CX-GL_IHW_TOP)+' '+GL_TOP+' Z';
}
function bodyPath(){
  return 'M'+(GL_CX-GL_HW_TOP)+' '+GL_TOP+
    ' L'+(GL_CX-GL_HW_BOT)+' '+(GL_BOT-2.6)+
    ' Q'+(GL_CX-GL_HW_BOT)+' '+(GL_BOT+1.2)+' '+(GL_CX-GL_HW_BOT+3.8)+' '+(GL_BOT+1.2)+
    ' H'+(GL_CX+GL_HW_BOT-3.8)+
    ' Q'+(GL_CX+GL_HW_BOT)+' '+(GL_BOT+1.2)+' '+(GL_CX+GL_HW_BOT)+' '+(GL_BOT-2.6)+
    ' L'+(GL_CX+GL_HW_TOP)+' '+GL_TOP+
    ' A'+GL_HW_TOP+' 3.6 0 0 1 '+(GL_CX-GL_HW_TOP)+' '+GL_TOP+' Z';
}

function glassSVG(i,filled){
  var id='gw'+i, W=44, H=58;
  var SURF=18.6;                    /* سطح آبِ پر — ۱۳٫۲px زیر لبه */
  var ty=filled?0:32;
  var rxSurf=cavHW(SURF).toFixed(2);
  var cav=cavPath(), body=bodyPath();

  return '<svg class="glasssvg" viewBox="0 0 '+W+' '+H+'" role="img" aria-hidden="true">'+
    '<defs>'+
      '<clipPath id="gc'+i+'"><path d="'+cav+'"/></clipPath>'+
      '<linearGradient id="gwm'+i+'" x1="0" y1="0" x2="0" y2="1">'+
        '<stop offset="0" class="gs-top"/><stop offset=".42" class="gs-mid"/><stop offset="1" class="gs-bot"/>'+
      '</linearGradient>'+
      '<linearGradient id="ggl'+i+'" x1="0" y1="0" x2="1" y2="0">'+
        '<stop offset="0" class="gw-a"/><stop offset=".14" class="gw-b"/>'+
        '<stop offset=".5" class="gw-a"/><stop offset=".88" class="gw-b"/>'+
        '<stop offset="1" class="gw-a"/>'+
      '</linearGradient>'+
    '</defs>'+

    '<ellipse class="gsh" cx="'+GL_CX+'" cy="'+(GL_BOT+3.6)+'" rx="'+GL_HW_BOT+'" ry="2.6"/>'+

    /* شیشه */
    '<path class="gbody" d="'+body+'" fill="url(#ggl'+i+')"/>'+
    /* حفرهٔ داخلی — همیشه کمی سرد و شیشه‌ای */
    '<path d="'+cav+'" class="ginner"/>'+

    /* آب — داخل حفرهٔ داخلی */
    '<g clip-path="url(#gc'+i+')">'+
      '<g class="gwater" style="transform:translateY('+ty+'px)">'+
        '<rect x="-8" y="'+(SURF+1.4)+'" width="60" height="50" fill="url(#gwm'+i+')"/>'+
        '<path class="wv" d="'+waveD('2.4',0,SURF)+'"/>'+
        '<path class="wv b" d="'+waveD('1.7',1.2,SURF)+'"/>'+
        '<ellipse class="gwlin" cx="'+GL_CX+'" cy="'+SURF+'" rx="'+rxSurf+'" ry="2.2"/>'+
        '<ellipse class="gwlsh" cx="'+(GL_CX-6)+'" cy="'+(SURF-0.7)+'" rx="5.4" ry="1"/>'+
        '<path class="gcaustic" d="M14 27 q5 2.2 9 0 M25 31 q4.5 1.8 8 0"/>'+
        '<circle class="gbub" cx="16" cy="42" r="1"/><circle class="gbub b2" cx="27" cy="44" r=".8"/>'+
        '<circle class="gbub b3" cx="21" cy="40" r="1.2"/>'+
      '</g>'+
      '<rect class="gstream" x="21.1" y="1" width="1.8" height="26" rx=".9"/>'+
      '<ellipse class="gdrop" cx="'+GL_CX+'" cy="4" rx="1.6" ry="2.1"/>'+
    '</g>'+

    /* لبه — دو بیضی نازک، نه حلقهٔ ضخیم */
    '<ellipse class="grim" cx="'+GL_CX+'" cy="'+GL_TOP+'" rx="'+GL_HW_TOP+'" ry="3.5"/>'+
    '<ellipse class="grim2" cx="'+GL_CX+'" cy="'+GL_TOP+'" rx="'+GL_IHW_TOP+'" ry="2.9"/>'+
    /* ته ضخیم */
    '<ellipse class="gbase" cx="'+GL_CX+'" cy="'+(GL_BOT-1.4)+'" rx="'+(GL_HW_BOT-2.2)+'" ry="2.8"/>'+
    /* برق دیواره — نازک */
    '<path class="gleam" d="M11.4 14 Q10.9 30 12.2 42"/>'+
    '<path class="gleam2" d="M32.4 15 Q33.1 29 32.2 40"/>'+
    '<ellipse class="gshine" cx="15.6" cy="6.3" rx="4.8" ry="1.2"/>'+
  '</svg>';
}

/* ---------- جوجهٔ جوما — جوجهٔ جغد، انتخاب مالک: بدنِ گردِ یکپارچه ----------
   رنگ و فرم از خانوادهٔ جغدِ ۷B: آبی #5E93C8 · شکم کرم #F6EBD9 · حلقهٔ طلایی دور چشم.
   سه مرحلهٔ تخم/ترک/جوجه، و حالت‌های ok · happy · tired · pale · gray.
   ============================================================ */
var CH={a:'#5E93C8', b:'#3F6FA0', cream:'#F6EBD9', gold:'#E8B64A', beak:'#F0A63C',
        ink:'#2E3A48', rose:'#E07898', line:'#E7D9C2', foot:'#F0A63C'};
var CH_PALE={a:'#A9C6E0', b:'#8FA9C4', cream:'#F4EFE4', gold:'#E3C98A', beak:'#E3B478',
             ink:'#5C6B79', rose:'#E3AFC0', line:'#E7DCC8', foot:'#E3B478'};
var CH_GRAY={a:'#ADB8C2', b:'#94A1AC', cream:'#EFEAE2', gold:'#C9C2B4', beak:'#C0B6A4',
             ink:'#5A6570', rose:'#C9B6BC', line:'#DDD6CB', foot:'#C0B6A4'};

function chTufts(p){return '<path d="M22 48 C25 28 34 16 50 12 C46 27 47 39 51 50 Z" fill="'+p.b+'"/>'+
  '<path d="M98 48 C95 28 86 16 70 12 C74 27 73 39 69 50 Z" fill="'+p.b+'"/>';}
function chWings(p){return '<ellipse cx="25" cy="88" rx="8.5" ry="19" transform="rotate(9 25 88)" fill="'+p.b+'"/>'+
  '<ellipse cx="95" cy="88" rx="8.5" ry="19" transform="rotate(-9 95 88)" fill="'+p.b+'"/>';}
function chBelly(p){return '<ellipse cx="60" cy="90" rx="27" ry="24" fill="'+p.cream+'"/>'+
  '<path d="M34 74 q6.5 6 13 0 q6.5 6 13 0 q6.5 6 13 0 q6.5 6 13 0" fill="none" stroke="'+p.line+'" stroke-width="1.6"/>';}
function chCheeks(p){return '<ellipse cx="29" cy="73" rx="6" ry="3.6" fill="'+p.rose+'" opacity=".5"/>'+
  '<ellipse cx="91" cy="73" rx="6" ry="3.6" fill="'+p.rose+'" opacity=".5"/>';}
function chBeak(p,openMouth){
  if(openMouth) return '<path d="M53 69 Q60 65 67 69 Q64.5 78 60 80 Q55.5 78 53 69 Z" fill="'+p.beak+'"/>'+
    '<path d="M55 79 Q60 84 65 79 Q62 86 60 86.5 Q58 86 55 79 Z" fill="'+p.beak+'" opacity=".75"/>';
  return '<path d="M54 70 Q60 66 66 70 Q63.5 78 60 79.5 Q56.5 78 54 70 Z" fill="'+p.beak+'"/>';
}
function chFeet(p){return '<path d="M50 117 q3.5 5.5 7 0 M63 117 q3.5 5.5 7 0" fill="none" stroke="'+p.foot+'" stroke-width="3.4" stroke-linecap="round"/>';}
function chEyes(p,state){
  if(state==='closed') return '<path d="M34 60 q11 9 22 0" fill="none" stroke="'+p.ink+'" stroke-width="3.2" stroke-linecap="round"/>'+
    '<path d="M64 60 q11 9 22 0" fill="none" stroke="'+p.ink+'" stroke-width="3.2" stroke-linecap="round"/>';
  if(state==='happy') return '<path d="M34 62 q11 -12 22 0" fill="none" stroke="'+p.ink+'" stroke-width="3.4" stroke-linecap="round"/>'+
    '<path d="M64 62 q11 -12 22 0" fill="none" stroke="'+p.ink+'" stroke-width="3.4" stroke-linecap="round"/>';
  return '<circle cx="45" cy="60" r="17" fill="none" stroke="'+p.gold+'" stroke-width="2.8"/>'+
    '<circle cx="75" cy="60" r="17" fill="none" stroke="'+p.gold+'" stroke-width="2.8"/>'+
    '<circle cx="45" cy="60" r="12.6" fill="'+p.ink+'"/><circle cx="75" cy="60" r="12.6" fill="'+p.ink+'"/>'+
    '<circle cx="49.5" cy="55" r="4.6" fill="#fff"/><circle cx="79.5" cy="55" r="4.6" fill="#fff"/>'+
    '<circle cx="41.5" cy="65" r="1.9" fill="#fff" opacity=".85"/><circle cx="71.5" cy="65" r="1.9" fill="#fff" opacity=".85"/>';
}
/* عینک جغد — امضای هویت: دو حلقهٔ طلایی، پلِ بینی، دسته‌ها (همان فرم جغد ۷B) */
function chGlasses(p,happy){
  /* امضای جوجهٔ جغد: عینک طلایی همیشه روی صورت است — در همهٔ شش حالت.
     در «شاد»، چشم‌ها کمانی‌اند؛ عینک کمی بزرگ‌تر و بالاتر می‌رود تا تلاقی نکند. */
  var g=p.gold;
  var inner=
    '<circle cx="45" cy="60" r="17" fill="none" stroke="'+g+'" stroke-width="2.8"/>'+
    '<circle cx="75" cy="60" r="17" fill="none" stroke="'+g+'" stroke-width="2.8"/>'+
    '<path d="M62 55.5 Q60 52.5 58 55.5" fill="none" stroke="'+g+'" stroke-width="2.6" stroke-linecap="round"/>'+
    '<path d="M28 57 q-8 -3 -13 -8" fill="none" stroke="'+g+'" stroke-width="2.4" stroke-linecap="round"/>'+
    '<path d="M92 57 q8 -3 13 -8" fill="none" stroke="'+g+'" stroke-width="2.4" stroke-linecap="round"/>';
  return '<g class="chglasses">'+
    (happy?'<g transform="translate(-4.8,-4.4) scale(1.08)">'+inner+'</g>':inner)+
  '</g>';
}
function chBrows(p){return '<path d="M30 46 q10 -7 20 -1 M90 46 q-10 -7 -20 -1" fill="none" stroke="'+p.gold+'" stroke-width="2.6" stroke-linecap="round"/>';}
function chSpark(p){return '<g class="chspark">'+
  '<path d="M101 24 l3 3 M111 32 l3 -3 M97 40 l4 1" stroke="'+p.gold+'" stroke-width="2.4" stroke-linecap="round"/>'+
  '<circle cx="17" cy="34" r="2.4" fill="'+p.gold+'" opacity=".8"/><circle cx="112" cy="18" r="2" fill="'+p.b+'" opacity=".6"/></g>';}
function chEgg(p, cracked){
  var e='<ellipse cx="60" cy="72" rx="30" ry="37" fill="#FFF7EA" stroke="#E5D5B4" stroke-width="2.5"/>'+
    '<ellipse cx="49" cy="58" rx="6" ry="10" fill="#fff" opacity=".85" transform="rotate(-22 49 58)"/>'+
    '<circle cx="55" cy="88" r="2.4" fill="#EFE0C6"/><circle cx="68" cy="76" r="1.8" fill="#EFE0C6"/>'+
    '<circle cx="50" cy="98" r="1.6" fill="#EFE0C6"/>';
  if(cracked) e+='<path d="M38 62 l7 6 -5 6 8 5 -4 7" fill="none" stroke="#C9B387" stroke-width="2.4" stroke-linecap="round"/>'+
    '<path d="M66 74 l6 -5 4 6 6 -4" fill="none" stroke="#C9B387" stroke-width="2.2" stroke-linecap="round"/>';
  return e;
}

/* چتر بیرونی: اندازه و نسبت ۱۲۰×۱۳۲ */
function chickSVG(size, stage, mood){
  stage=stage||'chick'; mood=mood||'ok';
  var p=CH;
  if(mood==='tired'||stage==='calm') p=CH_PALE;
  if(stage==='miss') p=CH_GRAY;

  var h=Math.round(size*1.1), inner, cls='';
  if(stage==='egg'){ inner=chEgg(p,false); cls='floaty'; }
  else if(stage==='crack'){ inner=chEgg(p,true); cls='wiggle'; }
  else {
    var eye=(mood==='happy')?'happy':((mood==='tired'||mood==='sleep'||stage==='calm'||stage==='miss')?'closed':'open');
    if(mood==='pet') eye='open';   /* نوازش: چشم باز و لپ‌های صورتی، بی‌پاداش */
    var closed=(eye==='closed');
    inner = chTufts(p)+
      '<path d="M60 18 C88 18 100 44 100 72 C100 102 84 118 60 118 C36 118 20 102 20 72 C20 44 32 18 60 18 Z" fill="'+p.a+'"/>'+
      chBelly(p)+chWings(p)+
      '<g class="ch-eyes">'+chEyes(p,eye)+'</g>'+
      '<g class="ch-lids">'+chEyes(p,'closed')+'</g>'+
      chGlasses(p, eye==='happy')+
      (mood==='happy'?chCheeks(p):'') +
      chBeak(p, mood==='happy')+chFeet(p)+
      (mood==='happy'?chSpark(p):'')+
      (mood==='sleep'?'<g class="ch-zz"><text x="100" y="36" font-size="15" font-weight="800" fill="'+p.b+'" font-family="sans-serif">z</text>'+
        '<text x="109" y="23" font-size="10" font-weight="800" fill="'+p.b+'" font-family="sans-serif">z</text></g>':'');
    cls = mood==='happy'?'chhappy':(mood==='sleep'?'chsleep':(mood==='pet'?'chpet':((mood==='tired'||stage==='calm'||stage==='miss')?'chcalm':'floaty')));
  }
  return '<svg class="chsvg '+(cls||'')+'" width="'+size+'" height="'+h+'" viewBox="0 0 120 132" aria-hidden="true">'+
    '<ellipse cx="60" cy="124" rx="30" ry="4" fill="rgba(20,56,46,.10)"/>'+inner+'</svg>';
}

/* ---------- نمایهٔ بصری گزینه‌های حال (سند ۱۳ §۳) ----------
   هر گزینه، تصویر خودش را دارد — نه فقط واژه.                        */
var OPT_CLR=['#F4716D','#F59E2D','#EDB93B','#8BC34A','#34B378'];

function optArt(k,l){
  if(l===undefined||l===null) l=0;

  if(k==='mood')
    return '<span style="font-size:23px;line-height:1">'+['😖','🙁','😐','🙂','😄'][l]+'</span>';

  if(k==='energy'){          /* باتری — پرشدگی و رنگ، مطابق سطح */
    var seg='';
    for(var i=0;i<5;i++)
      seg+='<rect x="'+(6+i*11)+'" y="9" width="8" height="18" rx="2" '+
        'fill="'+(i<=l?OPT_CLR[l]:'rgba(0,0,0,.08)')+'"/>';
    return '<svg width="66" height="36" viewBox="0 0 66 36" aria-hidden="true">'+
      '<rect x="1" y="3" width="57" height="30" rx="7" fill="none" stroke="currentColor" stroke-width="2.4" opacity=".35"/>'+
      '<rect x="60" y="13" width="5" height="10" rx="2" fill="currentColor" opacity=".35"/>'+seg+'</svg>';
  }

  if(k==='focus'){           /* حلقه‌های هدف — حلقه‌ها با سطح پر می‌شوند */
    var rings='';
    for(var j=0;j<5;j++)
      rings+='<circle cx="20" cy="20" r="'+(17-j*3.1)+'" fill="none" '+
        'stroke="'+(j<=l?OPT_CLR[l]:'rgba(0,0,0,.10)')+'" stroke-width="2.4"/>';
    return '<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">'+rings+'</svg>';
  }

  if(k==='sleep'){           /* ماه + ستاره‌ها */
    var stars='';
    for(var s=0;s<5;s++)
      stars+='<path d="M'+(24+s*9)+' 8l2.6 5.2 5.6.8-4 3.9 1 5.6-5.2-2.7-5.2 2.7 1-5.6-4-3.9 5.6-.8Z" '+
        'fill="'+(s<=l?'#E8B64A':'rgba(0,0,0,.10)')+'"/>';
    return '<svg width="72" height="36" viewBox="0 0 72 36" aria-hidden="true">'+
      '<path d="M14 6a13 13 0 1 0 11 19A10.5 10.5 0 0 1 14 6Z" fill="#8B7CF6" opacity=".85"/>'+stars+'</svg>';
  }

  if(k==='stress'){          /* بادکنک — اندازه و رنگ با سطح */
    var r=5+l*2.4, col=['#3FA3DC','#3FA3DC','#EDB93B','#F2784B','#EE6D95'][l];
    return '<svg width="46" height="38" viewBox="0 0 46 38" aria-hidden="true">'+
      '<ellipse cx="23" cy="'+(17-r*0.15)+'" rx="'+(r+3)+'" ry="'+(r+3.4)+'" fill="'+col+'"/>'+
      '<path d="M23 '+(17+r*3.1)+' q4 6-1 10" fill="none" stroke="currentColor" opacity=".4" '+
      'stroke-width="2" stroke-linecap="round"/>'+
      (l>=3?'<path d="M'+(38)+' 6q5 3 0 7" fill="none" stroke="#F2784B" stroke-width="2.2" stroke-linecap="round"/>':'')+
      '</svg>';
  }
  return '';
}
