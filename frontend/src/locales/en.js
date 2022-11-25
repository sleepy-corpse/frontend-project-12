export default {
  translation: {
    chat: {
      channelsHeader: 'Channels',
      messagesCount_one: '1 message',
      messagesCount_other: '{{count}} messages',
      sendBtn: 'Send',
      logOutBtn: 'Log Out',
      messageInputPlaceholder: 'Enter message',
      dropdown: {
        rename: 'Rename',
        delete: 'Delete',
      },
    },
    modals: {
      rename: {
        header: 'Rename the channel',
        label: 'Channel name',
        inputPlaceholder: 'Enter channel name',
      },
      remove: {
        header: 'Remove the channel',
        modalText: 'Are you sure?',
      },
      add: {
        header: 'Add a channel',
        label: 'Channel name',
        inputPlaceholder: 'Enter channel name',
      },
      errors: {
        nameRequired: 'The name is required',
        nameLength: 'The name has to be 3-20 characters long',
        nameUnique: 'The name must be unique',
      },
      buttons: {
        cancel: 'Cancel',
        submit: 'Submit',
        delete: 'Delete',
      },
    },
    loginPage: {
      header: 'Please log in',
      username: 'Username',
      usernamePlaceholder: 'Enter username',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      error: 'Invalid username or password',
      signInBtn: 'Sign In',
      signUpText: 'Don\'t have an account? ',
      signUpLink: 'Sign Up',
    },
    signUpPage: {
      header: 'Registration',
      username: 'Username',
      usernamePlaceholder: 'Enter username',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      confirmPassword: 'Confirm Password',
      confirmPlaceholder: 'Confirm password',
      signUpBtn: 'Sign Up',
      signInText: 'Already have an account? ',
      signInLink: 'Sign In',
      errors: {
        usernameLength: 'Username must be 3-20 characters long',
        usernameUnique: 'User already exists',
        passwordLength: 'Password must be at least 6 characters long',
        passwordConfirm: 'Passwords must match',
      },
    },
  },
};
