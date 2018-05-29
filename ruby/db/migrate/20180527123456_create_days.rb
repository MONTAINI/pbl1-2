class CreateDays < ActiveRecord::Migration[5.2]
  def change
    create_table :days, primary_key: ["date"] do |t|
      t.date :date, null: false
      t.boolean :school_day, null: false

      t.timestamps
    end
  end
end
