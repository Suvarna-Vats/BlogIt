# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :id,
    :slug,
    :title,
    :description,
    :is_bloggable,
    :created_at

  json.user do
    json.extract! post.user,
      :id,
      :name,
      :email
  end

  json.categories post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
