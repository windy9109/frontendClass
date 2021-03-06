package kr.or.ddit.member.dao;

import java.util.List;

import kr.or.ddit.member.vo.MemberVo;
import kr.or.ddit.member.vo.ZipVo;

public interface IMemberDao {

	
	public List<MemberVo> selectAll();
	
	//중복검사 메서드
	public String Count( String id );
	
	//우편번호 검색
	public List<ZipVo> search( String data );
	
	//저장하기
	public String save( MemberVo vo );
	
	
	
	
}
