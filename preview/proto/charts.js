/* ==========================================================================
   نمودارها — نمونهٔ زندهٔ جوما
   همهٔ اعداد از بک‌اند می‌آید؛ این فایل فقط «رسم» می‌کند.
   اندازهٔ هر SVG صریح است (قانون آیکون/نمودار: هیچ SVG بدون width/height).
   ========================================================================== */
var _chid=0;
function _id(p){ _chid++; return p+'-'+_chid; }
function _n(v){ return (Math.round(v*10)/10); }

/* ---------- نمودار خطی/سطحی: روند خلق (۱ تا ۵) ---------- */
function chartLine(vals,opt){
  opt=opt||{};
  var w=opt.w||600,h=opt.h||180,pl=38,pr=16,pt=16,pb=28;
  var min=opt.min||1,max=opt.max||5;
  var gid=_id('lg'),aid=_id('la');
  var iw=w-pl-pr, ih=h-pt-pb, n=vals.length;
  var X=function(i){ return pl+(n===1?iw/2:iw*i/(n-1)); };
  var Y=function(v){ return pt+ih-(v-min)/(max-min)*ih; };
  var line=vals.map(function(v,i){ return _n(X(i))+','+_n(Y(v)); }).join(' ');
  var area=pl+','+_n(pt+ih)+' '+line+' '+_n(pl+iw)+','+_n(pt+ih);
  var grid='';
  for(var g=min;g<=max;g++){
    grid+='<line class="ch-grid" x1="'+pl+'" y1="'+_n(Y(g))+'" x2="'+_n(pl+iw)+'" y2="'+_n(Y(g))+'"/>'+
      '<text class="ch-yt" x="'+(pl-8)+'" y="'+_n(Y(g)+3.5)+'">'+fa(g)+'</text>';
  }
  var dots=vals.map(function(v,i){
    var last=(i===n-1);
    return '<circle class="ch-dot'+(last?' last':'')+'" cx="'+_n(X(i))+'" cy="'+_n(Y(v))+'" r="'+(last?5:3.1)+'"/>';
  }).join('');
  var xl=(opt.xlabels||[]).map(function(s,i){
    if(i%2!==0 && i!==n-1) return '';
    return '<text class="ch-xt" x="'+_n(X(i))+'" y="'+(h-8)+'">'+s+'</text>';
  }).join('');
  var last=vals[n-1], lx=_n(X(n-1)), ly=_n(Y(last));
  var tag='<g class="ch-tag"><rect x="'+_n(Math.max(pl,lx-46))+'" y="'+_n(Math.max(2,ly-30))+'" width="58" height="20" rx="10"/>'+
    '<text x="'+_n(Math.max(pl,lx-46)+29)+'" y="'+_n(Math.max(2,ly-30)+14)+'">'+fa(_n(last))+'</text></g>';
  /* 🔴 قانون ۹۹-handoff §۱ و ۱۶ §۱۴: فرانت هیچ میانگینی نمی‌سازد؛ خط میانگین فقط
     وقتی رسم می‌شود که بک‌اند عددش را داده باشد (opt.avg)، نه با محاسبهٔ فرانت. */
  var avg=(typeof opt.avg==='number')?opt.avg:null;
  var avgLine=(avg==null)?'' : '<line class="ch-avg" x1="'+pl+'" y1="'+_n(Y(avg))+'" x2="'+_n(pl+iw)+'" y2="'+_n(Y(avg))+'/>'+
    '<text class="ch-avgt" x="'+(pl+3)+'" y="'+_n(Y(avg)-6)+'">میانگین '+fa(_n(avg))+'</text>';
  return '<svg class="chart" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" '+
    'aria-label="'+(opt.aria||'نمودار روند')+'" style="width:100%;height:auto;display:block">'+
    '<defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="0" y2="1">'+
      '<stop offset="0" stop-color="var(--brand)" stop-opacity=".34"/>'+
      '<stop offset="1" stop-color="var(--brand)" stop-opacity="0"/></linearGradient>'+
      '<linearGradient id="'+aid+'" x1="0" y1="0" x2="1" y2="0">'+
      '<stop offset="0" stop-color="var(--brand)"/><stop offset="1" stop-color="var(--sky)"/></linearGradient></defs>'+
    grid+
    '<polygon points="'+area+'" fill="url(#'+gid+')"/>'+
    '<polyline points="'+line+'" fill="none" stroke="url(#'+aid+')" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>'+
    dots+tag+xl+avgLine+
  '</svg>';
}

/* ---------- نمودار ستونی دو سری: برنامه‌ریزی‌شده در برابر انجام‌شده ---------- */
function chartBars(rows,opt){
  opt=opt||{};
  var w=opt.w||600,h=opt.h||200,pl=34,pr=12,pt=22,pb=34;
  var iw=w-pl-pr, ih=h-pt-pb, gw=iw/rows.length;
  var bars='',labels='',vals='';
  rows.forEach(function(r,i){
    var x0=pl+gw*i, bw=Math.min(22,(gw-16)/2);
    var pctP=r[2],pctD=r[1];
    var hP=ih*pctP/100, hD=ih*pctD/100;
    bars+='<rect class="ch-bp" x="'+_n(x0+gw/2-bw-2)+'" y="'+_n(pt+ih-hP)+'" width="'+bw+'" height="'+_n(hP)+'" rx="6"/>';
    bars+='<rect class="ch-bd" x="'+_n(x0+gw/2+2)+'" y="'+_n(pt+ih-hD)+'" width="'+bw+'" height="'+_n(hD)+'" rx="6"/>';
    vals+='<text class="ch-bv" x="'+_n(x0+gw/2+2+bw/2)+'" y="'+_n(pt+ih-hD-6)+'">٪'+fa(pctD)+'</text>';
    labels+='<text class="ch-xt" x="'+_n(x0+gw/2)+'" y="'+(h-12)+'">'+r[0]+'</text>';
  });
  var grid='';
  [0,25,50,75,100].forEach(function(p){
    var y=pt+ih-ih*p/100;
    grid+='<line class="ch-grid" x1="'+pl+'" y1="'+_n(y)+'" x2="'+_n(pl+iw)+'" y2="'+_n(y)+'"/>'+
      '<text class="ch-yt" x="'+(pl-7)+'" y="'+_n(y+3.5)+'">٪'+fa(p)+'</text>';
  });
  return '<svg class="chart" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" '+
    'aria-label="'+(opt.aria||'نمودار ستونی')+'" style="width:100%;height:auto;display:block">'+
    grid+bars+labels+vals+'</svg>';
}

/* ---------- نمودار دونات: سهم فعالیت‌ها ---------- */
function chartDonut(parts,opt){
  opt=opt||{};
  var s=opt.s||196, r=74, sw=26, C=2*Math.PI*r, acc=0;
  var arcs=parts.map(function(p){
    var frac=p[1]/100, len=C*frac;
    var seg='<circle class="ch-arc" cx="'+(s/2)+'" cy="'+(s/2)+'" r="'+r+'" stroke="'+p[2]+'" '+
      'stroke-dasharray="'+_n(len)+' '+_n(C-len)+'" stroke-dashoffset="'+_n(-acc*C)+'" transform="rotate(-90 '+(s/2)+' '+(s/2)+')"/>';
    acc+=frac; return seg;
  }).join('');
  var legend=parts.map(function(p){
    return '<span class="ch-lg"><i style="background:'+p[2]+'"></i>'+p[0]+' <b class="num">٪'+fa(p[1])+'</b></span>';
  }).join('');
  return '<div class="ch-donut">'+
    '<svg class="chart donut" width="'+s+'" height="'+s+'" viewBox="0 0 '+s+' '+s+'" role="img" aria-label="'+(opt.aria||'نمودار سهم')+'">'+
      '<circle class="ch-track" cx="'+(s/2)+'" cy="'+(s/2)+'" r="'+r+'" stroke-width="'+sw+'"/>'+
      '<g stroke-width="'+sw+'" fill="none" stroke-linecap="butt">'+arcs+'</g>'+
      '<text class="ch-dc" x="'+(s/2)+'" y="'+_n(s/2-2)+'">'+(opt.centerTop||'')+'</text>'+
      '<text class="ch-dcs" x="'+(s/2)+'" y="'+_n(s/2+18)+'">'+(opt.centerSub||'')+'</text>'+
    '</svg><div class="ch-legend">'+legend+'</div></div>';
}

/* ---------- نقشهٔ حرارتی: کدام روزها ثبت شده ---------- */
function chartHeat(vals,opt){
  opt=opt||{};
  var cw=34, chh=30, gap=7, cols=7, rows=Math.ceil(vals.length/cols);
  var w=cols*cw+(cols-1)*gap, h=rows*chh+(rows-1)*gap+22;
  var cells='',head='';
  (opt.dow||['ش','ی','د','س','چ','پ','ج']).forEach(function(d,i){
    head+='<text class="ch-xt" x="'+_n(i*(cw+gap)+cw/2)+'" y="11">'+d+'</text>';
  });
  vals.forEach(function(v,i){
    var c=i%cols, r2=Math.floor(i/cols);
    cells+='<rect class="ch-h'+v+'" x="'+_n(c*(cw+gap))+'" y="'+_n(22+r2*(chh+gap))+'" width="'+cw+'" height="'+chh+'" rx="9"/>';
  });
  return '<svg class="chart heat" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+(opt.aria||'نقشهٔ ثبت روزها')+'">'+head+cells+'</svg>';
}

/* ---------- پراکندگی: خواب در برابر حال (همبستگی) ---------- */
function chartScatter(pairs,opt){
  opt=opt||{};
  var w=opt.w||420,h=opt.h||210,pl=36,pr=14,pt=14,pb=30;
  var iw=w-pl-pr, ih=h-pt-pb;
  var min=opt.min||1,max=opt.max||5;
  var X=function(v){ return pl+iw*(v-min)/(max-min); };
  var Y=function(v){ return pt+ih-ih*(v-min)/(max-min); };
  var n=pairs.length, sx=0,sy=0,sxx=0,sxy=0;
  pairs.forEach(function(p){ sx+=p[0]; sy+=p[1]; sxx+=p[0]*p[0]; sxy+=p[0]*p[1]; });
  var slope=(n*sxy-sx*sy)/(n*sxx-sx*sx||1), inter=(sy-slope*sx)/n;
  var line='<line class="ch-trend" x1="'+_n(X(min))+'" y1="'+_n(Y(inter+slope*min))+'" x2="'+_n(X(max))+'" y2="'+_n(Y(inter+slope*max))+'"/>';
  var pts=pairs.map(function(p){
    return '<circle class="ch-pt" cx="'+_n(X(p[0]))+'" cy="'+_n(Y(p[1]))+'" r="4.6"/>';
  }).join('');
  var grid='';
  for(var g=min;g<=max;g++){
    grid+='<line class="ch-grid" x1="'+pl+'" y1="'+_n(Y(g))+'" x2="'+_n(pl+iw)+'" y2="'+_n(Y(g))+'"/>'+
      '<line class="ch-grid" x1="'+_n(X(g))+'" y1="'+pt+'" x2="'+_n(X(g))+'" y2="'+_n(pt+ih)+'"/>'+
      '<text class="ch-yt" x="'+(pl-7)+'" y="'+_n(Y(g)+3.5)+'">'+fa(g)+'</text>';
  }
  return '<svg class="chart" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" '+
    'aria-label="'+(opt.aria||'نمودار پراکندگی خواب و حال')+'" style="width:100%;height:auto;display:block">'+
    grid+line+pts+
    '<text class="ch-xt" x="'+_n(pl+iw/2)+'" y="'+(h-6)+'">'+(opt.xlabel||'')+'</text>'+
    '<text class="ch-yt" x="'+_n(pl+2)+'" y="'+_n(pt-8)+'">'+(opt.ylabel||'')+'</text></svg>';
}

/* ---------- جرقه: خط کوچک داخل کارت شاخص ---------- */
function chartSpark(vals,color){
  var w=118,h=34,n=vals.length,mi=Math.min.apply(null,vals),ma=Math.max.apply(null,vals);
  var X=function(i){ return 2+(w-4)*i/(n-1); };
  var Y=function(v){ return h-4-(h-8)*(ma===mi?.5:(v-mi)/(ma-mi)); };
  var line=vals.map(function(v,i){ return _n(X(i))+','+_n(Y(v)); }).join(' ');
  var area='2,'+(h-2)+' '+line+' '+(w-2)+','+(h-2);
  var gid=_id('sg');
  return '<svg class="spark" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" aria-hidden="true" style="width:100%;height:auto;display:block">'+
    '<defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="'+(color||'var(--brand)')+'" stop-opacity=".32"/>'+
    '<stop offset="1" stop-color="'+(color||'var(--brand)')+'" stop-opacity="0"/></linearGradient></defs>'+
    '<polygon points="'+area+'" fill="url(#'+gid+')"/>'+
    '<polyline points="'+line+'" fill="none" stroke="'+(color||'var(--brand)')+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/* ---------- میله‌های افقی: تحقق هر فعالیت (HTML، بدون SVG) ---------- */
function hbars(rows){
  return '<div class="hbars">'+rows.map(function(r){
    return '<div class="hb"><div class="hb-top"><b>'+r[0]+'</b>'+
      '<span class="tiny">'+r[2]+'</span></div>'+
      '<div class="hb-track"><i style="width:'+r[1]+'%;background:'+(r[3]||'var(--brand)')+'"></i>'+
      '<span class="hb-mark" style="inset-inline-start:100%"></span></div>'+
      '<div class="hb-foot tiny">٪'+fa(r[1])+' از هدف</div></div>';
  }).join('')+'</div>';
}
