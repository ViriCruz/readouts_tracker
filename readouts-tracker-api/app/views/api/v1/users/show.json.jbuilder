json.data do
  json.user do
    json.first_name @user.first_name
    json.last_name @user.last_name
    json.email @user.email
    json.readings @user.readings do |reading|
      json.id reading.id
      json.description reading.description
      json.duration reading.duration
      json.category reading.category, :name
      json.created_at reading.created_at
    end
  end
end
