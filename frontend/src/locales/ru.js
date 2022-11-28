export default {
  translation: {
    toasts: {
      addChannel: 'Канал создан',
      renameChannel: 'Канал переименован',
      removeChannel: 'Канал удален',
      networkError: 'Ошибка сети',
    },
    chat: {
      channelsHeader: 'Каналы',
      messagesCount_one: '{{count}} сообщение',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
      sendBtn: 'Отправить',
      logOutBtn: 'Выйти',
      messageInputPlaceholder: 'Введите сообщение',
      dropdown: {
        rename: 'Переименовать',
        delete: 'Удалить',
      },
    },
    modals: {
      rename: {
        header: 'Переименовать канал',
        label: 'Название канала',
        inputPlaceholder: 'Введите название канала',
      },
      remove: {
        header: 'Удалить канал',
        modalText: 'Вы уверены?',
      },
      add: {
        header: 'Добавить канал',
        label: 'Название канала',
        inputPlaceholder: 'Введите название канала',
      },
      errors: {
        nameRequired: 'Введите название',
        nameLength: 'От 3 до 20 символов',
        nameUnique: 'Название должно быть уникальным',
      },
      buttons: {
        cancel: 'Отмена',
        submit: 'Отправить',
        delete: 'Удалить',
      },
    },
    loginPage: {
      header: 'Авторизация',
      username: 'Имя пользователя',
      usernamePlaceholder: 'Введите имя пользователя',
      password: 'Пароль',
      passwordPlaceholder: 'введите пароль',
      error: 'Неверное имя пользователя или пароль',
      signInBtn: 'Войти',
      signUpText: 'Нет аккаунта? ',
      signUpLink: 'Зарегистрироваться',
    },
    signUpPage: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      usernamePlaceholder: 'Введите имя пользователя',
      password: 'Пароль',
      passwordPlaceholder: 'введите пароль',
      confirmPassword: 'Подтвердите пароль',
      confirmPlaceholder: 'Введите пароль ещё раз',
      signUpBtn: 'Зарегистрироваться',
      errors: {
        usernameLength: 'От 3 до 20 символов',
        usernameUnique: 'Пользователь уже существует',
        passwordLength: 'Минимум 6 символов',
        passwordConfirm: 'Пароли должны совпадать',
      },
    },
  },
};
