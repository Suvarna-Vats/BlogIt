# frozen_string_literal: true

json.post do
  json.extract! @post,
    :id,
    :slug,
    :title,
    :description,
    :upvotes,
    :downvotes,
    :is_bloggable,
    :status,
    :last_published_at,
    :created_at,
    :updated_at

  json.net_votes @post.net_votes
  json.my_vote @my_vote

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
