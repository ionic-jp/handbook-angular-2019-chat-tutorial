export const firebaseError = {
  'auth/invalid-email': {
    code: 'メールアドレスが間違っています',
    message: 'メールアドレスのフォーマットが間違っています。',
  },
  'auth/wrong-password': {
    code: 'パスワードが間違っています',
    message: '入力いただいたパスワードが間違っています。',
  },
  'auth/weak-password': {
    code: '脆弱性があります',
    message: 'パスワードは最低でも6文字以上のものをご利用ください。',
  },
  'auth/user-not-found': {
    code: 'ユーザが見つかりません',
    message: '入力いただいたユーザは存在しません。',
  },
  'auth/email-already-in-use': {
    code: 'ユーザが存在しています',
    message: 'このメールアドレスを利用してすでにユーザが作成されています。',
  },
};
