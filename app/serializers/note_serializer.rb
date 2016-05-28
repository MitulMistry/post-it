class NoteSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at, :updated_at
  has_many :tags #includes associated tags in the serialization
end
