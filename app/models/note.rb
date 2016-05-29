class Note < ActiveRecord::Base
  belongs_to :user
  has_many :note_tags
  has_many :tags, through: :note_tags

  validates :title, length: { maximum: 120 }
  validates :content, presence: true, length: { maximum: 1200 }
end
