class NotesAPI {
  mockRequest(userEmail, notes) {
    localStorage.setItem(userEmail + '_notes', JSON.stringify(notes));
  }
}

export default new NotesAPI();