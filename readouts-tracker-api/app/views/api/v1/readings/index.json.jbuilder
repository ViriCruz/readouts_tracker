json.data do
  json.readings do |reading|
    json.description reading.description
    json.day reading.day
    json.hours reading.hours
    json.minutes reading.minutes
    json.category do
      json.id @category.id
      json.name @category.name
    end
  end
end
