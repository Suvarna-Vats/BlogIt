# frozen_string_literal: true

json.post do
  json.extract! @post,
    :id,
    :slug,
    :title,
    :description,
    :is_bloggable,
    :status,
    :created_at,
    :updated_at

  json.user do
    json.extract! @post.user,
      :id,
      :name,
      :email
  end

  json.organization do
    json.extract! @post.organization,
      :id,
      :name
  end

  json.categories @post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
