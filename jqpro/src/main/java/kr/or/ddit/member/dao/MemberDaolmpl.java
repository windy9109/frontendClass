package kr.or.ddit.member.dao;

import java.sql.SQLException;
import java.util.List;

import com.ibatis.sqlmap.client.SqlMapClient;

import kr.or.ddit.ibatis.config.SqlMapClientFactory;
import kr.or.ddit.member.vo.MemberVo;
import kr.or.ddit.member.vo.ZipVo;

//mapper접근 - SqlMapClient객체가 필요
//dao클래스 객체 생성 - 리턴 - service에서 사용


public class MemberDaolmpl implements IMemberDao {

	private SqlMapClient client;
	private static IMemberDao dao;
	
	private MemberDaolmpl() {
		client = SqlMapClientFactory.getSqlMapClient();
	}
	
	public static IMemberDao getInstance() {
		if( dao == null ) dao = new MemberDaolmpl();
		return dao;
	}
	

	@Override
	public List<MemberVo> selectAll() {
		List<MemberVo> list = null;
		
		try {
			list = client.queryForList("member.selectAll");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String Count(String id) {
		String result = null;
		try {
			result = (String)client.queryForObject("member.Count", id);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public List<ZipVo> search(String data) {
		List<ZipVo> list = null;
		
		try {
			list = client.queryForList("zip.zipList", data);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	
	
	@Override
	public String save(MemberVo vo) {
			String result = null;
			try {
				result = (String) client.insert("member.Insert", vo);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return result;
		}
	
	
	}







