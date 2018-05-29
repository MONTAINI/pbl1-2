Rails.application.routes.draw do
  get '/month/:year/:month', to: 'attendance#atndsAllStudents'
  get '/month/:year/:month/student/:student', to: 'attendance#atndsOneStudent'
  #get '/month/:year/:month/offset/:offset', to: 'attendance#atndsAllStudents'
  #get '/school-days/:year/:month', to: 'attendance#schoolDays'
end
