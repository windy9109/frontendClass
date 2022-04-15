/**
 * 
 */
 
/* var boardWrite = function(){
	data : $('#ff').serializeJSON(),
	success: function(res){ 
		  성공하면
		  listServer(1)
	}
	
}*/
 
 var boardUpdate = function(){
	 $.ajax({
		url : '/board0/HitUpdate.do',
		type : 'get',
		data : board,
		success: function(res){ 
			//db 성공 하면 화면 수정
			//alert(res.sw);
			if(res.sw == "성공"){
				hit = $(target).parents('.card').find('.bhit');
				vhit = paresInt($(hit).text()) + 1;
				$(hit).text(vhit);
					
			}
			
		},
		 error: function(xhr){
			alert("상태: "+xhr.status);
		 },
		 dataType: 'json'
		
		
	})
}

 
 
var readHit = function(target){
	 $.ajax({
		url : '/board0/HitUpdate.do',
		type : 'get',
		data : { "num" : actionIdx },
		success: function(res){ 
			//db 성공 하면 화면 수정
			//alert(res.sw);
			if(res.sw == "성공"){
				hit = $(target).parents('.card').find('.bhit');
				vhit = paresInt($(hit).text()) + 1;
				$(hit).text(vhit);
					
			}
			
		},
		 error: function(xhr){
			alert("상태: "+xhr.status);
		 },
		 dataType: 'json'
		
		
	})
}

 
  var replyUpdate = function(target){
	 $.ajax({
		url : '/board0/ReplyUpdate.do',
		type : 'post',
		data : reply,
		success: function(res){ 
			if(res.sw == "성공"){
				vp3.html(modishow);
			}
			//성공 했으면 화면에서 삭제한다.
			
		},
		 error: function(xhr){
			alert("상태: "+xhr.status);
		 },
		 dataType: 'json'
		
		
	})
}



 
 var replyDelete = function(target){
	 $.ajax({
		url : '/board0/ReplyDelete.do',
		type : 'get',
		data : {
			"renum" : actionIdx
		},
		success: function(res){ 
			//alert(res.sw);
			//화면에서 지우기
			$(target).parents('.rcode').remove();
		},
		 error: function(xhr){
			alert("상태: "+xhr.status);
		 },
		 dataType: 'json'
		
		
	})
}
 
 var replyList = function(target){
	//target변수는 등록버튼 또는 제목의 a태그
	
	$.ajax({
		url : '/board0/ReplyList.do',
		type : 'get',
		data : {
			"bonum" : actionIdx
		},
		success: function(res){
	
	
			//댓글출력
			rcode = "";
			
			$.each(res,function(i, v){
				
				   rcode += '     <div class="rcode">';
				   rcode += '     	<p class= "p1">';
				   rcode += '     		작성자: '+v.name+' &nbsp;&nbsp;&nbsp;';
				   rcode += '     		날짜: '+v.redate+' &nbsp;&nbsp;&nbsp;';
				   rcode += '     	</p>';
				   rcode += '     	<p class= "p2">';
				   rcode += '     		<input idx="'+v.renum+'" type ="button" class="action" name="r_modify" value="댓글수정">';
				   rcode += '     		<input idx="'+v.renum+'" type ="button" class="action" name="r_delete" value="댓글삭제">';
				   rcode += '     	</p>';
				   rcode += '     	<hr>';
				   rcode += '     	<p class= "p3">';
				   rcode += v.cont.replace(/\r/g,"").replace(/\n/g,"<br>");
				   rcode += '     	</p>';
				   rcode += '     </div>';
				   
				   cardBody =  $(target).parents('.card').find('.card-body').append(rcode);
				   cardBody.find('.rcode').remove();
				   cardBody.append(rcode);
			   
			   })
			   
		 },
		 error: function(xhr){
			alert("상태: "+xhr.status);
		 },
		 dataType: 'json'
		 
		   
	})
}
 var replyInsert = function(target){
	$.ajax({
		url : '/board0/ReplyInsert.do',
		type : 'post',
		data : reply, //reply객체 - bonum, name, cont
		success: function(res){
			alert(res.sw);
			
			//댓글출력
			replyList(target);
			   
			   
			   
		},
		error: function(xhr){
			alert("상태: "+xhr.status);
		},
		dataType: 'json'
		
		
	})
}
 
 
 
 var boardDelete = function(){
		typevalue = $('#stype option:selected').val().trim();
		wordvalue = $('#sword').val().trim();
		
		$.ajax({
			url: '/board0/BoardDelete.do',
			type: 'post',
			data: {
				"page" : currentPage,
				"num" : actionIdx,
				"type" : typevalue,
				"word" : wordvalue
			},
			success: function(res){
				if(res.sw == "ok"){
					//새로 구한 전체페이지(6) < 현재페이지(7)
					if(res.totalp < currentPage){
							currentPage = sw.totalp;
					}		
					listServer();
				}else{
					alert("삭제실패");
				}
			},
			error: function(xhr){
				alert("상태: "+xhr.status); //200, 404, 500
			},
			dataType:'json'
		})
}
 
 var listServer = function(){
	
	$.ajax({
		url : '/board0/List.do',
		type: 'post',
		data: {
			'page' : currentPage,
			 'stype' : typevalue, //writer, content
			 'sword' : wordvalue
		},
		success: function(res) {
			
			code = "<div id='accordion'>";
			
			
			$.each(res.datas, function(i,v) {
			   code += '<div class="card" >';
			   code += '   <div class="card-header action" name="title" idx="'+v.num+'">';
			   code += '     <a class="card-link" data-toggle="collapse" href="#collapse'+ v.num +'">';
			   code += v.subject + '</a>';
			   code += '   </div>';
			   code += '   <div id="collapse'+ v.num +'" class="collapse" data-parent="#accordion">';
			   code += '     <div class="card-body">';
			   code += '     	<p class= "p1">';
			   code += '     		작성자: <span class="bwr">'+v.writer+'</span>&nbsp;&nbsp;&nbsp;';
			   code += '     		이메일: <span class="bma">'+v.mail+'</span>&nbsp;&nbsp;&nbsp;';
			   code += '     		날짜: <span class="bda">'+v.wdate+'</span>&nbsp;&nbsp;&nbsp;';
			   code += '     		조회수: <span class="bhit">'+v.hit+'</span>&nbsp;&nbsp;&nbsp;';
			   code += '     	</p>';
			   code += '     	<p class= "p2">';
			   code += '     		<input idx="'+v.num+'" type ="button" class="action" name="modify" value="수정" data-toggle="modal" data-target="#modiModal">';
			   code += '     		<input idx="'+v.num+'" type ="button" class="action" name="delete" value="삭제">';
			   code += '     	</p>';
			   code += '     	<hr>';
			   code += '     	<p class= "p3">';
			   code += v.content;
			   code += '     	</p>';
			   code += '     	<p class= "p4">';
			   code += '     		<textarea rows="" cols="80"></textarea>';
			   code += '     		<input idx="'+v.num+'" type="button" class="action" name="reply" value="등록">';
			   code += '     	</p>';
			   code += '     </div>';
			   code += '   </div>';
			   code += ' </div>';
				
			})//반복문
			
			code += '</div>';
			
			
			$('.container').html(code);
			
			
			pcode="";
			//이전버튼 출력 
			if(res.startp > 1){
			 pcode +=   '<ul class="pagination">';     			
  			 pcode += '<li class="page-item"><a class="page-link prev" href="#">Previous</a></li></ul>';
			 	
			}
			pcode +='<ul class="pagination pager">';						
			//페이지 목록 출력
			for(i = res.startp; i<=res.endp ; i++){
				if(currentPage ==i){
				pcode += ' <li class="page-item active"><a class="page-link pnum" href="#">'+i+'</a></li>';	
				}else{
					
				pcode += '<li class="page-item"><a href="#" class="page-link pnum">'+i+'</a></li>';
					
				}
			}
			pcode +='</ul>';
			
			//다음 버튼 출력
			if(res.endp <res.totalp){
			 pcode +=   '<ul class="pagination">';     			
  			 pcode += '<li class="page-item"><a href="#" class="page-link next">next</a></li></ul>';
			}
			
			
			$('#pagelist').html(pcode);
			
			
		},
		error: function(vhr) {
			alert("상태: "+vhr.status);
		},
		dataType: 'json'
		
	})//ajax
	
}//listServer
 
 