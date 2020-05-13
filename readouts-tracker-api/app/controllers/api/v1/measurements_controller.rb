class Api::V1::MeasurementsController < ApplicationController
  before_action :set_measurement, only: [:show, :update, :destroy]

  # GET /measurements
  def index
    @measurements = Measurement.all

    render json: @measurements
  end

  # GET /measurements/1
  def show
    render json: @measurement
  end

  # POST /measurements
  def create
    @measurement = Measurement.new(measurement_params)

    if @measurement.save
      render json: @measurement, status: :created, location: api_v1_measurements_url(@measurement)
    else
      render json: @measurement.errors, status: :unprocessable_entity
    end
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

    # Only allow a trusted parameter "white list" through.
    def measurement_params
      params.require(:measurement).permit(:day, :total_time, :category_id)
    end
end
