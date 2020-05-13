class CreateMeasurements < ActiveRecord::Migration[6.0]
  def change
    create_table :measurements do |t|
      t.date :day
      t.time :total_time
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
