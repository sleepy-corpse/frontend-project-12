export default {
  translation: {
    toasts: {
      addChannel: 'Канал создан',
      renameChannel: 'Канал переименован',
      removeChannel: 'Канал удалён',
      networkError: 'Ошибка соединения',
    },
    chat: {
      channelsHeader: 'Каналы',
      messagesCount_one: '{{count}} сообщение',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
      sendBtn: 'Отправить',
      logOutBtn: 'Выйти',
      messageInputLabel: 'Новое сообщение',
      messageInputPlaceholder: 'Введите сообщение',
      dropdown: {
        label: 'Управление каналом',
        rename: 'Переименовать',
        delete: 'Удалить',
      },
    },
    modals: {
      rename: {
        header: 'Переименовать канал',
        label: 'Имя канала',
        inputPlaceholder: 'Введите название канала',
      },
      remove: {
        header: 'Удалить канал',
        modalText: 'Вы уверены?',
      },
      add: {
        header: 'Добавить канал',
        label: 'Имя канала',
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
      header: 'Войти',
      username: 'Ваш ник',
      usernamePlaceholder: 'Введите имя пользователя',
      password: 'Пароль',
      passwordPlaceholder: 'введите пароль',
      error: 'Неверные имя пользователя или пароль',
      signInBtn: 'Войти',
      signUpText: 'Нет аккаунта? ',
      signUpLink: 'Регистрация',
    },
    signUpPage: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      usernamePlaceholder: 'Имя пользователя',
      password: 'Пароль',
      passwordPlaceholder: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      confirmPlaceholder: 'Подтвердите пароль',
      signUpBtn: 'Зарегистрироваться',
      errors: {
        usernameLength: 'От 3 до 20 символов',
        usernameUnique: 'Пользователь уже существует',
        passwordLength: 'Не менее 6 символов',
        passwordConfirm: 'Пароли должны совпадать',
      },
    },
  },
};
