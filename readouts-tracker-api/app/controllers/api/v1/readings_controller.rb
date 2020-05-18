class Api::V1::ReadingsController < ApplicationController
  before_action :set_category
  before_action :set_reading, only: [:show, :update, :destroy]

  # GET /readings
  def index
    @readings = Reading.where("category_id = ? AND user_id = ?", params[:category_id], current_user.id)
    json_response(@readings)
  end

  # GET /readings/1
  def show
    render json: @reading
  end

  def total_time
    @total_time = format_time
    json = {
      :data => {
        :total_time => {
          :category => @category.name,
          :total_time => @total_time,
          :date => Date.today
        }
      }
    }
    json_response(json.to_json)
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

    def get_original_hours
      current_user
      .readings
      .filter_by_category_and_day(@category.id)
      .sum_hours 
    end

    def get_original_minutes
      current_user
      .readings
      .filter_by_category_and_day(@category.id)
      .sum_minutes 
    end

    def convert_minutes_to_hours
      get_original_minutes.first[1] / 60 if is_greater_than_sixty?
    end

    def is_greater_than_sixty?
      get_original_minutes.first[1] >= 60
    end

    def format_time
      hours = get_original_hours.first[1] + convert_minutes_to_hours #sum this to total hours
      rest = get_original_minutes.first[1] % 60
      return "#{hours}:#{rest}"
    end
    # Only allow a trusted parameter "white list" through.
    def reading_params
      params.permit(:description, :hours, :minutes, :day, :category_id)
    end
end
