# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

5.times do
  User.create(
  email: Faker::Internet.email,
  password: "password"
  )
end

User.all.each do |user|
  num = Faker::Number.between(35, 100)
  num.times do
    user.notes.create(
    title: Faker::Lorem.sentence,
    content: Faker::Lorem.paragraph
    )
  end

  3.times do
    user.tags.create(
    name: Faker::Lorem.word
    )
  end

  user.notes.each do |note|
    note.tags << user.tags.order("RANDOM()").first
  end
end
