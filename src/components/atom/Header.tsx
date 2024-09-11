// 신상품, 베스트, 계정, 로그인, 관심목록, 회원가입, 검색, 장바구니,
function Header() {
  return (
    <div className="w-full flex justify-between duration-300 transition-all hover:h-48 origin-top animate-dropdown">
      <div>logo</div>
      <p className="text-xs h-6 flex items-center justify-center">신상품</p>
      <p className="text-xs h-6 flex items-center justify-center">베스트</p>
      <p className="text-xs h-6 flex items-center justify-center">계정</p>
      <p className="text-xs h-6 flex items-center justify-center">로그인</p>
      <p className="text-xs h-6 flex items-center justify-center">관심목록</p>
      <p className="text-xs h-6 flex items-center justify-center">회원가입</p>
      <p className="text-xs h-6 flex items-center justify-center">검색</p>
      <p className="text-xs h-6 flex items-center justify-center">장바구니</p>
    </div>
  );
}

export default Header;
