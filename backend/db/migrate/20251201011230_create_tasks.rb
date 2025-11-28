class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.references :project, null: false, foreign_key: true
      t.references :creator, null: false, foreign_key: { to_table: :users }
      t.references :assignee, foreign_key: { to_table: :users }
      t.string :title, null: false
      t.text :description
      t.string :status, null: false, default: 'todo'
      t.string :priority, null: false, default: 'medium'
      t.date :due_date

      t.timestamps
    end

    add_index :tasks, :status
    add_index :tasks, :priority
    add_index :tasks, :due_date
  end
end
