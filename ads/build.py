#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JOMA — Instagram Reels ad builder (energetic, fa voiceover)
Renders 1080x1920 @30fps frames from smart-cropped app screenshots,
encodes MP4 with voiceover, and builds a 6-slide 1080x1350 carousel.
"""
import os, sys, math, re, subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import arabic_reshaper
from bidi.algorithm import get_display

ROOT    = '/home/user/joma'
SHOTS   = '/tmp/render/shots'      # 3x upscaled screenshots
FRAMES  = '/tmp/render/frames'
OUT     = f'{ROOT}/ads'
CAR     = f'{OUT}/carousel'
FONTS   = f'{ROOT}/assets/fonts'
VO      = f'{OUT}/voiceover.mp3'

F_LA  = f'{FONTS}/Lalezar_400Regular.ttf'
F_BLK = f'{FONTS}/Vazirmatn_900Black.ttf'
F_BLD = f'{FONTS}/Vazirmatn_700Bold.ttf'
F_MED = f'{FONTS}/Vazirmatn_500Medium.ttf'
F_REG = f'{FONTS}/Vazirmatn_400Regular.ttf'

GREEN=(0,171,127); DGREEN=(0,140,103); DARK=(15,30,25); OFFW=(247,249,248)
WHITE=(255,255,255); MINT=(219,241,233); GRAYT=(96,120,112); MINT2=(64,199,163)

W,H = 1080,1920; FPS=30
PW,PH = 560,1212                  # phone screen size
VO_DELAY = 0.35                   # seconds before VO starts
TAIL = 1.15                       # hold after VO ends
TRANS = 0.26                      # scene crossfade

_reshaper = arabic_reshaper.ArabicReshaper()
_DIG = str.maketrans('0123456789','۰۱۲۳۴۵۶۷۸۹')
def fa(s):
    return get_display(_reshaper.reshape(s.translate(_DIG)))

def clamp01(x): return 0.0 if x<0 else (1.0 if x>1 else x)
def eoc(t): t=clamp01(t); return 1-(1-t)**3
def eio(t): t=clamp01(t); return t*t*(3-2*t)
def eob(t):
    t=clamp01(t); c1=1.70158; c3=c1+1
    return 1 + c3*(t-1)**3 + c1*(t-1)**2
def lerp(a,b,t): return a+(b-a)*t

def line_img(text, font, fill, pad=26):
    t = fa(text)
    tmp = ImageDraw.Draw(Image.new('RGBA',(8,8),(0,0,0,0)))
    b = tmp.textbbox((0,0), t, font=font)
    w,h = b[2]-b[0], b[3]-b[1]
    img = Image.new('RGBA',(w+2*pad,h+2*pad),(0,0,0,0))
    ImageDraw.Draw(img).text((pad-b[0], pad-b[1]), t, font=font, fill=fill)
    return img

def pill_img(text, font, fg, bg, padx=42, pady=18):
    li = line_img(text, font, fg, pad=0)
    w,h = li.width+2*padx, li.height+2*pady
    img = Image.new('RGBA',(w+8,h+8),(0,0,0,0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([4,4,4+w-1,4+h-1], radius=(h//2), fill=bg)
    img.alpha_composite(li,(4+(w-li.width)//2, 4+(h-li.height)//2))
    return img

def paste_a(base, ov, pos, alpha=255):
    if alpha <= 4: return
    if alpha < 255:
        ov = ov.copy(); ov.putalpha(ov.getchannel('A').point(lambda p: p*alpha//255))
    base.alpha_composite(ov, (int(pos[0]), int(pos[1])))

def paste_c(base, ov, cx, cy, alpha=255, scale=1.0):
    if scale != 1.0:
        ov = ov.resize((max(1,round(ov.width*scale)), max(1,round(ov.height*scale))), Image.BILINEAR)
    paste_a(base, ov, (cx-ov.width//2, cy-ov.height//2), alpha)

# ---------------- phone ----------------
CROPS = {   # (file, box in 3x coords, bias_top for over-tall crops)
 's1'    : ('8.png',    (0, 666, 969, 2472),  0.5),
 's2'    : ('5.png',    (0, 270,1773, 3450),  0.5),
 's3a'   : ('10-1.png', (0,   0,1773, 3030),  0.5),
 's3b'   : ('10.png',   (0,1620, 783, 3300),  0.5),
 's4a'   : ('14.png',   (0, 690, 675, 2400),  0.28),
 's4b'   : ('16.png',   (0, 630, 783, 1410),  0.5),
 's5'    : ('9.png',    (0,1080, 903, 2760),  0.5),
 's6mini': ('1.png',    (0, 180, 675,  810),  0.5),
}

def load_content(key):
    f, box, bias = CROPS[key]
    im = Image.open(f'{SHOTS}/{f}').convert('RGB').crop(box)
    sc = PW/im.width
    im = im.resize((PW, round(im.height*sc)), Image.LANCZOS)
    return im, bias

def fit_screen(content, bias=0.5):
    nh = content.height
    if nh >= PH:
        extra = nh-PH; top = round(extra*bias)
        return content.crop((0,top,PW,top+PH)), 0
    half = (PH-nh)//2
    tc = content.getpixel((PW//2,1)); bc = content.getpixel((PW//2,nh-2))
    canvas = Image.new('RGB',(PW,PH))
    canvas.paste(Image.new('RGB',(PW,half),tc),(0,0))
    canvas.paste(Image.new('RGB',(PW,PH-nh-half),bc),(0,half+nh))
    canvas.paste(content,(0,half))
    return canvas, PH-nh           # slack available for scroll

def screen_variants(key, n=9):
    """fitted screen + scroll variants (for scroll motion)"""
    content, bias = load_content(key)
    fitted, slack = fit_screen(content, bias)
    if slack < 40:
        return [fitted]
    offs = [round(-slack*0.32 + slack*0.64*i/(n-1)) for i in range(n)]
    variants=[]
    for off in offs:
        canvas = Image.new('RGB',(PW,PH))
        canvas.paste(fitted,(0,off))
        variants.append(canvas)
    return variants

def make_phone(screen):
    bezel=16; fw,fh = PW+2*bezel, PH+2*bezel
    phone = Image.new('RGBA',(fw,fh),(0,0,0,0))
    d = ImageDraw.Draw(phone)
    d.rounded_rectangle([0,0,fw-1,fh-1], radius=86, fill=(14,17,18,255))
    d.rounded_rectangle([3,3,fw-4,fh-4], radius=83, fill=(40,48,50,255))  # inner rim
    mask = Image.new('L',(PW,PH),0)
    ImageDraw.Draw(mask).rounded_rectangle([0,0,PW-1,PH-1], radius=72, fill=255)
    phone.paste(screen,(bezel,bezel),mask)
    cx=fw//2
    d.ellipse([cx-11,bezel+24,cx+11,bezel+46], fill=(8,10,11,255))
    d.ellipse([cx-5,bezel+30,cx+5,bezel+40], fill=(46,58,62,255))
    return phone

def make_shadow(w,h):
    sh = Image.new('RGBA',(w+200,h+200),(0,0,0,0))
    ImageDraw.Draw(sh).rounded_rectangle([100,110,100+w-1,110+h-1], radius=100, fill=(18,42,34,120))
    return sh.filter(ImageFilter.GaussianBlur(42))

def blob_bg(size, base, blobs):
    img = Image.new('RGB', size, base).convert('RGBA')
    ov = Image.new('RGBA', size, (0,0,0,0))
    d = ImageDraw.Draw(ov)
    for cx,cy,rx,ry,col in blobs:
        d.ellipse([cx-rx,cy-ry,cx+rx,cy+ry], fill=col)
    ov = ov.filter(ImageFilter.GaussianBlur(95))
    return Image.alpha_composite(img, ov).convert('RGB')

BG_LIGHT = blob_bg((W,H), OFFW, [
    (W+90,-70, 430,380, MINT),
    (-140,H+150, 470,410, MINT),
    (W-60, H-420, 260,240, (233,246,240)),
])
BG_LIGHT_C = blob_bg((1080,1350), OFFW, [
    (1080+80,-60, 400,350, MINT),
    (-120,1350+120, 430,380, MINT),
])
BG_GREEN = blob_bg((W,H), GREEN, [
    (W+130,-90, 480,430, (0,148,109)),
    (-150,H+170, 510,450, (0,148,109)),
    (W//2, 240, 540,260, MINT2),
])
SHADOW = make_shadow(PW+32, PH+32)

# ---------------- timeline / scenes ----------------
def vo_duration():
    r = subprocess.run(['ffmpeg','-i',VO], capture_output=True, text=True)
    m = re.search(r'Duration: (\d+):(\d+):([\d.]+)', r.stderr)
    return int(m.group(1))*3600 + int(m.group(2))*60 + float(m.group(3))

def build_timeline():
    D = vo_duration()
    # sentence windows as fractions of VO (by word count)
    fr = [0.113, 0.306, 0.516, 0.645, 0.774, 0.855, 1.0]
    b = [0.0]
    b += [VO_DELAY + fr[0]*D]                       # s1 | s2
    b += [VO_DELAY + fr[1]*D]                       # s2 | s3a
    mid3 = VO_DELAY + lerp(fr[1], fr[2], 0.55)*D    # s3a | s3b
    b += [mid3, VO_DELAY + fr[2]*D]                 # s3b | s4a
    mid4 = VO_DELAY + lerp(fr[2], fr[3], 0.62)*D    # s4a | s4b
    b += [mid4, VO_DELAY + fr[3]*D]                 # s4b | s5
    b += [VO_DELAY + fr[4]*D]                       # s5 | brand
    b += [VO_DELAY + fr[5]*D]                       # brand | cta
    T = VO_DELAY + D + TAIL
    return b, T

SCENES = [
 dict(key='s1',  pill='شروعِ هر روز',        head='هر روز، یک سؤال ساده',      sub='حالِ امروزت رو ثبت کن'),
 dict(key='s2',  pill='ثبتِ حال روزانه',     head='۵ شاخص، فقط ۱۰ ثانیه',      sub='انرژی، خلق، تمرکز، خواب، استرس'),
 dict(key='s3a', pill='کتابخانه‌ی جوما',      head='۱۰۷ فعالیت آماده',          sub='در ۸ دسته‌ی تخصصی'),
 dict(key='s3b', pill='از ورزش تا روابط',    head='هدف: روز، هفته، ماه',       sub='دقیق، شمسی، قابل اندازه‌گیری'),
 dict(key='s4a', pill='تمرین‌های درمانی',    head='قدم‌به‌قدم، مثل جلسه',      sub='طرحواره‌درمانی، زوج‌درمانی، ACT'),
 dict(key='s4b', pill='آموزشِ همراه',        head='نه نصیحت؛ تمرینِ واقعی',    sub='همان یکی که این هفته تکان دادت'),
 dict(key='s5',  pill='گزارش هوشمند',        head='داده‌های تو، حرفِ دلِ تو',  sub='آخر ماه، خودت رو ببین'),
 dict(kind='brand'),
 dict(kind='cta'),
]

f_pill = ImageFont.truetype(F_BLD, 46)
f_head = ImageFont.truetype(F_BLK, 112)
f_sub  = ImageFont.truetype(F_MED, 50)
f_url  = ImageFont.truetype(F_BLD, 56)
f_cta  = ImageFont.truetype(F_BLK, 144)
f_logo_big = ImageFont.truetype(F_BLK, 290)
f_tag  = ImageFont.truetype(F_BLD, 64)
f_logo_sm = ImageFont.truetype(F_BLK, 132)
f_chip = ImageFont.truetype(F_MED, 42)
f_strip= ImageFont.truetype(F_MED, 40)
f_btn  = ImageFont.truetype(F_BLD, 54)

STRIP = line_img('جوما  •  joma.mirbolouki.com', f_strip, GRAYT, pad=8)

_screens = {}
_phones = {}
def screen_assets(key):
    if key not in _screens:
        _screens[key] = screen_variants(key)
    return _screens[key]

def phone_assets(key):
    if key not in _phones:
        _phones[key] = [make_phone(v) for v in screen_assets(key)]
    return _phones[key]

_minis = {}
def mini_phone(key):
    if key not in _minis:
        _minis[key] = make_phone(screen_assets(key)[0])
    return _minis[key]

def render_app(i, sc, local, dur):
    frame = BG_LIGHT.copy().convert('RGBA')
    # headline block
    pl = pill_img(sc['pill'], f_pill, WHITE, GREEN)
    hd = line_img(sc['head'], f_head, DARK)
    sb = line_img(sc['sub'],  f_sub,  GRAYT)
    t = local
    paste_c(frame, pl, 540, 212, alpha=int(255*clamp01((t-0.05)/0.22)),
            scale=lerp(0.8,1,eob((t-0.05)/0.4)))
    paste_c(frame, hd, 540, 336, alpha=int(255*clamp01((t-0.16)/0.22)),
            scale=lerp(0.78,1,eob((t-0.16)/0.45)))
    dy = (1-eoc((t-0.3)/0.4))*36
    paste_c(frame, sb, 540, int(452+dy), alpha=int(255*clamp01((t-0.3)/0.3)))
    # phone: entrance slide (alternate side) + slow zoom + inner scroll
    phones = phone_assets(sc['key'])
    ent = eoc(t/0.5)
    side = 1 if i%2==0 else -1
    px = 540 + side*(1-ent)*430
    py = 1235 + (1-ent)*70
    zoom = 1.0 + 0.05*eio(t/max(dur,0.01))
    ph = phones[min(len(phones)-1, int(eio(t/max(dur,0.01))*(len(phones)-1)))]
    if zoom != 1.0:
        ph = ph.resize((round(ph.width*zoom), round(ph.height*zoom)), Image.BILINEAR)
    sh = SHADOW.resize((round(SHADOW.width*zoom), round(SHADOW.height*zoom)), Image.BILINEAR)
    frame.alpha_composite(sh, (round(px-sh.width/2), round(py-sh.height/2)+26))
    paste_a(frame, ph, (px-ph.width/2, py-ph.height/2), alpha=int(255*clamp01(t/0.3)))
    return frame

def render_brand(local, dur):
    frame = BG_LIGHT.copy().convert('RGBA')
    t = local
    logo = line_img('جوما', f_logo_big, GREEN, pad=10)
    paste_c(frame, logo, 540, 640, alpha=int(255*clamp01(t/0.25)),
            scale=lerp(0.62,1,eob(t/0.55)))
    bar = Image.new('RGBA',(230,16),(0,0,0,0))
    ImageDraw.Draw(bar).rounded_rectangle([0,0,229,15], radius=8, fill=GREEN+(255,))
    paste_c(frame, bar, 540, 878, alpha=int(255*clamp01((t-0.25)/0.3)))
    tag = line_img('خودمدیریتی، به زبانِ خودت', f_tag, DARK)
    dy = (1-eoc((t-0.35)/0.45))*40
    paste_c(frame, tag, 540, int(975+dy), alpha=int(255*clamp01((t-0.35)/0.3)))
    ph = mini_phone('s6mini')
    ph = ph.resize((round(ph.width*0.52), round(ph.height*0.52)), Image.BILINEAR)
    ph = ph.rotate(7, expand=True, resample=Image.BICUBIC)
    ent = eoc((t-0.45)/0.5)
    paste_a(frame, ph, (700-ph.width/2 + (1-ent)*160, 1420-ph.height/2 + (1-ent)*220),
            alpha=int(255*clamp01((t-0.45)/0.3)))
    return frame

def render_cta(local, dur, t_global=None, T=None):
    frame = BG_GREEN.copy().convert('RGBA')
    t = local
    log = line_img('جوما', f_logo_sm, WHITE, pad=8)
    paste_c(frame, log, 540, 235, alpha=int(255*clamp01(t/0.25)),
            scale=lerp(0.7,1,eob(t/0.4)))
    hd = line_img('همین امروز شروع کن', f_cta, WHITE)
    paste_c(frame, hd, 540, 478, alpha=int(255*clamp01((t-0.12)/0.22)),
            scale=lerp(0.75,1,eob((t-0.12)/0.45)))
    btn = pill_img('joma.mirbolouki.com', f_btn, GREEN, WHITE, padx=66, pady=30)
    paste_c(frame, btn, 540, 700, alpha=int(255*clamp01((t-0.32)/0.22)),
            scale=lerp(0.8,1,eob((t-0.32)/0.4)))
    sub = line_img('۱۰۷ فعالیت آماده  •  ۸ دسته  •  گزارش هوشمند', f_chip, WHITE)
    paste_c(frame, sub, 540, 856, alpha=int(210*clamp01((t-0.5)/0.3)))
    # mini phones fan
    fan = [('s1',-12,(255,1498)),('s3a',0,(540,1560)),('s5',12,(825,1498))]
    for k,(key,rot,(cx,cy)) in enumerate(fan):
        st = 0.5+k*0.16
        ph = mini_phone(key)
        ph = ph.resize((round(ph.width*0.40), round(ph.height*0.40)), Image.BILINEAR)
        if rot: ph = ph.rotate(rot, expand=True, resample=Image.BICUBIC)
        sc_ = lerp(0.55,1,eob((t-st)/0.45))
        if sc_ != 1.0:
            ph = ph.resize((max(2,round(ph.width*sc_)), max(2,round(ph.height*sc_))), Image.BILINEAR)
        paste_a(frame, ph, (cx-ph.width/2, cy-ph.height/2),
                alpha=int(255*clamp01((t-st)/0.25)))
    return frame

def progress(frame, t, T, color):
    if T is None or T<=0: return
    d = ImageDraw.Draw(frame)
    w = round(W*clamp01(t/T))
    if w>8:
        d.rounded_rectangle([0,52,w,60], radius=4, fill=color+(255,))

def render(i, local, dur, t_global, T):
    sc = SCENES[i]
    if sc.get('kind')=='brand': fr = render_brand(local, dur)
    elif sc.get('kind')=='cta': fr = render_cta(local, dur)
    else: fr = render_app(i, sc, local, dur)
    fr = fr.convert('RGBA')
    is_green = sc.get('kind')=='cta'
    progress(fr, t_global, T, WHITE if is_green else GREEN)
    if not is_green:
        paste_a(fr, STRIP, (W//2-STRIP.width//2, 1852), alpha=215)
    return fr.convert('RGB')

def build_video():
    os.makedirs(FRAMES, exist_ok=True)
    bounds, T = build_timeline()
    N = round(T*FPS)
    print(f'VO-driven timeline: T={T:.2f}s, {N} frames, bounds={[round(b,2) for b in bounds]}')
    for n in range(N):
        t = n/FPS
        i = len(bounds)-1
        for j in range(len(bounds)):
            if j==len(bounds)-1 or t < bounds[j+1]:
                i = j; break
        local = t - bounds[i]
        dur = (bounds[i+1] if i+1<len(bounds) else T) - bounds[i]
        # crossfade into next scene
        if i+1 < len(bounds) and t > bounds[i+1]-TRANS:
            p = eoc((t-(bounds[i+1]-TRANS))/TRANS)
            A = render(i, local, dur, t, T)
            B = render(i+1, 0.001, 1.0, t, T)
            fr = Image.blend(A.convert('RGB'), B.convert('RGB'), p)
        else:
            fr = render(i, local, dur, t, T)
        fr.save(f'{FRAMES}/f{n:05d}.jpg', quality=93)
        if n % 150 == 0: print(f'  frame {n}/{N}')
    print('encoding...')
    subprocess.run(['ffmpeg','-y','-framerate',str(FPS),'-i',f'{FRAMES}/f%05d.jpg',
        '-i',VO,'-af','adelay=350:all=1,apad','-t',f'{T:.3f}',
        '-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p',
        '-r',str(FPS),'-c:a','aac','-b:a','160k','-movflags','+faststart',
        f'{OUT}/joma-reel.mp4'], check=True, capture_output=True)
    # cover from CTA scene
    bounds2,_ = build_timeline()
    cover_t = bounds2[-1] + 1.9
    n = min(round(cover_t*FPS), N-1)
    Image.open(f'{FRAMES}/f{n:05d}.jpg').save(f'{OUT}/joma-reel-cover.jpg', quality=95)
    print('video done:', f'{OUT}/joma-reel.mp4')

# ---------------- carousel 1080x1350 ----------------
CW,CH = 1080,1350
f_c_head = ImageFont.truetype(F_BLK, 100)
f_c_sub  = ImageFont.truetype(F_MED, 46)
f_c_pill = ImageFont.truetype(F_BLD, 42)
f_c_big1 = ImageFont.truetype(F_BLK, 116)
f_c_big2 = ImageFont.truetype(F_BLK, 150)
f_c_url  = ImageFont.truetype(F_BLD, 52)
f_c_cta  = ImageFont.truetype(F_BLK, 126)
f_c_chip = ImageFont.truetype(F_MED, 36)

def c_slide_app(idx, total, pill_t, head_t, sub_t, key, chips=None, bias_note=None):
    img = BG_LIGHT_C.copy().convert('RGBA')
    paste_c(img, pill_img(pill_t, f_c_pill, WHITE, GREEN), 540, 158)
    paste_c(img, line_img(head_t, f_c_head, DARK), 540, 292)
    if sub_t: paste_c(img, line_img(sub_t, f_c_sub, GRAYT), 540, 412)
    if chips:
        x_w = [pill_img(c, f_c_chip, DARK, MINT, padx=26, pady=12) for c in chips]
        tot = sum(p.width for p in x_w) + 16*(len(x_w)-1)
        if tot > 1000:
            x_w = [p.resize((int(p.width*1000/tot), int(p.height*1000/tot)), Image.BILINEAR) for p in x_w]
            tot = sum(p.width for p in x_w) + 16*(len(x_w)-1)
        x = 540 - tot//2
        for p in x_w:
            img.alpha_composite(p,(x, 480 - p.height//2)); x += p.width+16
    # phone tilted
    ph = mini_phone(key)
    sc = 0.66 if chips else 0.70
    ph = ph.resize((round(ph.width*sc), round(ph.height*sc)), Image.BILINEAR)
    ph = ph.rotate(-4, expand=True, resample=Image.BICUBIC)
    sh = SHADOW.resize((round(SHADOW.width*sc), round(SHADOW.height*sc)), Image.BILINEAR)
    sh = sh.rotate(-4, expand=True, resample=Image.BILINEAR)
    cy = 950 if chips else 930
    img.alpha_composite(sh,(round(540-sh.width/2), round(cy-sh.height/2)+22))
    img.alpha_composite(ph,(round(540-ph.width/2), round(cy-ph.height/2)))
    dots(img, idx, total)
    return img.convert('RGB')

def dots(img, idx, total, color=GREEN):
    d = ImageDraw.Draw(img)
    n=total; gap=26; r=7
    x0 = 540 - (n*2*r + (n-1)*gap)//2
    for k in range(n):
        cx = x0 + k*(2*r+gap) + r
        if k==idx: d.ellipse([cx-r-3,1296-r-3,cx+r+3,1296+r+3], fill=color)
        else: d.ellipse([cx-r,1296-r,cx+r,1296+r], fill=(205,220,214))

def c_cover():
    img = BG_LIGHT_C.copy().convert('RGBA')
    pl = pill_img('برنامه‌ی خودمدیریتی فارسی', f_c_pill, WHITE, GREEN)
    paste_c(img, pl, 540, 150)
    paste_c(img, line_img('هر روز، یک سؤال:', f_c_big1, DARK), 540, 300)
    paste_c(img, line_img('امروز چطوری؟', f_c_big2, GREEN), 540, 425)
    ph = mini_phone('s1')
    ph = ph.resize((round(ph.width*0.66), round(ph.height*0.66)), Image.BILINEAR)
    ph = ph.rotate(-5, expand=True, resample=Image.BICUBIC)
    sh = SHADOW.resize((round(SHADOW.width*0.66), round(SHADOW.height*0.66)), Image.BILINEAR)
    sh = sh.rotate(-5, expand=True, resample=Image.BILINEAR)
    img.alpha_composite(sh,(round(540-sh.width/2), round(940-sh.height/2)+22))
    img.alpha_composite(ph,(round(540-ph.width/2), round(940-ph.height/2)))
    dots(img, 0, 6)
    return img.convert('RGB')

def c_cta():
    img = blob_bg((CW,CH), GREEN, [
        (CW+120,-80, 440,400, (0,148,109)),
        (-130,CH+140, 460,420, (0,148,109)),
        (540, 200, 520,240, MINT2),
    ]).convert('RGBA')
    paste_c(img, line_img('جوما', f_logo_sm, WHITE), 540, 190)
    paste_c(img, line_img('همین امروز', f_c_cta, WHITE), 540, 420)
    paste_c(img, line_img('شروع کن', f_c_cta, WHITE), 540, 545)
    btn = pill_img('joma.mirbolouki.com', f_c_url, GREEN, WHITE, padx=60, pady=28)
    paste_c(img, btn, 540, 720)
    paste_c(img, line_img('۱۰۷ فعالیت  •  ۸ دسته  •  گزارش هوشمند', f_c_chip, WHITE), 540, 845)
    fan = [('s1',-12,(250,1120)),('s3a',0,(540,1160)),('s5',12,(830,1120))]
    for key,rot,(cx,cy) in fan:
        ph = mini_phone(key)
        ph = ph.resize((round(ph.width*0.34), round(ph.height*0.34)), Image.BILINEAR)
        if rot: ph = ph.rotate(rot, expand=True, resample=Image.BICUBIC)
        img.alpha_composite(ph,(round(cx-ph.width/2), round(cy-ph.height/2)))
    return img.convert('RGB')

def build_carousel():
    os.makedirs(CAR, exist_ok=True)
    slides = [
      ('01', c_cover()),
      ('02', c_slide_app(1,6,'ثبتِ حالِ روزانه','۵ شاخص، فقط ۱۰ ثانیه','صبح یا شب، هر وقت شد','s2',
                         chips=['انرژی','خلق','تمرکز','خواب','استرس'])),
      ('03', c_slide_app(2,6,'کتابخانه‌ی جوما','۱۰۷ فعالیت آماده','در ۸ دسته‌ی تخصصی','s3a')),
      ('04', c_slide_app(3,6,'تمرین‌های درمانی','مثل یک جلسه‌ی واقعی','قدم‌به‌قدم، با چرا و چگونه','s4a')),
      ('05', c_slide_app(4,6,'گزارش هوشمند','داده‌های تو، حرفِ دلِ تو','آخر ماه، خودت رو ببین','s5')),
      ('06', c_cta()),
    ]
    for name, im in slides:
        im.save(f'{CAR}/slide-{name}.jpg', quality=94)
        print('slide', name, 'saved')

if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv)>1 else 'all'
    if cmd in ('video','all'): build_video()
    if cmd in ('carousel','all'): build_carousel()
    print('DONE')
