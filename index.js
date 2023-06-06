//тренировка
/* fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json)); */

//1//
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
  //действия в случае ошибки
  .catch((err) => {
    console.log("Произошла ошибка" + err);
    container.innerHTML = `Ой, произошла ошибка! Обратитесь в техподдержку.`;
  });

//2//
// получаем элементы на странице
const postInputTitle = document.querySelector(".posts__input-title"); //поле ввода заголовка новой статьи
const postInputText = document.querySelector(".posts__input-text"); //поле ввода текста новой статьи
const btn = document.querySelector(".button__btn"); //кнопка "Добавить новую статью"

// вешаем обработчик события на кнопку для отправки информации
btn.addEventListener("click", () => {
  //проверяем поле ввода заголовка статьи на пустоту
  if (postInputTitle.value.trim() === "") {
    //если поле ввода пустое или состоит только из пробелов
    return; // прекратить выполнение функции
  }
  //проверяем поле ввода текста статьи на пустоту
  if (postInputText.value.trim() === "") {
    //если поле ввода пустое или состоит только из пробелов
    return; // прекратить выполнение функции
  }

  //отправляем данные на сервер
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: `${postInputTitle.value}`,
      body: `${postInputText.value}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      //если запрос успешный, создаем новую статью на странице и добавляем ее к существующим
      if (response.ok) {
        response.json().then((element) => {
          const newpostElement = createPostNew(element);
          container.append(newpostElement);
        });
      }
    })
    .catch((error) => {
      //если запрос неуспешный, выдаем сообщение об ошибке
      console.log("Произошла ошибка" + err);
      container.innerHTML += `Ой, произошла ошибка! Обратитесь в техподдержку.`;
    });

  //очищаем поля ввода заголовка и текста новой статьи
  postInputTitle.value = "";
  postInputText.value = "";
});

//функция для создания нового контента
function createPostNew(element) {
  const postElement = document.createElement("div");
  postElement.classList.add("container__article");
  postElement.innerHTML = `
                <p class ="container__article-title">Заголовок: ${element.title}</p> 
                <p>Статья:</p> 
                <p>${element.body}</p>
                `;
  return postElement;
}
