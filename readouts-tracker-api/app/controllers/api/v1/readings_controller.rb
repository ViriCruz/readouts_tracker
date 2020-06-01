class Api::V1::ReadingsController < ApplicationController
  before_action :set_category
  before_action :set_reading, only: %i[show update destroy]

  # GET /readings
  def index
    @readings = Reading.where('category_id = ? AND user_id = ?', params[:category_id], current_user.id)
    json_response(@readings)
  end

  # GET /readings/1
  def show
    render json: @reading
  end

  def total_time
    json = if original_hours.first.nil? || original_minutes.first.nil?
             {
               data: {
                 message: "Not readings found for #{params[:day]}"
               }
             }
           else
             {
               data: {
                 total_time: {
                   category: @category.name,
                   total_time: format_time,
                   date: params[:day]
                 }
               }
             }
           end

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

  def original_hours
    hours =
      current_user
        .readings
        .filter_by_category_and_day(@category.id, params[:day])
        .sum_hours  
    hours
  end

  def original_minutes
    minutes =
      current_user
        .readings
        .filter_by_category_and_day(@category.id, params[:day])
        .sum_minutes   
    minutes
  end

  def convert_minutes_to_hours
    return original_minutes.first[1] / 60 if greater_than_sixty?

    0
  end

  def greater_than_sixty?
    original_minutes.first[1] >= 60
  end

  def total_hours
    return original_hours.first[1] + convert_minutes_to_hours unless original_hours.first.nil?

    0
  end

  def format_time
    hours = total_hours 
    rest = original_minutes.first.nil? ? 0 : original_minutes.first[1] % 60
    format_hours = lower_than_ten?(hours) ? "0#{hours}" : hours.to_s
    format_minutes = lower_than_ten?(rest) ? "0#{rest}" : rest.to_s
    "#{format_hours}:#{format_minutes}"
  end

  def lower_than_ten?(number)
    number >= 0 && number <= 9
  end

  # Only allow a trusted parameter "white list" through.
  def reading_params
    params.permit(:description, :hours, :minutes, :day, :category_id)
  end
end
