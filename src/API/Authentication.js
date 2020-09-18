class AuthenticationAPI {
  mockLogin(email) {
    localStorage.setItem('current_user', email);
  }

  mockSignup(email, password) {
    localStorage.setItem(email, password);
  }
}

export default new AuthenticationAPI();