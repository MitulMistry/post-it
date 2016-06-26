class Tag < ActiveRecord::Base
  belongs_to :user
  has_many :note_tags
  has_many :notes, through: :note_tags

  validates :name, presence: true, length: { maximum: 30 }, uniqueness: { scope: :user_id, message: "No duplicate tags per user." }
end
