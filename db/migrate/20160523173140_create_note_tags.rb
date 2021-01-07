class CreateNoteTags < ActiveRecord::Migration[4.2]
  def change
    create_table :note_tags do |t|
      t.integer :note_id
      t.integer :tag_id

      t.timestamps null: false
    end
  end
end
