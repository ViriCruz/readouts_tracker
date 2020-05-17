json.data do
  json.measurements @measurements do |measurement|
    json.day measurement.day
    json.total_time measurement.total_time
    json.category measurement.category.name
    json.user do
      json.first_name measurement.user.first_name
      json.last_name measurement.user.last_name
      json.email measurement.user.email
    end
  end
end