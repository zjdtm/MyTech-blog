import Post from './models/post.js';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map((i) => ({
    title: `포스트${i}`,
    body: '다솜 포도 소솜 로운 도서 노트북 아슬라 별하 비나리 안녕 바람꽃 별하 나래 미리내 다솜 함초롱하다 미리내 컴퓨터 컴퓨터 도르레 늘품 옅구름 아련 늘품 가온해 노트북 늘품 책방 아슬라 노트북 비나리 아리아 감사합니다 사과 여우비 우리는 가온누리 아슬라 바나나 아름드리 바나나 별빛 감또개 산들림 별빛 산들림 바나나 감사합니다 여우별 아슬라.',
    tags: ['가짜', '데이터'],
  }));

  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}
