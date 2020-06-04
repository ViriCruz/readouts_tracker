class RemoveInitialDateFromReadings < ActiveRecord::Migration[6.0]
  def change
    remove_column :readings, :initial_date, :timestamp
  end
end
