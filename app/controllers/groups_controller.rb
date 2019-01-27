class GroupsController < ApplicationController

  def new
  end

  def create(groups_permit)

  end

  def edit

  end

  def update

  end

  private

  def groups_permit
    params.permit()
  end

end
