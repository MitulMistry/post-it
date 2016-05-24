class Note < ActiveRecord::Base
  belongs_to :user
  has_many :note_tags
  has_many :tags, through: :note_tags

  validates :content, presence: true
end
