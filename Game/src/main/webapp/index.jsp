<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
 
<head>
	<meta charset="UTF-8">
	<title>HTML5 API Drag and Drop</title>
	<style>
		div {
			width: 180px;
			height: 280px;
			margin: 10px;
			padding: 10px;
			border: solid 15px #8B4513;
			float: left;
		}
	</style>
</head>
 
<body>
 
	<h1>드래그 앤 드롭을 이용한 객체의 이동</h1>
 
	<p>모나리자 그림을 드래그해서 옆의 사각형으로 옮겨보세요!</p>
 
	<div 
    	ondrop="drop(event)" 
    	ondragover="dragEnter(event)"
    >
		<img 
          id="monalisa" 
          width="180" height="280" 
          src="/examples/images/img_monalisa.png" 
          draggable="true" 
          ondragstart="drag(event)"
        >
	</div>
    
	<div 
      ondrop="drop(event)" 
      ondragover="dragEnter(event)"
    >
    </div>
 
	<script>
		function dragEnter(ev) {
			ev.preventDefault();
		}
 
		function drag(ev) {
			ev.dataTransfer.setData("text", ev.target.id);
		}
 
		function drop(ev) {
			ev.preventDefault();
			var data = ev.dataTransfer.getData("text"); // img태그 아이디를 가져옴
			ev.target.appendChild(document.getElementById(data)); // 다른 div태그에 img를 추가함(옮김. 드래그처리)
		}
	</script>
 
</body>
 
</html>