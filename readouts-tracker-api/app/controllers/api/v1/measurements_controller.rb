class Api::V1::MeasurementsController < ApplicationController
  before_action :set_measurement, only: [:show, :update, :destroy]
  before_action :set_category
  # GET /measurements
  def index
    @measurements = current_user.measurements

    json_response(:index)
  end

  # GET /measurements/1
  def show
    render json: @measurement
  end

  # POST /measurements
  def create
    @measurement = current_user.measurements.create!(measurement_params)
    @measurement.category_id = @category.id
    json_response(@measurement, :created)
  end

  # PATCH/PUT /measurements/1
  def update
    if @measurement.update(measurement_params)
      render json: @measurement
    else
      render json: @measurement.errors, status: :unprocessable_entity
    end
  end

  # DELETE /measurements/1
  def destroy
    @measurement.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_measurement
      @measurement = Measurement.find(params[:id])
    end

    def set_category
      @category = Category.find(params[:id]) if params.has_key?(:category_id)
    end

    # Only allow a trusted parameter "white list" through.
    def measurement_params
      params.require(:measurement).permit(:day, :total_time)
    end
end
