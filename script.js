document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todo-list');
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
  
    addBtn.addEventListener('click', function() {
      addTodo();
    });
  
    todoInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        addTodo();
      }
    });
  
    // Saqlangan todo'lar bo'yicha localStorage'dan o'qish
    loadSavedTodos();
  
    function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText !== '') {
        addTodoItem(todoText);
        todoInput.value = '';
  
        // Saqlangan todo'lar bo'yicha localStorage'ga yozish
        saveTodos();
      }
    }
  
    function addTodoItem(text) {
      const listItem = document.createElement('li');
      listItem.className = 'todo-item';
      listItem.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${text}</span>
        <button class="remove-btn">Remove</button>
      `;
      
      const checkbox = listItem.querySelector('.checkbox');
      const removeBtn = listItem.querySelector('.remove-btn');
  
      checkbox.addEventListener('change', function() {
        listItem.classList.toggle('checked', checkbox.checked);
  
        // Saqlangan todo'lar bo'yicha localStorage'ga yozish
        saveTodos();
      });
  
      removeBtn.addEventListener('click', function() {
        todoList.removeChild(listItem);
  
        // Saqlangan todo'lar bo'yicha localStorage'ga yozish
        saveTodos();
      });
  
      // Yangi todo elementini pastga qo'shamiz
      todoList.appendChild(listItem);
    }
  
    // Saqlangan todo'lar bo'yicha localStorage'dan o'qish
    function loadSavedTodos() {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      for (const todoText of savedTodos) {
        addTodoItem(todoText);
      }
    }
  
    // Saqlangan todo'lar bo'yicha localStorage'ga yozish
    function saveTodos() {
      const todos = Array.from(document.querySelectorAll('.todo-item span')).map(span => span.textContent);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  });
  