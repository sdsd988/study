// 할 일 목록 상태
let todos = [];
let nextId = 1;

// DOM 요소
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const remainingCount = document.getElementById("remaining-count");

// 화면 렌더링
function render() {
  list.innerHTML = "";

  if (todos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-message";
    empty.textContent = "할 일이 없습니다.";
    list.appendChild(empty);
  }

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item" + (todo.completed ? " completed" : "");
    item.dataset.id = todo.id;

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;
    text.addEventListener("click", () => toggleTodo(todo.id));

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "복사";
    copyBtn.addEventListener("click", () => copyTodo(todo.text));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    item.appendChild(text);
    item.appendChild(copyBtn);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });

  const remaining = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `남은 할 일: ${remaining}개`;
}

// 할 일 추가
function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  todos.push({
    id: nextId++,
    text: trimmed,
    completed: false,
  });

  render();
}

// 완료 토글
function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  render();
}

// 할 일 텍스트 클립보드 복사
function copyTodo(text) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text).catch(() => {});
}

// 할 일 삭제
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  render();
}

// 폼 제출 이벤트
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(input.value);
  input.value = "";
  input.focus();
});

// 최초 렌더링
render();
