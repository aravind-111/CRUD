async function get_details() {
  const main_data = await fetch(
    'https://611f26339771bf001785c726.mockapi.io/users'
  );
  const data = await main_data.json();
  console.log(data);
  document.querySelector('.user-list').innerHTML = ``;
  data.forEach((i) => user_details(i));
}

function user_details(data) {
  const pic = document.createElement('img');
  pic.src = data.avatar;
  pic.className = 'pic';

  const info = document.createElement('div');
  info.setAttribute('class', 'info');

  info.innerHTML = `
    <p class="details"><strong>Name: </strong>${data.name}</p>
    <p class="details"><strong>Date Joined: </strong>${new Date(
      data.createdAt
    ).toDateString()}</p>
    <button class="button" onClick="delete_details(${data.id})">delete</button>
    `;

  const container = document.createElement('div');
  container.className = 'container';
  container.append(pic, info);
  document.querySelector('.user-list').append(container);
}

// get_details();

async function delete_details(id) {
  const main_data = await fetch(
    'https://611f26339771bf001785c726.mockapi.io/users/' + id,
    { method: 'DELETE' }
  );
  const data = await main_data.json();
  console.log(data);
  get_details();
}
delete_details();

let user_name = 0;
let user_pic = 0;

function add_username(event) {
  user_name = event.target.value;
  // console.log(user_name);
}

function add_avatar(event) {
  user_pic = event.target.value;
  // console.log(`"${user_pic}"`);
}

function add_user() {
  fetch('https://611f26339771bf001785c726.mockapi.io/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user_name,
      avatar: user_pic,
      createdAt: new Date().toDateString(),
    }),
  })
    .then((data) => data.json())
    .then((user) => console.log(user));
  get_details();
  console.log(data);
}

// function edit_user() {}
