Rails.application.routes.draw do
  get '/month/:year/:month', to: 'attendance#atnds_all_students'
  get '/month/:year/:month/student/:student', to: 'attendance#atnds_one_student'
  put '/attendances/:student/:date', to: 'attendance#update_attendance'
  post '/school-days', to: 'school_days#add'
end
