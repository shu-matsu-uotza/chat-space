class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
end

# ユーザーが未ログイン時はログイン画面に遷移
