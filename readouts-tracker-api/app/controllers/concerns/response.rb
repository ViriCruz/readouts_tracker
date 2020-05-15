module Response
  def json_response(object, status = :ok)
    return render object, status: status if object.is_a? Symbol
    
    render json: object, status: status
  end
end