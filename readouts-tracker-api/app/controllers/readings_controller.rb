class ReadingsController < ApplicationController
  before_action :set_reading, only: [:show, :update, :destroy]

  # GET /readings
  def index
    @readings = Reading.all

    render json: @readings
  end

  # GET /readings/1
  def show
    render json: @reading
  end

  # POST /readings
  def create
    @reading = Reading.new(reading_params)

    if @reading.save
      render json: @reading, status: :created, location: @reading
    else
      render json: @reading.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /readings/1
  def update
    if @reading.update(reading_params)
      render json: @reading
    else
      render json: @reading.errors, status: :unprocessable_entity
    end
  end

  # DELETE /readings/1
  def destroy
    @reading.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reading
      @reading = Reading.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def reading_params
      params.require(:reading).permit(:description, :duration, :initial_date, :user_id, :category_id)
    end
end
