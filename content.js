/* Content only: image paths are relative to index.html. Empty src renders an explicit placeholder.
   Copy is based on the supplied wireframe; no research findings are invented.
   Add approved narrative to body, evidence to source, and original images to src. */
window.PORTFOLIO = {
  name: '조하루',
  about: 'BX Designer',
  biography: '',
  email: '',
  projects: [
    {id:'wisely', name:'WISELY', category:'Brand Experience', intro:'가격 경쟁력과 브랜드 발견 기회 사이의 간극을 탐색하는 BX 프로젝트', role:'', period:'', sections:[
      {type:'text-image',label:'01 / Starting point',title:'브랜드를 탐색하게 된 계기',body:'',prompt:'와이즐리를 처음 접한 상황, 관심을 갖게 된 이유와 당시 관찰을 작성합니다.',images:[{id:'origin',label:'브랜드 탐색 자료',ratio:'4/3'}]},
      {type:'research',label:'02 / Context',title:'브랜드와 시장을 함께 바라보기',body:'',prompt:'브랜드의 제안과 고객 접점을 분석하고, 경쟁 환경을 비교한 기준과 자료 출처를 설명합니다.',images:[{id:'market',label:'브랜드·시장 분석 이미지',ratio:'2/1'}],source:'자료 출처 · 분석 시점 입력 필요'},
      {type:'insight',label:'03 / Research question',title:'가격의 가치가\n발견의 기회로 이어지는가?',body:'검증할 질문입니다. 인지도나 구매 행동에 관한 조사 결과가 아직 제공되지 않았습니다.',status:'검증 전 질문'},
      {type:'research',label:'04 / Research design',title:'인지 단계와 접점을 묻는 설문',body:'',prompt:'설문의 목적, 대상, 모집 방식, 문항 설계와 각 질문을 선택한 이유를 작성합니다.',images:[{id:'survey',label:'설문 설계·문항 이미지',ratio:'16/9'}],source:'조사 대상 · 기간 · 방법 입력 필요'},
      {type:'research',variant:'offset',label:'05 / Evidence',title:'결과와 비교에서 판단의 근거 찾기',body:'',prompt:'실제 설문 결과와 경쟁사 비교 자료를 넣고, 관찰된 사실과 해석을 구분해 작성합니다.',images:[{id:'results',label:'설문 결과·경쟁사 비교 이미지',ratio:'3/2'}],source:'조사 결과 미제공 · 수치 및 결론 입력 전'},
      {type:'insight',label:'06 / Key insight',title:'핵심 인사이트',body:'',prompt:'검증된 발견을 한 문장으로 정리하고, 이를 뒷받침하는 근거와 한계를 작성합니다.',status:'근거 입력 대기'},
      {type:'strategy',label:'07 / Direction',title:'문제에서 전략으로',body:'',prompt:'문제, 인사이트, 전략의 연결을 설명합니다. 타깃과 포지셔닝의 대안 중 무엇을 선택했는지 근거를 덧붙입니다.',images:[{id:'strategy',label:'타깃·포지셔닝·BX 전략 다이어그램',ratio:'2/1'}]},
      {type:'text-image',variant:'reverse',label:'08 / Design decisions',title:'전략을 시각 언어로 옮기는 과정',body:'',prompt:'BX 메시지와 콘셉트를 소개하고, 시안별 차이·검토 기준·최종 선택 이유를 작성합니다.',images:[{id:'exploration',label:'디자인 시안·선택 근거 이미지',ratio:'4/3'}]},
      {type:'brand',label:'09 / Brand system',title:'타이포그래피, 컬러, 그래픽',body:'',prompt:'각 시각 요소가 전략과 연결되는 방식과 적용 원칙을 설명합니다.',images:[{id:'identity',label:'로고·아이덴티티',ratio:'1/1'},{id:'type-color',label:'타이포그래피·컬러',ratio:'4/3'},{id:'graphic',label:'그래픽 시스템',ratio:'3/2'}]},
      {type:'full',label:'10 / Applications',title:'브랜드를 만나는 장면',images:[{id:'application',label:'최종 브랜드 응용 이미지',ratio:'16/9'},{id:'application-detail',label:'브랜드 응용 디테일',ratio:'3/2'}]},
      {type:'reflection',label:'11 / Reflection',title:'한계와 다음 검증',body:'',prompt:'전략과 결과물의 연결, 배운 점, 아직 검증하지 못한 가정과 후속 검증 방법을 작성합니다.'}
    ]},
    {id:'record',name:'RE:CORD',category:'Brand & Service Concept',intro:'관계가 끝난 후 여러 서비스에 흩어진 기록을 발견하고 정리하는 BX·서비스 프로젝트',role:'',period:'',notice:'가상 서비스 콘셉트입니다. 실제 계정 연결·데이터 수집·삭제 기능은 구현되어 있지 않습니다.',sections:[
      {type:'full',label:'01 / Context',title:'여러 곳에 흩어진 기록',images:[{id:'scattered',label:'흩어진 데이터·문제 상황 비주얼',ratio:'2/1'}]},
      {type:'text-image',variant:'offset',label:'02 / Problem',title:'기록을 찾는 일과\n정리를 결정하는 일',body:'',prompt:'여러 서비스에 기록이 분산된 상황과 발견·검토·결정 단계에서 생기는 어려움을 설명합니다.',images:[{id:'problem',label:'문제 상황·정리 과정 이미지',ratio:'4/3'}]},
      {type:'research',label:'03 / Research',title:'사용자의 경험과 기존 해결 방식',body:'',prompt:'실제로 수행한 리서치 방법과 관찰 자료를 넣고, 기존 서비스가 해결하는 범위와 남은 문제를 설명합니다.',images:[{id:'research',label:'사용자 리서치·관찰 자료',ratio:'16/9'},{id:'alternatives',label:'기존 해결 방식·경쟁 서비스 비교',ratio:'16/9'}],source:'사용자 리서치 근거 및 출처 입력 필요'},
      {type:'insight',label:'04 / Service principle',title:'발견은 함께,\n결정은 사용자에게.',body:'통합 발견과 사용자 결정권을 중심에 두는 서비스 설계 방향입니다. 사용자 리서치로 검증된 결과를 의미하지 않습니다.',status:'설계 방향 · 검증 전'},
      {type:'strategy',label:'05 / Concept',title:'사용자 통제와 신뢰',body:'',prompt:'연결 권한, 결과 확인, 보관·삭제 결정의 경계를 설명하고 선택한 서비스 원칙의 근거를 작성합니다.',images:[{id:'principles',label:'서비스 원칙·콘셉트 이미지',ratio:'2/1'}]},
      {type:'flow',label:'06 / Experience',title:'단서에서 정리까지',body:'START → CLUE → EXPAND → DISCOVER → REVIEW → ARCHIVE / DELETE → APPLY',images:[{id:'flow',label:'전체 사용자 경험 흐름도',ratio:'5/2'}]},
      {type:'text-image',variant:'reverse',label:'07 / Architecture',title:'연결되는 데이터,\n확인할 수 있는 관계',body:'',prompt:'정보 구조와 데이터 연결 가정을 설명합니다. 실제 연동 범위와 기술적으로 검증되지 않은 부분을 구분합니다.',images:[{id:'architecture',label:'정보 구조·데이터 연결 방식',ratio:'4/3'}]},
      {type:'gallery',label:'08 / Clue & expand',title:'정리를 시작하는 작은 단서',body:'',prompt:'입력하는 단서와 탐색 범위가 어떻게 달라지는지, 입력 부담을 줄이기 위한 설계 근거를 작성합니다.',images:[{id:'start',label:'START · 시작 화면',ratio:'9/16'},{id:'clue',label:'CLUE · 단서 입력',ratio:'9/16'},{id:'expand',label:'EXPAND · 탐색 범위',ratio:'9/16'}]},
      {type:'gallery',label:'09 / Discover & review',title:'발견한 기록을 차분히 검토하기',body:'',prompt:'검색 결과의 맥락을 보여주는 방식, 오탐을 확인하는 과정과 화면 대안을 비교한 이유를 작성합니다.',images:[{id:'discover',label:'DISCOVER · 기록 발견',ratio:'9/16'},{id:'review',label:'REVIEW · 기록 검토',ratio:'9/16'},{id:'review-detail',label:'REVIEW · 상세 확인',ratio:'9/16'}]},
      {type:'gallery',label:'10 / Archive & delete',title:'남길 것과 지울 것을 선택하기',body:'',prompt:'보관·삭제 선택과 최종 확인 단계의 설계 의도를 설명합니다. 화면은 서비스 제안이며 실제 데이터를 변경하지 않습니다.',images:[{id:'archive',label:'ARCHIVE · 보관 결정',ratio:'9/16'},{id:'delete',label:'DELETE · 삭제 검토',ratio:'9/16'},{id:'apply',label:'APPLY · 최종 확인',ratio:'9/16'}]},
      {type:'text-image',label:'11 / Design decisions',title:'UI 대안과 선택의 근거',body:'',prompt:'시안 변화, 검토 기준, 선택한 정보 위계와 그 한계를 설명합니다.',images:[{id:'ui-process',label:'UI 설계 과정·시안 비교',ratio:'3/2'}]},
      {type:'brand',label:'12 / Identity',title:'도트에서 시작하는\n브랜드의 시각 언어',body:'',prompt:'도트, 로고, 서체, 색상이 서비스의 태도를 표현하는 방식을 설명합니다.',images:[{id:'logo',label:'브랜드 아이덴티티·로고',ratio:'3/2'},{id:'graphic',label:'도트·그래픽 시스템',ratio:'1/1'},{id:'typography',label:'타이포그래피·컬러',ratio:'4/3'}]},
      {type:'full',label:'13 / In the world',title:'화면 밖으로 이어지는 브랜드',images:[{id:'poster',label:'포스터·SNS 응용',ratio:'3/2'},{id:'offline',label:'정리함·라벨 오프라인 응용',ratio:'16/9'}]},
      {type:'reflection',label:'14 / Reflection',title:'실현 가능성과 남은 질문',body:'',prompt:'서비스별 API와 권한 제약, 개인정보 처리, 오탐 가능성, 삭제 복구 등 실제 구현 전 확인할 사항과 프로젝트에서 배운 점을 작성합니다.'}
    ]},
    {id:'project-03',name:'프로젝트명 3',category:'',intro:'프로젝트 콘텐츠 준비 중',sections:[]},
    {id:'project-04',name:'프로젝트명 4',category:'',intro:'프로젝트 콘텐츠 준비 중',sections:[]},
    {id:'project-05',name:'프로젝트명 5',category:'',intro:'프로젝트 콘텐츠 준비 중',sections:[]}
  ]
};
// Exact Figma home order and aspect ratios; no randomization on return.
const projectOrder = ['wisely','project-04','record','project-05','project-03'];
const widths = [84,168,112,90,179,112,84,149,112,168];
PORTFOLIO.gallery = Array.from({length:60},(_,i)=>({id:`image-${String(i+1).padStart(2,'0')}`,project:projectOrder[i%5],label:`IMAGE ${String(i+1).padStart(2,'0')}`,src:'',alt:'',width:widths[i%10],height:112}));
PORTFOLIO.projects.forEach(p=>{
  // A null URL means this project has no published detail content yet.
  p.detailPath = p.sections.length ? `/project/${p.id}` : null;
  p.hero = p.hero || {id:'hero',label:`${p.name} 대표 비주얼`,src:'',ratio:'16/9'};
  p.sections.forEach(s=>(s.images||[]).forEach(im=>{im.src=im.src||'';im.alt=im.alt||'';}));
});
