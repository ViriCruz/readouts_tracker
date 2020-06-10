class AddDayToReadings < ActiveRecord::Migration[6.0]
  def change
    add_column :readings, :day, :date
  end
end
