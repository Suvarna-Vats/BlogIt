# frozen_string_literal: true

class Posts::VotesController < ApplicationController
  before_action :set_post
  after_action :verify_authorized

  def update
    authorize @post, :show?

    vote_value = vote_params[:value].to_i
    vote_key = Vote.kinds.key(vote_value)
    raise ArgumentError, "Invalid vote value" if vote_key.blank?

    vote = Vote.find_by(user: current_user, post: @post)

    unless vote
      vote = Vote.create!(user: current_user, post: @post, kind: vote_key)
    end

    vote.update!(kind: vote_key) if vote.kind != vote_key

    @post.reload
    render_json(
      {
        upvotes: @post.upvotes,
        downvotes: @post.downvotes,
        net_votes: @post.net_votes,
        is_bloggable: @post.is_bloggable,
        my_vote: vote.kind_before_type_cast
      }
    )
  end

  private

    def set_post
      slug = params[:slug] || params[:post_slug]
      @post = Post.find_by!(
        slug:,
        organization_id: current_user.organization_id
      )
    end

    def vote_params
      params.require(:vote).permit(:value)
    end
end
