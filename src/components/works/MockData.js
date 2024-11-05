const tabList = [
  '전체',
  '애니메이션',
  '설치미술',
  '미디어 아트',
  '인터렉티브 아트',
  '사운드',
  '입체조형',
  '애플리케이션',
  '게임',
  '비디오',
  '웹사이트'
]

export const worksData = [
  {
    id: 0,
    category: tabList[1],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '코끼리를 냉장고에 넣는 23가지 방법',
      title_eng: '23 Ways to Put an Elephant in the Fridge'
    },
    team: {
      team_kor: '팀 코끼리',
      team_eng: 'Team Elephant',
      names: ['최서강', '한지융', '김아텍'],
      team_desc: '팀 코끼리는 코끼리 관련 프로젝트에 전문화된 팀입니다.'
    },
    summary: '코끼리를 냉장고에 넣는 방법을 다룬 작품입니다.',
    desc: '이 작품은 창의적이고 유머러스한 방법으로 코끼리를 냉장고에 넣는 다양한 시도를 설명합니다.',
    location: 'X423',
    urls: {
      web: 'http://localhost:3000',
      instagram: 'www.instagram.com/team_elephant'
    },
    works: {
      desc: '이 작품은 여러 단계로 나누어 설명되어 있으며, 각 단계마다 사진과 함께 진행합니다.'
    }
  },
  {
    id: 1,
    category: tabList[2],
    imgUrl: '/images/works/Rectangle13.jpg',
    title: {
      title_kor: 'MearMear',
      title_eng: 'MearMear'
    },
    team: {
      team_kor: '팀 3D',
      team_eng: 'Team 3D',
      names: ['이수민', '김지훈', '박지영'],
      team_desc: '3D 모델링과 애니메이션 전문 팀입니다.'
    },
    summary: '3D 애니메이션 작품 MearMear입니다.',
    desc: '이 작품은 독특한 스토리라인과 매력적인 캐릭터로 구성된 3D 애니메이션입니다.',
    location: 'X524',
    urls: {
      web: 'http://localhost:3000/mearmear',
      instagram: 'www.instagram.com/team3D'
    },
    works: {
      desc: '각 장면의 디테일한 설명과 캐릭터의 발전 과정을 담고 있습니다.'
    }
  },
  {
    id: 2,
    category: tabList[1],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '코끼리를 냉장고에 넣는 23가지 방법',
      title_eng: '23 Ways to Put an Elephant in the Fridge'
    },
    team: {
      team_kor: '팀 코끼리',
      team_eng: 'Team Elephant',
      names: ['최서강', '한지융', '김아텍'],
      team_desc: '팀 코끼리는 코끼리 관련 프로젝트에 전문화된 팀입니다.'
    },
    summary: '코끼리를 냉장고에 넣는 방법을 다룬 작품입니다.',
    desc: '이 작품은 창의적이고 유머러스한 방법으로 코끼리를 냉장고에 넣는 다양한 시도를 설명합니다.',
    location: 'X423',
    urls: {
      web: 'http://localhost:3000',
      instagram: 'www.instagram.com/team_elephant'
    },
    works: {
      desc: '이 작품은 여러 단계로 나누어 설명되어 있으며, 각 단계마다 사진과 함께 진행합니다.'
    }
  },
  {
    id: 3,
    category: tabList[2],
    imgUrl: '/images/works/Rectangle13.jpg',
    title: {
      title_kor: 'MearMear',
      title_eng: 'MearMear'
    },
    team: {
      team_kor: '팀 3D',
      team_eng: 'Team 3D',
      names: ['이수민', '김지훈', '박지영'],
      team_desc: '3D 모델링과 애니메이션 전문 팀입니다.'
    },
    summary: '3D 애니메이션 작품 MearMear입니다.',
    desc: '이 작품은 독특한 스토리라인과 매력적인 캐릭터로 구성된 3D 애니메이션입니다.',
    location: 'X524',
    urls: {
      web: 'http://localhost:3000/mearmear',
      instagram: 'www.instagram.com/team3D'
    },
    works: {
      desc: '각 장면의 디테일한 설명과 캐릭터의 발전 과정을 담고 있습니다.'
    }
  },
  {
    id: 4,
    category: tabList[1],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '작품 제목 4',
      title_eng: 'Work Title 4'
    },
    team: {
      team_kor: '팀 예시 1',
      team_eng: 'Team Example 1',
      names: ['홍길동', '이몽룡', '성춘향'],
      team_desc: '팀 예시 1은 다양한 장르의 작품을 만듭니다.'
    },
    summary: '작품 제목 4의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X123',
    urls: {
      web: 'http://localhost:3000/work4',
      instagram: 'www.instagram.com/example1'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 5,
    category: tabList[2],
    imgUrl: '/images/works/Rectangle13.jpg',
    title: {
      title_kor: '작품 제목 5',
      title_eng: 'Work Title 5'
    },
    team: {
      team_kor: '팀 예시 2',
      team_eng: 'Team Example 2',
      names: ['김유신', '강감찬', '이순신'],
      team_desc: '팀 예시 2는 역사적인 주제를 다룹니다.'
    },
    summary: '작품 제목 5의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X456',
    urls: {
      web: 'http://localhost:3000/work5',
      instagram: 'www.instagram.com/example2'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 6,
    category: tabList[1],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '작품 제목 6',
      title_eng: 'Work Title 6'
    },
    team: {
      team_kor: '팀 예시 3',
      team_eng: 'Team Example 3',
      names: ['정약용', '안중근', '윤봉길'],
      team_desc: '팀 예시 3는 혁신적인 아이디어를 선보입니다.'
    },
    summary: '작품 제목 6의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X789',
    urls: {
      web: 'http://localhost:3000/work6',
      instagram: 'www.instagram.com/example3'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 7,
    category: tabList[3],
    imgUrl: '/images/works/Rectangle13.jpg',
    title: {
      title_kor: '작품 제목 7',
      title_eng: 'Work Title 7'
    },
    team: {
      team_kor: '팀 예시 4',
      team_eng: 'Team Example 4',
      names: ['허균', '김홍도', '이인직'],
      team_desc: '팀 예시 4는 문학과 예술을 융합한 작품을 만듭니다.'
    },
    summary: '작품 제목 7의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X331',
    urls: {
      web: 'http://localhost:3000/work7',
      instagram: 'www.instagram.com/example4'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 8,
    category: tabList[1],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '작품 제목 8',
      title_eng: 'Work Title 8'
    },
    team: {
      team_kor: '팀 예시 5',
      team_eng: 'Team Example 5',
      names: ['최범석', '이상화', '정몽주'],
      team_desc: '팀 예시 5는 사회 문제를 다루는 작품을 만듭니다.'
    },
    summary: '작품 제목 8의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X654',
    urls: {
      web: 'http://localhost:3000/work8',
      instagram: 'www.instagram.com/example5'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 9,
    category: tabList[3],
    imgUrl: '/images/works/Rectangle13.jpg',
    title: {
      title_kor: '작품 제목 9',
      title_eng: 'Work Title 9'
    },
    team: {
      team_kor: '팀 예시 6',
      team_eng: 'Team Example 6',
      names: ['이태준', '김기림', '박경리'],
      team_desc: '팀 예시 6은 예술과 과학을 융합한 작품을 만듭니다.'
    },
    summary: '작품 제목 9의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X987',
    urls: {
      web: 'http://localhost:3000/work9',
      instagram: 'www.instagram.com/example6'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 10,
    category: tabList[4],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '작품 제목 10',
      title_eng: 'Work Title 10'
    },
    team: {
      team_kor: '팀 예시 7',
      team_eng: 'Team Example 7',
      names: ['김재명', '이강호', '박지윤'],
      team_desc: '팀 예시 7은 현대 예술을 실험합니다.'
    },
    summary: '작품 제목 10의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X852',
    urls: {
      web: 'http://localhost:3000/work10',
      instagram: 'www.instagram.com/example7'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 11,
    category: tabList[2],
    imgUrl: '/images/works/Rectangle13.jpg',
    title: {
      title_kor: '작품 제목 11',
      title_eng: 'Work Title 11'
    },
    team: {
      team_kor: '팀 예시 8',
      team_eng: 'Team Example 8',
      names: ['정해인', '김선호', '이민호'],
      team_desc: '팀 예시 8은 감성적인 작품을 만듭니다.'
    },
    summary: '작품 제목 11의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X159',
    urls: {
      web: 'http://localhost:3000/work11',
      instagram: 'www.instagram.com/example8'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 12,
    category: tabList[4],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '작품 제목 12',
      title_eng: 'Work Title 12'
    },
    team: {
      team_kor: '팀 예시 9',
      team_eng: 'Team Example 9',
      names: ['김희선', '이보영', '장나라'],
      team_desc: '팀 예시 9는 독창적인 아이디어로 가득 찬 팀입니다.'
    },
    summary: '작품 제목 12의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X369',
    urls: {
      web: 'http://localhost:3000/work12',
      instagram: 'www.instagram.com/example9'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 13,
    category: tabList[2],
    imgUrl: '/images/works/Rectangle13.jpg',
    title: {
      title_kor: '작품 제목 13',
      title_eng: 'Work Title 13'
    },
    team: {
      team_kor: '팀 예시 10',
      team_eng: 'Team Example 10',
      names: ['정유미', '박보검', '이제훈'],
      team_desc: '팀 예시 10은 대중과 소통하는 작품을 만듭니다.'
    },
    summary: '작품 제목 13의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X258',
    urls: {
      web: 'http://localhost:3000/work13',
      instagram: 'www.instagram.com/example10'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 14,
    category: tabList[4],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '작품 제목 14',
      title_eng: 'Work Title 14'
    },
    team: {
      team_kor: '팀 예시 11',
      team_eng: 'Team Example 11',
      names: ['이정재', '전지현', '송중기'],
      team_desc: '팀 예시 11은 다양한 형식의 예술 작품을 만듭니다.'
    },
    summary: '작품 제목 14의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X471',
    urls: {
      web: 'http://localhost:3000/work14',
      instagram: 'www.instagram.com/example11'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 15,
    category: tabList[2],
    imgUrl: '/images/works/Rectangle13.jpg',
    title: {
      title_kor: '작품 제목 15',
      title_eng: 'Work Title 15'
    },
    team: {
      team_kor: '팀 예시 12',
      team_eng: 'Team Example 12',
      names: ['김하늘', '이상우', '정해인'],
      team_desc: '팀 예시 12는 현대적이고 실험적인 작품을 만듭니다.'
    },
    summary: '작품 제목 15의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X684',
    urls: {
      web: 'http://localhost:3000/work15',
      instagram: 'www.instagram.com/example12'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 16,
    category: tabList[1],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '작품 제목 16',
      title_eng: 'Work Title 16'
    },
    team: {
      team_kor: '팀 예시 13',
      team_eng: 'Team Example 13',
      names: ['강동원', '이민정', '송혜교'],
      team_desc: '팀 예시 13은 감성적인 이야기로 작품을 만듭니다.'
    },
    summary: '작품 제목 16의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X965',
    urls: {
      web: 'http://localhost:3000/work16',
      instagram: 'www.instagram.com/example13'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 17,
    category: tabList[2],
    imgUrl: '/images/works/Rectangle13.jpg',
    title: {
      title_kor: '작품 제목 17',
      title_eng: 'Work Title 17'
    },
    team: {
      team_kor: '팀 예시 14',
      team_eng: 'Team Example 14',
      names: ['조인성', '김태희', '이병헌'],
      team_desc: '팀 예시 14는 새로운 시도를 두려워하지 않습니다.'
    },
    summary: '작품 제목 17의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X864',
    urls: {
      web: 'http://localhost:3000/work17',
      instagram: 'www.instagram.com/example14'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  },
  {
    id: 18,
    category: tabList[1],
    imgUrl: '/images/works/Rectangle.jpg',
    title: {
      title_kor: '작품 제목 18',
      title_eng: 'Work Title 18'
    },
    team: {
      team_kor: '팀 예시 15',
      team_eng: 'Team Example 15',
      names: ['안성기', '배종옥', '한예슬'],
      team_desc: '팀 예시 15는 고전과 현대를 아우르는 작품을 만듭니다.'
    },
    summary: '작품 제목 18의 간단한 설명입니다.',
    desc: '작품에 대한 자세한 설명입니다.',
    location: 'X753',
    urls: {
      web: 'http://localhost:3000/work18',
      instagram: 'www.instagram.com/example15'
    },
    works: {
      desc: '작품의 세부 내용과 팀의 비전에 대한 설명입니다.'
    }
  }
]
