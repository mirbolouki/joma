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
var GL_TOP=7.2, GL_BOT=48.6;          /* لبه و کف خارجی */
var GL_HW_TOP=19.2, GL_HW_BOT=15.0;   /* نیم‌عرض بیرونی */
var GL_IHW_TOP=17.2, GL_IHW_BOT=13.2; /* نیم‌عرض حفرهٔ داخلی */
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
  var SURF=20.4;                    /* سطح آبِ پر — ۱۳px زیر لبه */
  var ty=filled?0:26;
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
    '<path d="'+body+'" fill="url(#ggl'+i+')"/>'+
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

/* ---------- جوجهٔ من — سه مرحله، از فایل مرجع A ---------- */
function chickSVG(size,stage,mood){
  stage=stage||'chick'; mood=mood||'ok';
  if(stage==='egg') return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 100 100" aria-hidden="true">'+
    '<ellipse cx="50" cy="88" rx="26" ry="7" fill="rgba(0,0,0,.10)"/>'+
    '<path d="M50 18 C68 18 78 42 78 60 C78 78 66 88 50 88 C34 88 22 78 22 60 C22 42 32 18 50 18Z" '+
    'fill="#FFF4E0" stroke="#EBD9BC" stroke-width="2"/>'+
    '<circle cx="42" cy="45" r="3" fill="#F2E2C8"/><circle cx="58" cy="60" r="4" fill="#F2E2C8"/></svg>';

  if(stage==='crack') return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 100 100" class="wiggle" aria-hidden="true">'+
    '<ellipse cx="50" cy="88" rx="26" ry="7" fill="rgba(0,0,0,.10)"/>'+
    '<path d="M50 18 C68 18 78 42 78 60 C78 78 66 88 50 88 C34 88 22 78 22 60 C22 42 32 18 50 18Z" '+
    'fill="#FFF4E0" stroke="#EBD9BC" stroke-width="2"/>'+
    '<path d="M38 40 l7 6 -5 6 8 5 -4 7" fill="none" stroke="#C9A96A" stroke-width="2.5" stroke-linecap="round"/>'+
    '<path d="M62 35 l-5 7 6 4" fill="none" stroke="#C9A96A" stroke-width="2.5" stroke-linecap="round"/></svg>';

  var eye = mood==='sad'
    ? '<path d="M38 46 q4 -4 8 0" stroke="#2A2118" stroke-width="3" fill="none" stroke-linecap="round"/>'+
      '<path d="M56 46 q4 -4 8 0" stroke="#2A2118" stroke-width="3" fill="none" stroke-linecap="round"/>'
    : '<g><circle cx="42" cy="46" r="5" fill="#2A2118"/><circle cx="44" cy="44" r="1.6" fill="#fff"/>'+
      '<circle cx="60" cy="46" r="5" fill="#2A2118"/><circle cx="62" cy="44" r="1.6" fill="#fff"/></g>';
  var extra = mood==='happy'
    ? '<path d="M20 30 l4 4 M28 22 l2 5 M78 26 l-4 4" stroke="#F5A32D" stroke-width="2.5" stroke-linecap="round"/>'+
      '<text x="79" y="24" font-size="13">🎵</text>'
    : '';

  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 100 100" '+
    'class="'+(mood==='happy'?'wiggle':'')+'" aria-hidden="true">'+
    '<ellipse cx="50" cy="90" rx="24" ry="6" fill="rgba(0,0,0,.10)"/>'+
    '<ellipse cx="50" cy="62" rx="27" ry="26" fill="#FFD84D"/>'+
    '<ellipse cx="50" cy="72" rx="16" ry="12" fill="#FFEDA8"/>'+
    '<ellipse cx="27" cy="62" rx="7" ry="12" fill="#F5C22B" transform="rotate(16 27 62)"/>'+
    '<ellipse cx="73" cy="62" rx="7" ry="12" fill="#F5C22B" transform="rotate(-16 73 62)"/>'+
    '<circle cx="51" cy="38" r="19" fill="#FFD84D"/>'+
    '<path d="M42 20 q3 -7 7 -1 q4 -6 7 1" fill="none" stroke="#F5A32D" stroke-width="3" stroke-linecap="round"/>'+
    eye + '<path d="M51 50 L56 55 L51 59 L46 55 Z" fill="#F58E2D"/>'+
    '<path d="M42 88 l-2 6 M46 89 l0 6 M56 89 l0 6 M60 88 l2 6" stroke="#F58E2D" stroke-width="2.6" stroke-linecap="round"/>'+
    extra+'</svg>';
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
