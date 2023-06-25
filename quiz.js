window.onload=getQuiz;
var temp = 0;


function getQuiz() {
	var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (temp == 0 && xhr.readyState == 4 && xhr.status == 200) {
      processQuiz(xhr);
    }
    else if(temp == 1 && xhr.readyState == 4 && xhr.status == 200){
      gradeQuiz(xhr);
    }

    
  };
  xhr.open("GET", "FinalQuiz.xml", true);
  xhr.send();
	
}

function processQuiz(xhr){

    var i;
    var xmldoc = xhr.responseXML;
    var question = "";
    var x = xmldoc.getElementsByTagName("question");
    var a = 1;
    
    for (i = 0; i <x.length; i++) { 

        question+= "Question: " +
        x[i].getElementsByTagName("qnumber")[0].childNodes[0].nodeValue + "<br>" + "<br>" +
        x[i].getElementsByTagName("qtitle")[0].childNodes[0].nodeValue + "<br>" + "<br>" +
        '<input  id="A" type="radio" value="a" name="Q' + a +'">' + x[i].getElementsByTagName("a")[0].childNodes[0].nodeValue + "<br>" +
	      '<input  id="B" type="radio" value="b" name="Q' + a +'">' + x[i].getElementsByTagName("b")[0].childNodes[0].nodeValue + "<br>" +
        '<input  id="C" type="radio" value="c" name="Q' + a +'">' + x[i].getElementsByTagName("c")[0].childNodes[0].nodeValue + "<br>" +
	      '<input  id="D" type="radio" value="d" name="Q' + a +'">' + x[i].getElementsByTagName("d")[0].childNodes[0].nodeValue + "<br>" + "<br>";

        a++;
    }

    document.getElementById("display").innerHTML = question;
    temp = 1;

}

function gradeQuiz(xhr){

  var i;
  var p = 0;
  var grade = 0;
  var output = "";
  var xmldoc = xhr.responseXML;
  var x = xmldoc.getElementsByTagName("finalquiz");

  var Q1Answer=document.querySelector('input[name=Q1]:checked').value; 
  var Q2Answer=document.querySelector('input[name=Q2]:checked').value; 
  var Q3Answer=document.querySelector('input[name=Q3]:checked').value; 
  var Q4Answer=document.querySelector('input[name=Q4]:checked').value;
  var Q5Answer=document.querySelector('input[name=Q5]:checked').value;  

  const selectedAnswers = [Q1Answer, Q2Answer, Q3Answer, Q4Answer, Q5Answer];
  var s = x[p].getElementsByTagName("rightanswers")[0].childNodes[0].nodeValue;
  const rightAnswers = s.split(",");

  for(i = 0; i<rightAnswers.length; i++){
    if(selectedAnswers[i]==rightAnswers[i]){
      grade++;
    }
  }
  output = "<br>" + "Grade: " + grade + "/5";  
  document.getElementById("totalGrade").innerHTML = output;
  
}


