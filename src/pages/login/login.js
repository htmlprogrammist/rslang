import './login.css'

export const Login = () => {
  // переменные для быстрого доступа к инпутам и дате, изначально нулл, потом зададим значение
  let loginInputRef = null
  let passwordInputRef = null
  let formRef = null
  let data = null

  // при иницилизации сразу создаем html и вешаем обработчики
  const onInit = (anchor) => {
    const container = anchor.append(render())
    addEventListeners()
    return container
  }

  // вешаем обработчки событий
  const addEventListeners = () => {
    formRef.addEventListener('submit', (e) => {
      e.preventDefault()

      // по классу находим нужную кнопку и отправляем запрос
      if (e.submitter.classList.contains('login-control-buttonLogIn')) {
        logIn()
      }

      if (e.submitter.classList.contains('login-control-buttonCreateAcc')) {
        createAccount()
      }
    })

  }

  // функции логин и создать акк
  const createAccount = () => {
    fetch('https://afternoon-falls-25894.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //  а теперь благодаря ссылкам используем где надо.
        email: `${loginInputRef.value}`,
        password: `${passwordInputRef.value}`
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  const logIn = () => {
    fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //  а теперь благодаря ссылкам используем где надо.
        email: `${loginInputRef.value}`,
        password: `${passwordInputRef.value}`
      })
    })
      .then(res => res.json())
      .then(authentication => {
        data = authentication
        console.log(authentication)
      })
  }


  // получить токен
  const getData = () => ({
    data: () => data
  })

  const render = () => {
    // создаем элементы
    const container = document.createElement('div')
    const wrapper = document.createElement('div')
    const form = document.createElement('form')
    const loginInpCont = document.createElement('div')
    const loginLabel = document.createElement('label')
    const loginInput = document.createElement('input')
    const passwordInpCont = document.createElement('div')
    const passwordLabel = document.createElement('label')
    const passwordInput = document.createElement('input')
    const controlPanel = document.createElement('div')
    const btnLogIn = document.createElement('button')
    const btnCreateAcc = document.createElement('button')
    const backgroundImg = document.getElementById('app')
    const loginImage = document.createElement('i')
    const passwordImage = document.createElement('i')
    const headerLogin = document.createElement('div')
    const headerText = document.createElement('h3')

    // назначаем параметры
    wrapper.classList.add('rgba-stylish-strong')
    headerLogin.classList.add('form-header', 'purple-gradient')
    container.classList.add('login-form')
    backgroundImg.classList.add('view')
    form.method = 'POST'
    form.action = '#'
    loginInpCont.classList.add('login-input-cont')
    loginLabel.for = 'login'
    headerText.innerText = 'RS Lang Authorization'
    headerText.classList.add('white-text')
//      loginLabel.innerText = "Login:";
    loginInput.id = 'login'
    loginInput.classList.add('login-input')
    loginInput.type = 'text'
    passwordInpCont.classList.add('login-input-cont')
    passwordLabel.for = 'password'
//      passwordLabel.innerText = "Password:";
    passwordInput.id = 'password'
    passwordInput.classList.add('login-input')
    loginInput.placeholder = 'Login'
    passwordInput.placeholder = 'Password'
    passwordInput.type = 'password'
    controlPanel.classList.add('login-control')
    btnLogIn.type = 'submit'
    // btnLogIn.classList.add('login-control-btn')
    // btnLogIn.classList.add('login-control-buttonLogIn')
    btnLogIn.classList.add('btn', 'btn-lg')
    btnLogIn.innerText = 'LogIn'
    btnCreateAcc.type = 'submit'
    btnCreateAcc.classList.add('btn', 'btn-lg')
    //btnCreateAcc.classList.add('login-control-buttonCreateAcc')
    btnCreateAcc.innerText = 'Create Acc'
    passwordImage.classList.add('fas')
    loginImage.classList.add('fas')
    loginImage.classList.add('fa-user')
    loginImage.classList.add('prefix')
    loginImage.classList.add('pink-text')
    passwordImage.classList.add('fa-lock')
    passwordImage.classList.add('pink-text')
    passwordImage.classList.add('mt-2')
    passwordImage.classList.add('mb-2')

    // вставляем в дом в нужном порядке
    wrapper.append(container)
    container.append(headerLogin)
    headerLogin.append(headerText)
    container.append(form)
    form.append(loginInpCont)
    loginInpCont.append(loginImage)
    loginInpCont.append(loginInput)
    form.append(passwordInpCont)
    passwordInpCont.append(passwordImage)
    passwordInpCont.append(passwordInput)
    form.append(controlPanel)
    controlPanel.append(btnLogIn)
    controlPanel.append(btnCreateAcc)

    // делаем ссылки,чтоб потом переиспользовать
    formRef = form
    loginInputRef = loginInput
    passwordInputRef = passwordInput
    // возвращаем готовый элемент для вставки
    return wrapper
  }

  // отдаем обьект для управления, чтоб создать элемент или получить токен
  return {
    onInit,
    getData
  }
}