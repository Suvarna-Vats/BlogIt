# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :id,
    :slug,
    :title,
    :description,
    :upvotes,
    :downvotes,
    :is_bloggable,
    :last_published_at,
    :created_at,
    :updated_at

  json.net_votes post.net_votes
  json.my_vote @my_votes_by_post_id&.[](post.id)

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

json.pagination do
  json.total_count @pagy.count
  json.page @pagy.page
  json.page_size @pagy.limit
  json.total_pages @pagy.pages
end
