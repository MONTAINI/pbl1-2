Rails.application.routes.draw do
  get '/month/:year/:month', to: 'attendance#atndsAllStudents'
  get '/month/:year/:month/student/:student', to: 'attendance#atndsOneStudent'
  put '/attendance', to 'attendance#updateAttendance'
end
