Rails.application.routes.draw do
  get '/month/:year/:month', to: 'attendances#atnds_all_students'
  get '/month/:year/:month/student/:student', to: 'attendances#atnds_one_student'
  put '/attendances/:student/:date', to: 'attendances#update_attendance'
  post '/school-days', to: 'school_days#add'
end
