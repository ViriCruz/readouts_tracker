require 'test_helper'

class MeasurementsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @measurement = measurements(:one)
  end

  test "should get index" do
    get measurements_url, as: :json
    assert_response :success
  end

  test "should create measurement" do
    assert_difference('Measurement.count') do
      post measurements_url, params: { measurement: { category_id: @measurement.category_id, day: @measurement.day, total_time: @measurement.total_time } }, as: :json
    end

    assert_response 201
  end

  test "should show measurement" do
    get measurement_url(@measurement), as: :json
    assert_response :success
  end

  test "should update measurement" do
    patch measurement_url(@measurement), params: { measurement: { category_id: @measurement.category_id, day: @measurement.day, total_time: @measurement.total_time } }, as: :json
    assert_response 200
  end

  test "should destroy measurement" do
    assert_difference('Measurement.count', -1) do
      delete measurement_url(@measurement), as: :json
    end

    assert_response 204
  end
end
