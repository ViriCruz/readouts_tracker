class Api::V1::ReadingsController < ApplicationController
  before_action :set_category
  before_action :set_reading, only: [:show, :update, :destroy]

  # GET /readings
  def index
    @readings = Reading.where("category_id = ? AND user_id = ?", params[:category_id], current_user.id)
    render json: @readings
  end

  # GET /readings/1
  def show
    render json: @reading
  end

  # POST /readings
  def create
    @reading = current_user.readings.create!(reading_params) 
    @reading.category_id = @category.id

    json_response(@reading, :created)
  end

  # PATCH/PUT /readings/1
  def update
    @reading.update(reading_params)
    json_response(@reading)
  end

  # DELETE /readings/1
  def destroy
    @reading.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:category_id])
    end
    
    def set_reading
      @reading = @category.readings.find_by!(id: params[:id]) if @category
    end

    # Only allow a trusted parameter "white list" through.
    def reading_params
      params.permit(:description, :hours, :minutes, :category_id)
    end
end
