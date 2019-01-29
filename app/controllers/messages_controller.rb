class MessagesController < ApplicationController
  def index
    @message = Message.new
    @message = @group.message.includes(:user)
  end

  def create
  end
end
