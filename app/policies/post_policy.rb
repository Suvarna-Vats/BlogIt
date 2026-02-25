# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def create?
    true
  end

  def show?
    post.organization_id == user.organization_id &&
      (post.published? || user.id == post.user_id)
  end

  def update?
    user.id == post.user_id
  end

  def destroy?
    update?
  end

  def bulk_update?
    true
  end

  def bulk_destroy?
    true
  end

  def mine?
    true
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(organization_id: user.organization_id, status: "published")
    end
  end
end
