package kr.or.ddit.member.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.member.service.IMemberService;
import kr.or.ddit.member.service.MemberServicelmpl;
import kr.or.ddit.member.vo.MemberVo;

/**
 * Servlet implementation class IdCheck
 */
@WebServlet("/IdCheck.do")
public class IdCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public IdCheck() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//1. 전송데이터 받기
		String input = request.getParameter("id");
		
		//2. service객체 생성하기
		IMemberService service = MemberServicelmpl.getInstance();
		
		//3. service 메소드 호출 - 결과값 받기
		//String id = setAttribute("list1", id);
		String id = service.Count(input); 
		
		//4. request에 저장
		request.setAttribute("listvalue", id);
		
		//view페이지로 forward
		request.getRequestDispatcher("member/idcheck.jsp").forward(request, response);
		
		
		//5. jsp로 포워드한다.
		
		
	}


}
