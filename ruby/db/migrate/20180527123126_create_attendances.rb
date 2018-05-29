class CreateAttendances < ActiveRecord::Migration[5.2]
  def change
    create_table :attendances do |t|
      t.references :user, null:false, foreign_key: true
      t.date :date, null:false
      t.integer :atnd1, null:false
      t.integer :atnd2, null:false
      t.integer :atnd3, null:false
      t.integer :atnd4, null:false
      t.integer :atnd5, null:false
      t.time :came_at, null:false
      t.time :leaved_at, null:false

      t.timestamps
    end
  end
end
