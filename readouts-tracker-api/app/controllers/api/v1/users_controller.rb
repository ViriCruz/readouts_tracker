class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create
  # POST /users
  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response.to_json, :created)
  end

  private

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
