fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

const container = document.querySelector(".container"); //находим элемент для добавления разметки
fetch("https://jsonplaceholder.typicode.com/posts") //отправляем запрос на сайт
  .then((response) => response.json()) //получаем список статей
  //.then((json) => console.log(json))
  .then((json) => {
    json.forEach((element) => {
      //создаем новую разметку и добавляем в нее список статей
      console.log(`Заголовок ${element.title}`);
      console.log(`Статья ${element.body}`);

      const div = document.createElement("div");
      div.classList.add("container__article");
      div.innerHTML = `
                <p class ="container__article-title">Заголовок: ${element.title}</p> 
                <p>Статья:</p> 
                <p>${element.body}</p>
                `;
      container.append(div);
    });
  })
  .catch((err) => {
    console.log("Произошла ошибка" + err);
    container.innerHTML = `Ой, произошла ошибка! Обратитесь в техподдержку.`;
  });
