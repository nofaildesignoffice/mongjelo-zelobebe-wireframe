/* ============================================================
   MONGJELO · ZELOBEBE — site.js
   ============================================================ */
(function(){
  'use strict';
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }

  ready(function(){
    if(window.lucide) lucide.createIcons();

    /* 헤더 스크롤 */
    var header=document.getElementById('siteHeader');
    if(header) window.addEventListener('scroll',function(){ header.classList.toggle('scrolled', window.scrollY>40); },{passive:true});

    /* 드로어 */
    var drawer=document.getElementById('drawer'), overlay=document.getElementById('drawerOverlay'),
        openBtn=document.getElementById('hamburger'), closeBtn=document.getElementById('drawerClose');
    function openD(){ if(drawer){drawer.classList.add('open');overlay.classList.add('open');} }
    function closeD(){ if(drawer){drawer.classList.remove('open');overlay.classList.remove('open');} }
    if(openBtn) openBtn.addEventListener('click',openD);
    if(closeBtn) closeBtn.addEventListener('click',closeD);
    if(overlay) overlay.addEventListener('click',closeD);
    document.querySelectorAll('.drawer-acc-btn').forEach(function(b){ b.addEventListener('click',function(){ b.closest('.drawer-acc').classList.toggle('open'); }); });

    /* 히어로 페이드 슬라이더 */
    var hero=document.getElementById('hero');
    if(hero){
      var slides=hero.querySelectorAll('.hero-slide'), dots=hero.querySelectorAll('.hero-dot'),
          curEl=hero.querySelector('.hero-paging .cur'), allEl=hero.querySelector('.hero-paging .all'), idx=0, timer;
      if(allEl) allEl.textContent=('0'+slides.length).slice(-2);
      function go(n){ slides[idx].classList.remove('active'); if(dots[idx])dots[idx].classList.remove('active');
        idx=(n+slides.length)%slides.length; slides[idx].classList.add('active'); if(dots[idx])dots[idx].classList.add('active');
        if(curEl)curEl.textContent=('0'+(idx+1)).slice(-2); }
      function auto(){ clearInterval(timer); timer=setInterval(function(){go(idx+1);},5000); }
      dots.forEach(function(d,i){ d.addEventListener('click',function(){go(i);auto();}); });
      if(slides.length>1) auto();
    }

    /* Swiper 에디토리얼 슬라이더 */
    if(window.Swiper){
      document.querySelectorAll('.best-slider .swiper').forEach(function(el){
        new Swiper(el,{
          slidesPerView:'auto', centeredSlides:true, loop:true, grabCursor:true,
          spaceBetween:24, speed:600, observer:true, observeParents:true,
          autoplay:{ delay:3500, disableOnInteraction:false }
        });
      });
    }

    /* 드래그 커서: 베스트 캐러셀 호버 시 마우스 커서를 원형 "Drag" 로 */
    var dc=document.querySelector('.drag-cursor'), bsl=document.querySelector('.best-slider');
    if(dc&&bsl){
      window.addEventListener('mousemove',function(e){ dc.style.left=e.clientX+'px'; dc.style.top=e.clientY+'px'; },{passive:true});
      bsl.addEventListener('mouseenter',function(){ dc.classList.add('show'); });
      bsl.addEventListener('mouseleave',function(){ dc.classList.remove('show'); });
    }

    /* Two Brands: 스크롤하면 젤로베베가 올라오고 몽젤로는 흐려지며 사라짐 → 젤로베베가 몽젤로 자리에 안착 */
    var ni=document.getElementById('twoBrands');
    if(ni){
      var mong=ni.querySelector('.ni-mong'), zelo=ni.querySelector('.ni-zelo');
      var niTick=false;
      function niScroll(){
        if(niTick) return; niTick=true;
        requestAnimationFrame(function(){
          niTick=false;
          if(!zelo){ return; }
          if(window.innerWidth<=1024){ zelo.style.transform=''; if(mong) mong.style.opacity=''; return; }
          var rect=ni.getBoundingClientRect();
          var total=ni.offsetHeight-window.innerHeight;
          var p=Math.min(1,Math.max(0,-rect.top/(total||1)));
          /* 젤로베베: 아래(몽젤로와 충분한 간격)에서 몽젤로 위치로 상승 — 시작 간격이 오래 유지되도록 easeInOut */
          var rise=Math.min(1,Math.max(0,(p-0.06)/0.68));
          var eased=rise<0.5?4*rise*rise*rise:1-Math.pow(-2*rise+2,3)/2; /* easeInOutCubic */
          var gap=Math.min(200,Math.max(120,window.innerHeight*0.16)); /* 시작 시 두 카드 사이 간격 */
          var startY=zelo.offsetHeight+gap;                    /* 시작: 몽젤로 아래로 충분히 떨어져 윗부분만 노출 */
          var y=startY*(1-eased);
          zelo.style.transform='translateY('+y.toFixed(1)+'px)';
          /* 몽젤로: 스크롤에 따라 흐려지며 사라짐 */
          var fade=Math.min(1,Math.max(0,(p-0.1)/0.58));
          if(mong) mong.style.opacity=(1-fade).toFixed(3);
        });
      }
      window.addEventListener('scroll',niScroll,{passive:true});
      window.addEventListener('resize',niScroll,{passive:true});
      niScroll();
    }

    /* 스크롤 페이드인 */
    var revs=document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window && revs.length){
      var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);} }); },{threshold:0.1,rootMargin:'0px 0px -8% 0px'});
      revs.forEach(function(r){io.observe(r);});
    } else revs.forEach(function(r){r.classList.add('in');});

    /* 제네릭 탭 */
    document.querySelectorAll('[data-tabgroup]').forEach(function(group){
      var name=group.getAttribute('data-tabgroup'), tabs=group.querySelectorAll('[data-tab]');
      tabs.forEach(function(tab){ tab.addEventListener('click',function(){
        var key=tab.getAttribute('data-tab');
        tabs.forEach(function(t){t.classList.remove('active');}); tab.classList.add('active');
        document.querySelectorAll('[data-panelgroup="'+name+'"] > [data-panel]').forEach(function(p){
          var hide=p.getAttribute('data-panel')!==key; p.classList.toggle('hidden',hide); p.classList.toggle('is-hidden',hide);
        });
        var more=document.getElementById('moreBtn'); if(more && (key==='mongjelo'||key==='zelobebe')) more.setAttribute('href',key+'.html');
      }); });
    });

    /* 토글 스위치 */
    document.querySelectorAll('.toggle-switch').forEach(function(t){ t.addEventListener('click',function(){t.classList.toggle('on');}); });
    /* FAQ */
    document.querySelectorAll('.faq-question').forEach(function(q){ q.addEventListener('click',function(){ q.closest('.faq-item').classList.toggle('open'); }); });
    document.querySelectorAll('.faq-cat-tab').forEach(function(t){ t.addEventListener('click',function(){ document.querySelectorAll('.faq-cat-tab').forEach(function(x){x.classList.remove('active');}); t.classList.add('active'); }); });
    /* 필터 칩 */
    document.querySelectorAll('.filter-chips').forEach(function(g){ g.querySelectorAll('.chip').forEach(function(c){ c.addEventListener('click',function(){ g.querySelectorAll('.chip').forEach(function(x){x.classList.remove('active');}); c.classList.add('active'); }); }); });
    /* 룩북 핫스팟 */
    document.querySelectorAll('.hotspot').forEach(function(h){ h.addEventListener('click',function(e){ e.preventDefault();e.stopPropagation();
      var pop=document.getElementById(h.getAttribute('data-pop'));
      document.querySelectorAll('.hotspot-pop.open').forEach(function(p){if(p!==pop)p.classList.remove('open');});
      if(pop)pop.classList.toggle('open'); }); });
    document.addEventListener('click',function(){ document.querySelectorAll('.hotspot-pop.open').forEach(function(p){p.classList.remove('open');}); });
    /* 리뷰 모달 */
    var modal=document.getElementById('reviewModal');
    document.querySelectorAll('[data-modal="reviewModal"]').forEach(function(c){ c.addEventListener('click',function(){ if(modal)modal.classList.add('open'); }); });
    if(modal){ modal.addEventListener('click',function(e){ if(e.target===modal)modal.classList.remove('open'); });
      var mc=modal.querySelector('.modal-close'); if(mc)mc.addEventListener('click',function(){modal.classList.remove('open');}); }
    /* 수량 */
    document.querySelectorAll('.qty-stepper').forEach(function(s){ var v=s.querySelector('.qty-value'),b=s.querySelectorAll('.qty-btn');
      b[0].addEventListener('click',function(){v.textContent=Math.max(1,parseInt(v.textContent,10)-1);});
      b[1].addEventListener('click',function(){v.textContent=parseInt(v.textContent,10)+1;}); });
    /* PDP 썸네일 */
    document.querySelectorAll('.pdp-thumbs .pdp-thumb').forEach(function(t){ t.addEventListener('click',function(){ document.querySelectorAll('.pdp-thumbs .pdp-thumb').forEach(function(x){x.classList.remove('active');}); t.classList.add('active'); }); });
    /* 푸터 아코디언 */
    document.querySelectorAll('.footer-col-title').forEach(function(b){ b.addEventListener('click',function(){ if(window.innerWidth<=768) b.closest('.footer-col').classList.toggle('open'); }); });
    /* TOP */
    var topBtn=document.getElementById('topBtn');
    if(topBtn){ window.addEventListener('scroll',function(){ topBtn.classList.toggle('show',window.scrollY>500); },{passive:true});
      topBtn.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); }); }
  });
})();
