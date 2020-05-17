class RemoveDurationFromReadings < ActiveRecord::Migration[6.0]
  def change
    remove_column :readings, :duration, :time
  end
end
