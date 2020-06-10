class ChangeTotalTimeFromTimeToStringFromMeasurements < ActiveRecord::Migration[6.0]
  def change
    change_column :measurements, :total_time, :string
  end
end
