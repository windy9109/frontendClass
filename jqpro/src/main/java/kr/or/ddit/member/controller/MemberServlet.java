package kr.or.ddit.member.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.buyer.service.IBuyerService;
import kr.or.ddit.buyer.service.IBuyerServiceImpl;
import kr.or.ddit.buyer.vo.BuyerVo;
import kr.or.ddit.member.service.IMemberService;
import kr.or.ddit.member.service.MemberServicelmpl;
import kr.or.ddit.member.vo.MemberVo;

/**
 * Servlet implementation class MemberServlet
 */
@WebServlet("/MemberServlet.do")
public class MemberServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MemberServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		//전송시(요청시) 데이타받기

		//service객체 얻기
		IMemberService  service = MemberServicelmpl.getInstance();
		
		//service메소드 호출 - 결과를 얻는다.
		List<MemberVo> list = service.selectAll(); 
		
		//결과를 가지고 출력 또는 응답데이터(text, json, xml)를 생성한다.
		//view페이지로 이동
		//view페이지와 결과값을 공유하기 위해서 request에 저장
		//KEY값과 VAL값
		request.setAttribute("listvalue", list);
		
		//view페이지로 forward
		request.getRequestDispatcher("0329/memberList.jsp").forward(request, response);
		
	}
	
	

	
	
	

}
