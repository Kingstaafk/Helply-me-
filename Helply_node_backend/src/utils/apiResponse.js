class ApiResponse{
    constructor(data, message="Success", statusCode){
      this.data=data
      this.message=message
      this.statusCode=statusCode
      this.success=statusCode<300
    }
}

export default ApiResponse