dayNightTheme = () => {
  let date = new Date();
  let hour = date.getHours();

  if(hour >= 7 && hour < 19){
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
  else{
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  }
}

window.addEventListener('load', dayNightTheme);

document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key == "Enter") $.post("fetch.php", {input:input.value.toLowerCase()}, function(result){
      let data = JSON.parse(result)
      if(!data.results||data.results.length==0) apiRequest();
      else{
        console.log('Images loaded from Database!');
        loadImages(data);
      }
    });
});

document.querySelector("#search").addEventListener("click", () => {
    
    //check if the keyword already exists in the database
    $.post("fetch.php", {input:input.value.toLowerCase()}, function(result){
      let data = JSON.parse(result)
      if(!data.results||data.results.length==0) apiRequest();
      else{
        console.log('Images loaded from Database!');
        loadImages(data);
      }
    });

    //else make an api call and store results in database
  
    // apiRequest();

});

apiRequest = () => {
  console.log('API Call was made!');
  document.querySelector("#grid").textContent = "";
  let query = input.value;

  const url = 'https://api.unsplash.com/search/photos?query='+query+'&per_page=30&client_id=CzUoBDs9NrMm3CMUtHuF1H5VevJhr9OnvUhYIcGjGgw';
  
  return fetch(url)

  .then(response => {
    if (!response.ok) throw Error(response.statusText);
      return response.json();
   })

   .then(data => {
      loadImages(data);
      // console.log(data);
      $.post("connect.php", {input:query, results: JSON.stringify(data)}, function(result){
        console.log(result);
      });
   })

   .catch(error => console.log(error));   
}

loadImages = (data) => {
  document.querySelector("#grid").innerHTML = '';
  for(let i = 0;i < data.results.length;i++){
    let image = document.createElement("div");
    image.className = "img";
    image.style.backgroundImage = "url("+data.results[i].urls.raw + "&w=1366&h=768" +")";
    image.addEventListener("dblclick", function(){
      window.open(data.results[i].links.download, '_blank');
    })
    document.querySelector("#grid").appendChild(image);
  }
}
