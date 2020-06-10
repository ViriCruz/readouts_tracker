class AddHoursAndMinutesToReadings < ActiveRecord::Migration[6.0]
  def change
    add_column :readings, :hours, :integer
    add_column :readings, :minutes, :integer
  end
end
