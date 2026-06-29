/* ============================================================
   Brand Story 애니메이션 (make-on 스토리 연출 재현)
   - fade-up / card-fade-up : IntersectionObserver (레이아웃 시프트에 강함)
   - bg-black 전환 : sec02 진입 시 .brand-wrap.bg-black
   - sec04 : sticky scrub 으로 젤로베베 → 몽젤로 크로스페이드
   make-on 파라미터: fadeUp y120/opacity, ease power2.out, bg-trigger ~57%
   ============================================================ */
(function(){
  function init(){
    var wrap=document.querySelector('.brand-wrap');
    if(!wrap) return;

    /* fade-up / card-fade-up 리빌 */
    var revEls=document.querySelectorAll('.fade-up, .card-fade-up');
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
      },{threshold:0.18, rootMargin:'0px 0px -10% 0px'});
      revEls.forEach(function(el){ io.observe(el); });
    } else { revEls.forEach(function(el){ el.classList.add('in'); }); }

    /* bg-black 전환 (make-on: sec02 top 57%) + sec02 h3 페이드 */
    /* make-on 연결부: 흰 히어로 → 원형이 커지며 검정으로 덮음 → 검정 텍스트 순차 등장 */
    var ht=document.getElementById('heroTrans');
    if(ht){
      var htBlack=ht.querySelector('.ht-black');
      var htTick=false;
      function htScroll(){
        if(htTick) return; htTick=true;
        requestAnimationFrame(function(){
          htTick=false;
          var rect=ht.getBoundingClientRect();
          var total=ht.offsetHeight-window.innerHeight;
          var p=Math.min(1,Math.max(0,-rect.top/(total||1)));
          /* 검정 원이 중앙에서 커지며 흰 히어로를 덮음.
             가시 구간(반경 ~71%에서 전체 덮임)을 스크롤 전반에 펼치고
             easeInOutCubic(부드러운 시작·끝) + CSS clip-path 스프링 transition 으로 탄성감 */
          var raw=Math.min(1,Math.max(0,p/0.55));
          var e=raw<0.5 ? 4*raw*raw*raw : 1-Math.pow(-2*raw+2,3)/2;
          var r=e*112;
          htBlack.style.clipPath='circle('+r.toFixed(1)+'% at 50% 50%)';
          /* 원이 거의 덮이면 전체 페이지 배경도 #000 (이후 섹션 검정 유지) */
          wrap.classList.toggle('bg-black', p>=0.40);
          /* 검정으로 덮인 뒤 텍스트 순차 등장 */
          htBlack.classList.toggle('lines-in', p>=0.52);
        });
      }
      window.addEventListener('scroll',htScroll,{passive:true});
      window.addEventListener('resize',htScroll,{passive:true});
      htScroll();
    }

    /* sec04: 세로선이 스크롤로 내려오며 젤로베베 → 몽젤로 크로스페이드 */
    var sec04=document.querySelector('.brand-sec04');
    var fill=document.querySelector('.grow-line-fill'),
        zelo=document.querySelector('.grow-zelo'), mong=document.querySelector('.grow-mong');
    if(sec04 && fill){
      var ticking=false;
      function onScroll(){
        if(ticking) return; ticking=true;
        requestAnimationFrame(function(){
          ticking=false;
          var rect=sec04.getBoundingClientRect();
          var total=sec04.offsetHeight-window.innerHeight;
          var p=Math.min(1,Math.max(0, -rect.top/(total||1)));
          fill.style.height=(p*100).toFixed(1)+'%';
          var zo=Math.min(1,Math.max(0, 1-(p-0.38)/0.14));
          var mo=Math.min(1,Math.max(0, (p-0.50)/0.14));
          if(zelo) zelo.style.opacity=zo.toFixed(2);
          if(mong) mong.style.opacity=mo.toFixed(2);
        });
      }
      window.addEventListener('scroll',onScroll,{passive:true});
      window.addEventListener('resize',onScroll,{passive:true});
      onScroll();
    }
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded',init);
})();
