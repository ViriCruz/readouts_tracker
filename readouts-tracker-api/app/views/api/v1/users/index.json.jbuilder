json.data do
  json.users @users do |user|
    json.first_name user.first_name
    json.last_name user.last_name
    json.email user.email
    json.reading_activities user.readings, :description, :duration, :created_at
  end
end