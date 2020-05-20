class Api::V1::CategoriesController < ApplicationController
  # GET /categories
  def index
    @categories = Category.all
    # render :index
    json_response(:index)
  end

  private

  # Only allow a trusted parameter "white list" through.
  def category_params
    params.permit(:name)
  end
end
