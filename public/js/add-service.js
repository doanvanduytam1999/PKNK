
console.log(tbl);
function addService() {
  const tbl =  document.querySelector('.tbody');
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  const td = document.createElement('td');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const input = document.createElement('input');
  const input1 = document.createElement('input');
  const input2 = document.createElement('input');
  const input3 = document.createElement('input');
  th.setAttribute("scope","row")
  input.className='input_data';
  input1.className='input_data'
  input2.className='input_data'
  input3.className='input_data'

  th.appendChild(input)
  td.appendChild(input1);
  td1.appendChild(input2);
  td2.appendChild(input3);
  tr.appendChild(th);
  tr.appendChild(td);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tbl.appendChild(tr);
}
function deleteService(){
  const listText = document.querySelectorAll("tr");
  if(listText.length > 2){
    listText[listText.length - 1].remove();
  }
  else
  {
    alert("Mặc định không xóa nội dung đầu tiên");
  }
}