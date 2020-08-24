var password = 'A|t';
var user = 'adm';
var newUser = '';
var newPass = '';
var contPass = 0;
var contUser = 0;

var infoLocalStorgare = JSON.parse(localStorage.getItem('@forceBrute/info'));

console.log(infoLocalStorgare);

if (infoLocalStorgare) {
  var root = document.getElementById('root');

  if (root) {
    root.innerHTML = `
      <div class="results">
        <h2>Usuário</h2>
        <span>Foi testado para o usuário: ${infoLocalStorgare.user}</span>
        <strong>${infoLocalStorgare.contUser} vezes</strong>
      </div>
      <div class="results">
        <h2>Senha</h2>
        <span>Foi testado para a senha: ${infoLocalStorgare.password}</span>
        <strong>${infoLocalStorgare.contPass} vezes</strong>
      </div>
    `;
  }
}

function forceBrutePass() {
  text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.+-*/!@#$%&*()_-{}|';

  for (var i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  newPass = text;

  if (password === text) {
    return;
  }

  contPass++;

  return text;
}

function forceBruteUser() {
  text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.+-*/!@#$%&*()_-{}|';

  for (var i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  newUser = text;

  if (user === text) {
    return;
  }

  contUser++;
  return text;
}

const handleForce = () => {
  var code = document.getElementById('code');
  var loading = document.getElementById('loading');

  code.style.display = 'none';
  loading.style.display = 'inline-block';

  do {
    forceBrutePass();
  } while (password !== newPass);

  do {
    forceBruteUser();
  } while (user !== newUser);

  if (password === newPass && user === newUser) {
    const info = {
      password,
      contPass,
      user,
      contUser,
    };

    localStorage.setItem('@forceBrute/info', JSON.stringify(info));

    setTimeout(() => {
      window.location.href = './results.html';
    }, 1500);
  }
};
