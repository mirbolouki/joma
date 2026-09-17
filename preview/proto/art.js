/* ==========================================================================
   لیوان آب — یک لیوان شیشه‌ای واقعی، با آبِ موج‌دار داخل خودش
   ساختار: بدنهٔ شیب‌دار + لبهٔ بیضی + برق شیشه + ته ضخیم + سایه
   ========================================================================== */

/* سطح آب: دو موجِ سینوسی، با دورهٔ ۲۰ و دامنهٔ متفاوت */
function waveD(amp,phase){
  var y=(20.8+(phase||0)).toFixed(1), d='M-70 '+y, x=-70;
  while(x<70){ d+=' q5 -'+amp+' 10 0 t10 0'; x+=20; }
  return d+' V62 H-70 Z';
}

function glassSVG(i,filled){
  var id='gw'+i;
  var ty=filled?0:40;   /* ارتفاع آب در حالت پر، ۹px زیر لبه — فاصلهٔ هوا */
  return '<svg class="glasssvg" viewBox="0 0 40 66" role="img" aria-hidden="true">'+
    '<defs>'+
      '<clipPath id="gc'+i+'"><path d="M5.1 11.6 L8.1 51.8 Q8.7 56.6 13.7 56.6 H26.3 '+
        'Q31.3 56.6 31.9 51.8 L34.9 11.6 Q20 14.8 5.1 11.6 Z"/></clipPath>'+
      '<linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1">'+
        '<stop offset="0" class="gs-top"/><stop offset=".45" class="gs-mid"/><stop offset="1" class="gs-bot"/>'+
      '</linearGradient>'+
      '<linearGradient id="gg'+i+'" x1="0" y1="0" x2="0" y2="1">'+
        '<stop offset="0" class="gg-top"/><stop offset="1" class="gg-bot"/>'+
      '</linearGradient>'+
    '</defs>'+

    /* سایه روی میز */
    '<ellipse class="gsh" cx="20" cy="61" rx="14.5" ry="2.6"/>'+

    /* بدنهٔ شیشه — گرادینت ملایم شیشه، پشت آب */
    '<path class="gbod" d="M4.2 11 L7.2 51.4 Q7.8 57.8 13.4 57.8 H26.6 Q32.2 57.8 32.8 51.4 '+
      'L35.8 11 Q20 14.6 4.2 11 Z" fill="url(#'+'gg'+i+')"/>'+

    /* آب — بریده‌شده داخل شکل لیوان */
    '<g clip-path="url(#'+'gc'+i+')">'+
      '<g class="gwater" style="transform:translateY('+ty+'px)">'+
        '<rect x="-10" y="21.4" width="60" height="42" fill="url(#'+'id'+')"/>'+
        '<rect x="-10" y="20.6" width="60" height="2.8" class="gsurf"/>'+
        /* دو موجِ سینوسی روی سطح */
        '<path class="wv" d="'+waveD('3.0',0)+'"/>'+
        '<path class="wv b" d="'+waveD('2.2',1.2)+'"/>'+
        /* بیضیِ سطح آب — چیزی که «مایع» را مایع نشان می‌دهد */
        '<ellipse class="gwlin" cx="20" cy="20.8" rx="13.1" ry="2.4"/>'+
        '<ellipse class="gwlsh" cx="14.5" cy="20.2" rx="5.6" ry="1.1"/>'+
        /* برقِ لرزانِ روی سطح */
        '<path class="gcaustic" d="M11.5 27 q5 2.2 9 0 M22.5 30.5 q4 1.8 7 0 M13 35 q4.5 1.8 8 0"/>'+
        /* حباب‌ها */
        '<circle class="gbub" cx="14" cy="52" r="1"/><circle class="gbub b2" cx="25" cy="54" r=".8"/>'+
        '<circle class="gbub b3" cx="19" cy="50" r="1.2"/>'+
      '</g>'+
      /* جریان و قطره — داخل لیوان دیده می‌شوند */
      '<rect class="gstream" x="19.1" y="3" width="1.8" height="30" rx=".9"/>'+
      '<ellipse class="gdrop" cx="20" cy="6" rx="1.6" ry="2.1"/>'+
    '</g>'+

    /* خط شیشه — روی آب */
    '<path class="gline" d="M4.2 11 L7.2 51.4 Q7.8 57.8 13.4 57.8 H26.6 Q32.2 57.8 32.8 51.4 '+
      'L35.8 11 Q20 14.6 4.2 11 Z"/>'+
    /* لبه — دو بیضی روی هم: حس ضخامت شیشه */
    '<ellipse class="grim" cx="20" cy="11" rx="15.5" ry="3.5"/>'+
    '<ellipse class="grim2" cx="20" cy="11" rx="13.6" ry="2.6"/>'+
    /* ته ضخیم */
    '<ellipse class="gbase" cx="20" cy="55.6" rx="11.6" ry="2.5"/>'+
    /* برق شیشه */
    '<path class="gleam" d="M11.6 16 Q10.4 33 10.8 47"/>'+
    '<path class="gleam2" d="M29.4 17.5 Q30.2 31 29.8 43"/>'+
    '<ellipse class="gshine" cx="14.5" cy="14.6" rx="4.6" ry="1.3"/>'+
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
